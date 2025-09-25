using System.Diagnostics;
using System.Text.Json;
using Making.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Thor.Abstractions.Dtos;
using Thor.Abstractions.Exceptions;
using Thor.Abstractions.Fal;
using Thor.Abstractions.Images;
using Thor.Domain.Shared;
using Thor.Service.Domain.Core;
using Thor.Service.Extensions;

namespace Thor.Service.Service.AI;

[MiniApi("/fal-ai", Tags = "Fal AI")]
public class FalAIService(
    TokenService tokenService,
    ChannelService channelService,
    ModelMapService modelMapService,
    UserGroupService userGroupService,
    IServiceProvider serviceProvider,
    UserService userService,
    RateLimitModelService rateLimitModelService,
    ImageService imageService,
    LoggerService loggerService,
    ImageTaskLoggerService imageTaskLoggerService,
    ILogger<FalAIService> logger) : AIService(serviceProvider, imageService)
{
    /// <summary>
    /// 处理响应并记录图片任务日志
    /// FalAI 返回的是直接的图片生成结果，可能包含 request_id 用于异步查询
    /// </summary>
    private async Task<string> ProcessResponseAndLogTask(
        HttpResponseMessage responseMessage,
        ThorImageTaskType taskType,
        string prompt,
        string model,
        long quota,
        string? tokenName,
        string? userName,
        string? userId,
        string channelId,
        string? channelName,
        string ip,
        string userAgent,
        string url,
        int totalTime,
        object taskParameters)
    {
        var responseContent = await responseMessage.Content.ReadAsStringAsync();
        var isSuccess = responseMessage.IsSuccessStatusCode;

        // 提取 request_id 或其他标识符
        string? taskId = null;
        string? errorMessage = null;
        string[]? imageUrls = null;

        try
        {
            if (isSuccess && !string.IsNullOrEmpty(responseContent))
            {
                var responseJson = JsonDocument.Parse(responseContent);

                // FalAI 通常返回 request_id 字段
                if (responseJson.RootElement.TryGetProperty("request_id", out var requestIdElement))
                {
                    taskId = requestIdElement.GetString();
                }

                // 如果直接返回图片结果，提取图片URLs
                if (responseJson.RootElement.TryGetProperty("images", out var imagesElement) &&
                    imagesElement.ValueKind == JsonValueKind.Array)
                {
                    var urls = new List<string>();
                    foreach (var imageElement in imagesElement.EnumerateArray())
                    {
                        if (imageElement.TryGetProperty("url", out var urlElement))
                        {
                            var imageUrl = urlElement.GetString();
                            if (!string.IsNullOrEmpty(imageUrl))
                            {
                                urls.Add(imageUrl);
                            }
                        }
                    }

                    if (urls.Any())
                    {
                        imageUrls = urls.ToArray();
                    }
                }
            }
            else
            {
                errorMessage = responseContent;
            }
        }
        catch (Exception ex)
        {
            logger.LogWarning("Failed to parse FalAI response: {Error}", ex.Message);
        }

        // 记录图片任务日志
        if (!string.IsNullOrEmpty(taskId) || imageUrls?.Length > 0)
        {
            // 如果没有taskId，生成一个基于时间戳的ID
            taskId ??= $"fal-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";

            await imageTaskLoggerService.CreateTaskAsync(
                taskId: taskId,
                taskType: taskType,
                prompt: prompt,
                model: model,
                quota: quota,
                tokenName: tokenName,
                userName: userName,
                userId: userId,
                channelId: channelId,
                channelName: channelName,
                ip: ip,
                userAgent: userAgent,
                url: url,
                totalTime: totalTime,
                organizationId: null,
                isSuccess: isSuccess,
                errorMessage: errorMessage,
                taskParameters: taskParameters
            );

            // 如果有图片结果，更新任务状态为完成
            if (imageUrls?.Length > 0)
            {
                await imageTaskLoggerService.UpdateTaskStatusAsync(
                    taskId: taskId,
                    status: ThorImageTaskStatus.Completed,
                    progress: 100,
                    imageUrls: imageUrls
                );
            }
        }

        return responseContent;
    }

    [HttpPost("/nano-banana")]
    public async Task NanoBanana(NanoBananaEditInput input, HttpContext context)
    {
        var model = "fal-ai/nano-banana";

        var rate = ModelManagerService.PromptRate[model];

        var (token, user) = await tokenService.CheckTokenAsync(context, rate);

        await rateLimitModelService.CheckAsync(model, user.Id);
        TokenService.CheckModel(model, token, context);

        model = await modelMapService.ModelMap(model);

        // 获取渠道 通过算法计算权重
        var channel =
            CalculateWeight(await channelService.GetChannelsContainsModelAsync(model, user, token));

        var userGroup = await userGroupService.GetAsync(channel.Groups);

        if (userGroup == null)
        {
            throw new BusinessException("当前渠道未设置分组，请联系管理员设置分组", "400");
        }


        var client = HttpClientFactory.GetHttpClient(channel.Address);
        var quota = ((decimal)(rate.PromptRate) * (decimal)userGroup.Rate) * input.NumImages;

        if (quota > user.ResidualCredit) throw new InsufficientQuotaException("账号余额不足请充值");

        var sw = Stopwatch.StartNew();

        var request = new HttpRequestMessage(HttpMethod.Post, $"{channel.Address.TrimEnd('/')}/fal-ai/nano-banana");

        request.Headers.Add("Authorization", "Bearer " + channel?.Key);

        // 打印请求信息
        logger.LogInformation(
            $"获取结果接口：{request.RequestUri} \n 用户：{user.UserName} \n 渠道：{channel.Name} \n 模型：{model} \n");

        request.Content = new StringContent(JsonSerializer.Serialize(input, ThorJsonSerializer.DefaultOptions),
            System.Text.Encoding.UTF8, "application/json");

        var responseMessage = await client.SendAsync(request);

        sw.Stop();

        // 处理响应并记录图片任务日志
        var responseContent = await ProcessResponseAndLogTask(
            responseMessage,
            ThorImageTaskType.Imagine, // FalAI nano-banana 是图片生成
            input.Prompt ?? "Nano Banana generation",
            model,
            (long)quota,
            token?.Key,
            user?.UserName,
            user?.Id,
            channel.Id,
            channel.Name,
            context.GetIpAddress(),
            context.GetUserAgent(),
            "/fal-ai/nano-banana",
            (int)sw.ElapsedMilliseconds,
            input);

        // 设置响应头并发送内容给客户端
        context.Response.Headers.ContentType = "application/json";
        await context.Response.WriteAsync(responseContent);

        await loggerService.CreateConsumeAsync("/fal-ai/nano-banana",
            string.Format(ConsumerImageTemplate, rate.PromptRate, userGroup.Rate),
            model,
            0, 0, (int)quota, token?.Key, user?.UserName, user?.Id, channel.Id,
            channel.Name, context.GetIpAddress(), context.GetUserAgent(), false, (int)sw.ElapsedMilliseconds,
            string.Empty);

        await userService.ConsumeAsync(user!.Id, (long)quota, 0, token?.Key, channel.Id, model);
    }

    [HttpPost("/nano-banana/edit")]
    public async Task NanoBananaEdit(NanoBananaEditInput input, HttpContext context)
    {
        var model = "fal-ai/nano-banana";
        var rate = ModelManagerService.PromptRate[model];

        var (token, user) = await tokenService.CheckTokenAsync(context, rate);

        await rateLimitModelService.CheckAsync(model, user.Id);
        TokenService.CheckModel(model, token, context);

        model = await modelMapService.ModelMap(model);

        // 获取渠道 通过算法计算权重
        var channel =
            CalculateWeight(await channelService.GetChannelsContainsModelAsync(model, user, token));

        var userGroup = await userGroupService.GetAsync(channel.Groups);

        if (userGroup == null)
        {
            throw new BusinessException("当前渠道未设置分组，请联系管理员设置分组", "400");
        }

        var client = HttpClientFactory.GetHttpClient(channel.Address);

        var quota = (decimal)(rate.PromptRate) * (decimal)userGroup.Rate * input.NumImages;

        if (quota > user.ResidualCredit) throw new InsufficientQuotaException("账号余额不足请充值");

        // 记录请求信息
        logger.LogInformation($"分配渠道：{channel.Name}, 地址：{channel.Address}, 模型：{model}");

        var sw = Stopwatch.StartNew();

        var request =
            new HttpRequestMessage(HttpMethod.Post, $"{channel.Address.TrimEnd('/')}/fal-ai/nano-banana/edit");

        request.Headers.Add("Authorization", "Bearer " + channel?.Key);

        // 打印请求信息
        logger.LogInformation(
            $"获取结果接口：{request.RequestUri} \n 用户：{user.UserName} \n 渠道：{channel.Name} \n 模型：{model} \n ");
        request.Content = new StringContent(JsonSerializer.Serialize(input, ThorJsonSerializer.DefaultOptions),
            System.Text.Encoding.UTF8, "application/json");

        var responseMessage = await client.SendAsync(request);

        sw.Stop();

        // 处理响应并记录图片任务日志
        var responseContent = await ProcessResponseAndLogTask(
            responseMessage,
            ThorImageTaskType.Imagine, // 图片编辑也归类为生成
            input.Prompt ?? "Nano Banana edit",
            model,
            (long)quota,
            token?.Key,
            user?.UserName,
            user?.Id,
            channel.Id,
            channel.Name,
            context.GetIpAddress(),
            context.GetUserAgent(),
            "/fal-ai/nano-banana/edit",
            (int)sw.ElapsedMilliseconds,
            input);

        // 设置响应头并发送内容给客户端
        context.Response.Headers.ContentType = "application/json";
        await context.Response.WriteAsync(responseContent);

        await loggerService.CreateConsumeAsync("/fal-ai/nano-banana/edit",
            string.Format(ConsumerImageTemplate, rate.PromptRate, userGroup.Rate),
            model,
            0, 0, (int)quota, token?.Key, user?.UserName, user?.Id, channel.Id,
            channel.Name, context.GetIpAddress(), context.GetUserAgent(), false, (int)sw.ElapsedMilliseconds,
            string.Empty);

        await userService.ConsumeAsync(user!.Id, (long)quota, 0, token?.Key, channel.Id, model);
    }

    [HttpGet("{modelName}/requests/{requestId}")]
    public async Task GetResult(string modelName, string requestId, HttpContext context)
    {
        var model = "fal-ai/nano-banana";

        var rate = ModelManagerService.PromptRate[model];

        var (token, user) = await tokenService.CheckTokenAsync(context, rate);

        await rateLimitModelService.CheckAsync(model, user.Id);
        TokenService.CheckModel(model, token, context);

        model = await modelMapService.ModelMap(model);

        // 获取渠道 通过算法计算权重
        var channel =
            CalculateWeight(await channelService.GetChannelsContainsModelAsync(model, user, token));

        var userGroup = await userGroupService.GetAsync(channel.Groups);

        if (userGroup == null)
        {
            throw new BusinessException("当前渠道未设置分组，请联系管理员设置分组", "400");
        }

        var client = HttpClientFactory.GetHttpClient(channel.Address);

        var requestMessage = new HttpRequestMessage(HttpMethod.Get,
            $"{channel.Address.TrimEnd('/')}/fal-ai/{modelName}/requests/{requestId}");

        requestMessage.Headers.Add("Authorization", "Bearer " + channel?.Key);

        // 打印请求信息
        logger.LogInformation(
            $"获取结果接口：{requestMessage.RequestUri} \n 用户：{user.UserName} \n 渠道：{channel.Name} \n 模型：{model} \n RequestId：{requestId}");

        var responseMessage =
            await client.SendAsync(requestMessage);

        // 如果查询成功，尝试更新本地任务状态
        if (responseMessage.IsSuccessStatusCode)
        {
            try
            {
                // 读取响应内容
                var responseContent = await responseMessage.Content.ReadFromJsonAsync<GetFalResultDto>();

                // 根据状态更新本地任务日志
                switch (responseContent?.status?.ToLower())
                {
                    case "IN_QUEUE":
                        await imageTaskLoggerService.UpdateTaskStatusAsync(
                            taskId: requestId,
                            status: ThorImageTaskStatus.Processing,
                            progress: 100
                        );
                        break;
                    default:
                        // 提取图片URLs
                        string[]? imageUrls = null;
                        var urls = responseContent?.images?.Select(imageElement => imageElement.url).ToList();

                        if (urls?.Any() == true)
                        {
                            imageUrls = urls.ToArray();
                        }

                        await imageTaskLoggerService.UpdateTaskStatusAsync(
                            taskId: requestId,
                            status: ThorImageTaskStatus.Completed,
                            progress: 100,
                            imageUrls: imageUrls
                        );
                        break;

                        break;
                }

                await context.Response.WriteAsJsonAsync(responseContent);
            }
            catch (Exception ex)
            {
                logger.LogWarning("Failed to update task status for requestId {RequestId}: {Error}", requestId,
                    ex.Message);
            }
        }

        logger.LogInformation($"获取结果接口耗时：{responseMessage.RequestMessage?.RequestUri} ");
    }
}