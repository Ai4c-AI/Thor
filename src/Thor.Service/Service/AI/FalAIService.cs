using System.Diagnostics;
using System.Text.Json;
using Making.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Thor.Abstractions.Dtos;
using Thor.Abstractions.Exceptions;
using Thor.Abstractions.Images;
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
    ILogger<FalAIService> logger) : AIService(serviceProvider, imageService)
{
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

        context.Response.Headers.ContentType = "application/json";
        await responseMessage.Content.CopyToAsync(context.Response.Body);

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

        context.Response.Headers.ContentType = "application/json";
        await responseMessage.Content.CopyToAsync(context.Response.Body);

        sw.Stop();

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

        context.Response.Headers.ContentType = "application/json";
        await responseMessage.Content.CopyToAsync(context.Response.Body);

        logger.LogInformation($"获取结果接口耗时：{responseMessage.RequestMessage?.RequestUri} ");
    }
}