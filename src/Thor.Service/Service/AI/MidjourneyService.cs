using System.Diagnostics;
using System.Text.Json;
using Making.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Thor.Abstractions.Dtos;
using Thor.Abstractions.Exceptions;
using Thor.Abstractions.Images;
using Thor.Abstractions.Midjourney;
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
    ILogger<MidjourneyService> logger) : AIService(serviceProvider, imageService)
{
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

        context.Response.Headers.ContentType = "application/json";
        await responseMessage.Content.CopyToAsync(context.Response.Body);

        await loggerService.CreateConsumeAsync("/mj/submit/imagine",
            string.Format(ConsumerImageTemplate, rate.PromptRate, userGroup.Rate),
            model,
            0, 0, (int)quota, token?.Key, user?.UserName, user?.Id, channel.Id,
            channel.Name, context.GetIpAddress(), context.GetUserAgent(), false, (int)sw.ElapsedMilliseconds,
            string.Empty);

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

        context.Response.Headers.ContentType = "application/json";
        await responseMessage.Content.CopyToAsync(context.Response.Body);

        await loggerService.CreateConsumeAsync("/mj/submit/blend",
            string.Format(ConsumerImageTemplate, rate.PromptRate, userGroup.Rate),
            model,
            0, 0, (int)quota, token?.Key, user?.UserName, user?.Id, channel.Id,
            channel.Name, context.GetIpAddress(), context.GetUserAgent(), false, (int)sw.ElapsedMilliseconds,
            string.Empty);

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

        context.Response.Headers.ContentType = "application/json";
        await responseMessage.Content.CopyToAsync(context.Response.Body);

        await loggerService.CreateConsumeAsync("/mj/submit/describe",
            string.Format(ConsumerImageTemplate, rate.PromptRate, userGroup.Rate),
            model,
            0, 0, (int)quota, token?.Key, user?.UserName, user?.Id, channel.Id,
            channel.Name, context.GetIpAddress(), context.GetUserAgent(), false, (int)sw.ElapsedMilliseconds,
            string.Empty);

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

        context.Response.Headers.ContentType = "application/json";
        await responseMessage.Content.CopyToAsync(context.Response.Body);

        await loggerService.CreateConsumeAsync("/mj/submit/shorten",
            string.Format(ConsumerImageTemplate, rate.PromptRate, userGroup.Rate),
            model,
            0, 0, (int)quota, token?.Key, user?.UserName, user?.Id, channel.Id,
            channel.Name, context.GetIpAddress(), context.GetUserAgent(), false, (int)sw.ElapsedMilliseconds,
            string.Empty);

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

        context.Response.Headers.ContentType = "application/json";
        await responseMessage.Content.CopyToAsync(context.Response.Body);

        await loggerService.CreateConsumeAsync("/mj/submit/modal",
            string.Format(ConsumerImageTemplate, rate.PromptRate, userGroup.Rate),
            model,
            0, 0, (int)quota, token?.Key, user?.UserName, user?.Id, channel.Id,
            channel.Name, context.GetIpAddress(), context.GetUserAgent(), false, (int)sw.ElapsedMilliseconds,
            string.Empty);

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

        context.Response.Headers.ContentType = "application/json";
        await responseMessage.Content.CopyToAsync(context.Response.Body);

        await loggerService.CreateConsumeAsync("/mj/task/list-by-condition",
            string.Format(ConsumerImageTemplate, 0, 0),
            model,
            0, 0, 0, token?.Key, user?.UserName, user?.Id, channel.Id,
            channel.Name, context.GetIpAddress(), context.GetUserAgent(), false, (int)sw.ElapsedMilliseconds,
            string.Empty);
    }
}