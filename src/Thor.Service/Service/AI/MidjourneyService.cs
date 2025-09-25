using System.Diagnostics;
using System.Text.Json;
using Making.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Thor.Abstractions.Dtos;
using Thor.Abstractions.Exceptions;
using Thor.Abstractions.Fal;
using Thor.Abstractions.Images;
using Thor.Abstractions.Midjourney;
using Thor.Core.DataAccess;
using Thor.Domain.Shared;
using Thor.Service.Domain.Core;
using Thor.Service.Extensions;

namespace Thor.Service.Service.AI;

[MiniApi("/mj")]
public class MidjourneyService(
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
    ILoggerDbContext dbContext,
    ILogger<MidjourneyService> logger) : AIService(serviceProvider, imageService)
{
    /// <summary>
    /// 处理响应并记录图片任务日志
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
        var isSuccess = responseMessage.IsSuccessStatusCode;

        // 提取TaskId用于图片任务日志
        string? taskId = null;
        string? errorMessage = null;
        var responseContent = await responseMessage.Content.ReadAsStringAsync();

        try
        {
            if (isSuccess)
            {
                var json = JsonSerializer.Deserialize<CreateMidjourneyResultDto>(responseContent);
                taskId = json.result;
            }
            else
            {
                errorMessage = await responseMessage.Content.ReadAsStringAsync();
            }
        }
        catch (Exception ex)
        {
            logger.LogWarning("Failed to parse response for TaskId extraction: {Error}", ex.Message);
        }

        // 记录图片任务日志
        if (!string.IsNullOrEmpty(taskId))
        {
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
        }

        return responseContent;
    }

    [HttpPost("/submit/imagine")]
    public async Task SubmitImagine(SubmitImagineInput input, HttpContext context)
    {
        var model = "midjourney-imagine";

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
        var quota = (decimal)rate.PromptRate * (decimal)userGroup.Rate;

        if (quota > user.ResidualCredit) throw new InsufficientQuotaException("账号余额不足请充值");

        var sw = Stopwatch.StartNew();

        var request = new HttpRequestMessage(HttpMethod.Post, $"{channel.Address.TrimEnd('/')}/mj/submit/imagine");

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
            ThorImageTaskType.Imagine,
            input.Prompt,
            model,
            (long)quota,
            token?.Key,
            user?.UserName,
            user?.Id,
            channel.Id,
            channel.Name,
            context.GetIpAddress(),
            context.GetUserAgent(),
            "/mj/submit/imagine",
            (int)sw.ElapsedMilliseconds,
            input);

        // 设置响应头并发送内容给客户端
        context.Response.Headers.ContentType = "application/json";
        await context.Response.WriteAsync(responseContent);

        await userService.ConsumeAsync(user!.Id, (long)quota, 0, token?.Key, channel.Id, model);
    }

    [HttpPost("/submit/blend")]
    public async Task SubmitBlend(SubmitBlendInput input, HttpContext context)
    {
        var model = "midjourney-blend";

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
        var quota = (decimal)rate.PromptRate * (decimal)userGroup.Rate;

        if (quota > user.ResidualCredit) throw new InsufficientQuotaException("账号余额不足请充值");

        var sw = Stopwatch.StartNew();

        var request = new HttpRequestMessage(HttpMethod.Post, $"{channel.Address.TrimEnd('/')}/mj/submit/blend");

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
            ThorImageTaskType.Blend,
            $"Blend images: {string.Join(", ", input.Base64Array?.Select(img => $"[Image:{img[..Math.Min(20, img.Length)]}...]") ?? [])}",
            model,
            (long)quota,
            token?.Key,
            user?.UserName,
            user?.Id,
            channel.Id,
            channel.Name,
            context.GetIpAddress(),
            context.GetUserAgent(),
            "/mj/submit/blend",
            (int)sw.ElapsedMilliseconds,
            input);

        // 设置响应头并发送内容给客户端
        context.Response.Headers.ContentType = "application/json";
        await context.Response.WriteAsync(responseContent);

        await userService.ConsumeAsync(user!.Id, (long)quota, 0, token?.Key, channel.Id, model);
    }

    [HttpPost("/submit/describe")]
    public async Task SubmitDescribe(SubmitDescribeInput input, HttpContext context)
    {
        var model = "midjourney-describe";

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
        var quota = ((decimal)rate.PromptRate * (decimal)userGroup.Rate) * input.NotifyHook;

        if (quota > user.ResidualCredit) throw new InsufficientQuotaException("账号余额不足请充值");

        var sw = Stopwatch.StartNew();

        var request = new HttpRequestMessage(HttpMethod.Post, $"{channel.Address.TrimEnd('/')}/mj/submit/describe");

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
            ThorImageTaskType.Describe,
            $"Describe image: [Base64:{input.Base64[..Math.Min(20, input.Base64.Length)]}...]",
            model,
            (long)quota,
            token?.Key,
            user?.UserName,
            user?.Id,
            channel.Id,
            channel.Name,
            context.GetIpAddress(),
            context.GetUserAgent(),
            "/mj/submit/describe",
            (int)sw.ElapsedMilliseconds,
            input);

        // 设置响应头并发送内容给客户端
        context.Response.Headers.ContentType = "application/json";
        await context.Response.WriteAsync(responseContent);

        await userService.ConsumeAsync(user!.Id, (long)quota, 0, token?.Key, channel.Id, model);
    }

    [HttpPost("/submit/shorten")]
    public async Task SubmitShorten(SubmitShortenInput input, HttpContext context)
    {
        var model = "midjourney-shorten";

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
        var quota = (decimal)rate.PromptRate * (decimal)userGroup.Rate;

        if (quota > user.ResidualCredit) throw new InsufficientQuotaException("账号余额不足请充值");

        var sw = Stopwatch.StartNew();

        var request = new HttpRequestMessage(HttpMethod.Post, $"{channel.Address.TrimEnd('/')}/mj/submit/shorten");

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
            ThorImageTaskType.Shorten,
            $"Shorten prompt: {input.Prompt}",
            model,
            (long)quota,
            token?.Key,
            user?.UserName,
            user?.Id,
            channel.Id,
            channel.Name,
            context.GetIpAddress(),
            context.GetUserAgent(),
            "/mj/submit/shorten",
            (int)sw.ElapsedMilliseconds,
            input);

        // 设置响应头并发送内容给客户端
        context.Response.Headers.ContentType = "application/json";
        await context.Response.WriteAsync(responseContent);

        await userService.ConsumeAsync(user!.Id, (long)quota, 0, token?.Key, channel.Id, model);
    }

    [HttpPost("/submit/modal")]
    public async Task SubmitModal(SubmitModalInput input, HttpContext context)
    {
        var model = "midjourney-modal";

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
        var quota = (decimal)rate.PromptRate * (decimal)userGroup.Rate;

        if (quota > user.ResidualCredit) throw new InsufficientQuotaException("账号余额不足请充值");

        var sw = Stopwatch.StartNew();

        var request = new HttpRequestMessage(HttpMethod.Post, $"{channel.Address.TrimEnd('/')}/mj/submit/modal");

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
            ThorImageTaskType.Modal,
            $"Modal operation: {input.TaskId}",
            model,
            (long)quota,
            token?.Key,
            user?.UserName,
            user?.Id,
            channel.Id,
            channel.Name,
            context.GetIpAddress(),
            context.GetUserAgent(),
            "/mj/submit/modal",
            (int)sw.ElapsedMilliseconds,
            input);

        // 设置响应头并发送内容给客户端
        context.Response.Headers.ContentType = "application/json";
        await context.Response.WriteAsync(responseContent);

        await userService.ConsumeAsync(user!.Id, (long)quota, 0, token?.Key, channel.Id, model);
    }

    [HttpPost("/task/list-by-condition")]
    public async Task GetTaskListByCondition(GetTaskListByConditionInput input, HttpContext context)
    {
        var model = "midjourney";

        var rate = ModelManagerService.PromptRate[model];

        var (token, user) = await tokenService.CheckTokenAsync(context, rate);

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

        var sw = Stopwatch.StartNew();

        var request =
            new HttpRequestMessage(HttpMethod.Post, $"{channel.Address.TrimEnd('/')}/mj/task/list-by-condition");

        request.Headers.Add("Authorization", "Bearer " + channel?.Key);

        // 打印请求信息
        logger.LogInformation(
            $"获取结果接口：{request.RequestUri} \n 用户：{user.UserName} \n 渠道：{channel.Name} \n 模型：{model} \n");

        request.Content = new StringContent(JsonSerializer.Serialize(input, ThorJsonSerializer.DefaultOptions),
            System.Text.Encoding.UTF8, "application/json");

        var responseMessage = await client.SendAsync(request);

        sw.Stop();

        // 读取响应内容
        var responseContent = await responseMessage.Content.ReadAsStringAsync();

        // 如果查询成功，尝试关联本地任务日志
        if (responseMessage.IsSuccessStatusCode && !string.IsNullOrEmpty(responseContent))
        {
            try
            {
                var responseJson = JsonSerializer.Deserialize<GetTaskListByConditionDto[]>(responseContent);
                var taskIds = responseJson.Select(taskElement => taskElement.id)
                    .Where(taskId => !string.IsNullOrEmpty(taskId)).ToList();

                // 查询本地任务日志
                if (taskIds.Any())
                {
                    // 更新任务状态
                    foreach (var taskElement in responseJson)
                    {
                        if (taskElement.status == "SUCCESS")
                        {
                            await dbContext.ImageTaskLoggers.Where(x =>
                                    x.TaskId == taskElement.id && x.TaskStatus != ThorImageTaskStatus.Completed)
                                .ExecuteUpdateAsync(a =>
                                    a.SetProperty(x => x.TaskStatus, ThorImageTaskStatus.Completed)
                                        .SetProperty(x => x.Progress, 100)
                                        .SetProperty(x => x.ImageUrls,
                                            JsonSerializer.Serialize(
                                                responseJson.Select(x => x.imageUrl).ToArray(), ThorJsonSerializer
                                                    .DefaultOptions)));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogWarning("Failed to process task list response: {Error}", ex.Message);
            }
        }

        context.Response.Headers.ContentType = "application/json";
        await context.Response.WriteAsync(responseContent);
    }
}