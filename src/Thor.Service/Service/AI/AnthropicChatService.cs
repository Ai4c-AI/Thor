using System.Diagnostics;
using System.Text;
using System.Text.Json;
using Thor.Abstractions.Anthropic;
using Thor.Abstractions.Exceptions;
using Thor.Domain.Chats;
using Thor.Infrastructure;
using Thor.Service.Domain.Core;
using Thor.Service.Extensions;
using Thor.Service.Infrastructure;
using Thor.Service.Infrastructure.Middlewares;

namespace Thor.Service.Service.AI;

public class AnthropicChatService(
    IServiceProvider serviceProvider,
    ImageService imageService,
    TokenService tokenService,
    RateLimitModelService rateLimitModelService,
    ModelMapService modelMapService,
    ChannelService channelService,
    UserGroupService userGroupService,
    LoggerService loggerService,
    UserService userService,
    ILogger<AnthropicChatService> logger,
    ContextPricingService contextPricingService,
    SubscriptionService subscriptionService)
    : AIService(serviceProvider, imageService)
{
    /// <summary>
    /// 检查并处理用户额度（优先使用套餐额度，不足时使用用户余额）
    /// </summary>
    /// <param name="user">用户信息</param>
    /// <param name="model">模型名称</param>
    /// <param name="quota">需要消费的额度</param>
    /// <returns>是否成功，使用的额度类型，错误信息，套餐分组</returns>
    private async Task<(bool success, bool usedSubscription, string? errorMessage, string[]? subscriptionGroups)> CheckAndValidateQuotaAsync(User user, string model, long quota)
    {
        // 1. 先检查用户是否有有效套餐
        var subscription = await subscriptionService.GetUserActiveSubscriptionAsync(user.Id);

        if (subscription?.Plan != null)
        {
            // 2. 检查套餐是否支持该模型
            if (subscription.Plan.IsModelAllowed(model))
            {
                // 3. 检查套餐额度是否充足
                var (hasSufficient, reason) = await subscriptionService.CheckQuotaSufficientAsync(user.Id, quota);
                if (hasSufficient)
                {
                    return (true, true, null, subscription.Plan.Groups); // 使用套餐额度，返回套餐分组
                }

                // 套餐额度不足，尝试使用用户余额
                if (quota <= user.ResidualCredit)
                {
                    return (true, false, null, null); // 使用用户余额
                }

                return (false, false, "套餐额度不足且用户余额不足，请充值或升级套餐", null);
            }
        }

        // 4. 没有套餐或套餐不支持该模型，检查用户余额
        if (quota <= user.ResidualCredit)
        {
            return (true, false, null, null); // 使用用户余额
        }

        // 5. 根据是否有套餐给出不同提示
        if (subscription?.Plan != null)
        {
            return (false, false, "当前套餐不支持该模型且用户余额不足，请充值或升级套餐", null);
        }

        return (false, false, "账号余额不足请充值", null);
    }

    /// <summary>
    /// 消费额度（优先消费套餐额度）
    /// </summary>
    /// <param name="user">用户信息</param>
    /// <param name="model">模型名称</param>
    /// <param name="quota">消费的额度</param>
    /// <param name="requestTokens">请求token数</param>
    /// <param name="responseTokens">响应token数</param>
    /// <param name="usedSubscription">是否使用了套餐额度</param>
    /// <param name="tokenKey">token key</param>
    /// <param name="channelId">渠道ID</param>
    /// <param name="context">HTTP上下文</param>
    private async Task ConsumeQuotaAsync(User user, string model, long quota, int requestTokens, int responseTokens,
        bool usedSubscription, string? tokenKey, string channelId, HttpContext context)
    {
        if (usedSubscription)
        {
            // 使用套餐额度
            await subscriptionService.ConsumeQuotaAsync(
                user.Id, model, quota, requestTokens, responseTokens,
                context.GetIpAddress(), context.GetUserAgent());
        }
        else
        {
            // 使用用户余额
            await userService.ConsumeAsync(user.Id, quota, requestTokens, tokenKey, channelId, model);
        }
    }
    public async Task MessageAsync(HttpContext context, AnthropicInput request)
    {
        using var chatCompletions =
            Activity.Current?.Source.StartActivity("Anthropic对话补全调用");

        var model = request.Model;
        Exception? lastException = null;

        var rateLimit = 0;

        limitGoto:

        try
        {
            var organizationId = string.Empty;
            if (context.Request.Headers.TryGetValue("OpenAI-Organization", out var organizationIdHeader))
            {
                organizationId = organizationIdHeader.ToString();
            }

            if (!ModelManagerService.PromptRate.TryGetValue(model, out var rate))
            {
                context.Response.StatusCode = 400;
                await context.WriteErrorAsync($"当前{model}模型未设置倍率,请联系管理员设置倍率", "400");
            }
            else
            {
                var (token, user) = await tokenService.CheckTokenAsync(context, rate);

                await rateLimitModelService.CheckAsync(model, user.Id);

                TokenService.CheckModel(model, token, context);

                request.Model = await modelMapService.ModelMap(request.Model);

                // 检查用户是否有套餐，获取套餐分组信息
                var subscription = await subscriptionService.GetUserActiveSubscriptionAsync(user.Id);
                string[]? subscriptionGroups = null;
                if (subscription?.Plan != null && subscription.Plan.IsModelAllowed(request.Model))
                {
                    subscriptionGroups = subscription.Plan.Groups;
                }

                // 获取渠道通过算法计算权重（优先使用套餐分组）
                var channel =
                    CalculateWeight(await channelService.GetChannelsContainsModelWithSubscriptionGroupAsync(request.Model, user, token, subscriptionGroups));

                switch (channel)
                {
                    case null when lastException != null:
                        try
                        {
                            logger.LogError("对话模型请求异常：{lastException}，请求参数：{request}",
                                lastException, JsonSerializer.Serialize(request, ThorJsonSerializer.DefaultOptions));

                            await context.WriteErrorAsync(
                                lastException.Message, "400");
                        }
                        catch (Exception e)
                        {
                        }

                        return;
                    case null:
                        throw new NotModelException(
                            $"{model}在分组：{(token?.Groups.FirstOrDefault() ?? user.Groups.FirstOrDefault())} 未找到可用渠道");
                }

                var userGroup = await userGroupService.GetAsync(channel.Groups);

                if (userGroup == null)
                {
                    throw new BusinessException("当前渠道未设置分组，请联系管理员设置分组", "400");
                }

                ChannelAsyncLocal.ChannelIds.Add(channel.Id);

                // 获取渠道指定的实现类型的服务
                var chatCompletionsService = GetKeyedService<IAnthropicChatCompletionsService>(channel.Type);

                if (chatCompletionsService == null)
                {
                    throw new BusinessException($"并未实现：{channel.Type} 的服务", "400");
                }

                // 记录请求模型 / 请求用户
                logger.LogInformation("请求模型：{model} 请求用户：{user} 请求分配渠道 ：{name}", model, user?.UserName,
                    channel.Name);

                int requestToken;
                var responseToken = 0;
                int cachedTokens = 0;
                int cacheWriteTokens = 0;
                bool usedSubscription = false;

                var sw = Stopwatch.StartNew();

                if (request.Stream == true)
                {
                    using var activity =
                        Activity.Current?.Source.StartActivity("流式对话", ActivityKind.Internal);

                    (requestToken, responseToken, cachedTokens, cacheWriteTokens, usedSubscription) =
                        await StreamChatCompletionsHandlerAsync(context, request, channel, chatCompletionsService, user,
                            rate).ConfigureAwait(false);
                }
                else
                {
                    using var activity =
                        Activity.Current?.Source.StartActivity("非流式对话", ActivityKind.Internal);

                    (requestToken, responseToken, cachedTokens, cacheWriteTokens, usedSubscription) =
                        await ChatCompletionsHandlerAsync(context, request, channel, chatCompletionsService, user,
                            rate).ConfigureAwait(false);
                }

                sw.Stop();

                // 判断是否按次
                if (rate.QuotaType == ModelQuotaType.OnDemand)
                {
                    // 按照Anthropic定价规则计算费用：输入单价 * (文字输入 + 创建缓存Tokens * CacheRate + 命中缓存Tokens * 0.1 + 文字输出 * 补全倍率)
                    var completionRatio = rate.CompletionRate ?? GetCompletionRatio(model);

                    // 文字输入费用
                    var quota = requestToken * rate.PromptRate;

                    // 创建缓存费用 (使用动态的CacheRate倍率)
                    if (cacheWriteTokens > 0 && rate.CacheRate.HasValue)
                    {
                        quota = cacheWriteTokens * rate.CacheRate.Value;
                    }
                    else if (cacheWriteTokens > 0)
                    {
                        // 如果没有设置CacheRate，则使用默认的1.25倍率
                        quota += cacheWriteTokens * 1.25m;
                    }

                    // 命中缓存费用 (0.1倍输入单价)
                    if (cachedTokens > 0 && rate.CacheHitRate.HasValue)
                    {
                        quota += cachedTokens * rate.CacheHitRate.Value;
                    }

                    // 文字输出费用 (输入单价 * 补全倍率)
                    quota += responseToken * rate.PromptRate * completionRatio;

                    // 计算分组倍率
                    quota = (decimal)userGroup!.Rate * quota;

                    // 将quota 四舍五入
                    quota = Math.Round(quota, 0, MidpointRounding.AwayFromZero);

                    var template = "";
                    if (cacheWriteTokens > 0)
                    {
                        template = string.Format(ConsumerTemplateCacheWriteTokens,
                            rate.PromptRate, completionRatio, userGroup.Rate,
                            cachedTokens, rate.CacheRate, cacheWriteTokens);
                    }
                    else if (cachedTokens > 0)
                    {
                        template = string.Format(ConsumerTemplateCache, rate.PromptRate, completionRatio,
                            userGroup.Rate,
                            cachedTokens, rate.CacheRate);
                    }
                    else
                    {
                        template = string.Format(ConsumerTemplate, rate.PromptRate, completionRatio,
                            userGroup.Rate);
                    }

                    // 添加扣费来源信息
                    if (usedSubscription)
                    {
                        var userSubscription = await subscriptionService.GetUserActiveSubscriptionAsync(user!.Id);
                        if (userSubscription?.Plan != null)
                        {
                            template += $" 扣费来源：套餐额度({userSubscription.Plan.Name})";
                        }
                    }
                    else
                    {
                        template += " 扣费来源：用户余额";
                    }

                    await loggerService.CreateConsumeAsync("/v1/messages", template,
                        model,
                        requestToken, responseToken, (int)quota, token?.Key, user?.UserName, user?.Id, channel.Id,
                        channel.Name, context.GetIpAddress(), context.GetUserAgent(),
                        request.Stream is true,
                        (int)sw.ElapsedMilliseconds, organizationId);

                    await ConsumeQuotaAsync(user!, model, (long)quota, requestToken, responseToken,
                        usedSubscription, token?.Key, channel.Id, context);
                }
                else
                {
                    // 准备内容，记录是否使用套餐
                    var content = string.Format(ConsumerTemplateOnDemand, RenderHelper.RenderQuota(rate.PromptRate),
                        userGroup.Rate);
                    if (usedSubscription)
                    {
                        var userSubscription = await subscriptionService.GetUserActiveSubscriptionAsync(user!.Id);
                        if (userSubscription?.Plan != null)
                        {
                            content += $" 扣费来源：套餐额度({userSubscription.Plan.Name})";
                        }
                    }
                    else
                    {
                        content += " 扣费来源：用户余额";
                    }

                    // 费用
                    await loggerService.CreateConsumeAsync("/v1/messages",
                        content,
                        model,
                        requestToken, responseToken, (int)((int)rate.PromptRate * (decimal)userGroup.Rate), token?.Key,
                        user?.UserName, user?.Id,
                        channel.Id,
                        channel.Name, context.GetIpAddress(), context.GetUserAgent(),
                        request.Stream is true,
                        (int)sw.ElapsedMilliseconds, organizationId);

                    await ConsumeQuotaAsync(user!, model, (long)rate.PromptRate, requestToken, responseToken,
                        usedSubscription, token?.Key, channel.Id, context);
                }
            }
        }
        catch (ForbiddenException forbiddenException)
        {
            lastException = forbiddenException;
            logger.LogWarning("对话模型请求被禁止：{message}", forbiddenException.Message);
            rateLimit++;

            if (rateLimit > 50)
            {
                context.Response.StatusCode = 403;
            }
            else
            {
                request.Model = model;
                goto limitGoto;
            }
        }
        catch (ThorRateLimitException thorRateLimitException)
        {
            lastException = thorRateLimitException;
            logger.LogWarning("对话模型请求限流：{rateLimit}", rateLimit);
            rateLimit++;
            // TODO：限流重试次数
            if (rateLimit > 50)
            {
                context.Response.StatusCode = 429;
            }
            else
            {
                request.Model = model;
                goto limitGoto;
            }
        }
        catch (InsufficientQuotaException insufficientQuotaException)
        {
            if (context.Response.StatusCode != 402)
            {
                context.Response.StatusCode = 402;
            }

            await context.WriteErrorAsync(insufficientQuotaException.Message, "402");
        }
        catch (RateLimitException)
        {
            context.Response.StatusCode = 429;
        }
        catch (UnauthorizedAccessException e)
        {
            context.Response.StatusCode = 401;
        }
        catch (OpenAIErrorException error)
        {
            context.Response.StatusCode = 400;
            await context.WriteErrorAsync(error.Message, error.Code);
        }
        catch (NotModelException modelException)
        {
            context.Response.StatusCode = 400;
            await context.WriteErrorAsync(modelException.Message, "400");
        }
        catch (Exception e)
        {
            lastException = e;
            // 读取body
            logger.LogError("对话模型请求异常：{e} 准备重试{rateLimit}，请求参数：{request}", e, rateLimit,
                JsonSerializer.Serialize(request, ThorJsonSerializer.DefaultOptions));
            logger.LogError("对话模型请求异常：{e} 准备重试{rateLimit}，请求参数：{request}", e, rateLimit,
                JsonSerializer.Serialize(request, ThorJsonSerializer.DefaultOptions));
            rateLimit++;
            // TODO：限流重试次数
            if (rateLimit > 50)
            {
                context.Response.StatusCode = 400;
                await context.WriteErrorAsync(e.Message, "500");
            }
            else
            {
                request.Model = model;
                goto limitGoto;
            }
        }
    }

    private async Task<(int requestToken, int responseToken, int cachedTokens, int cacheWriteTokens, bool usedSubscription)>
        ChatCompletionsHandlerAsync(
            HttpContext context, AnthropicInput input, ChatChannel channel,
            IAnthropicChatCompletionsService openService, User? user, ModelManager rate)
    {
        int requestToken = 0;
        int responseToken = 0;

        // 命中缓存tokens数量
        int cachedTokens = 0;
        int cacheWriteTokens = 0;
        bool usedSubscription = false;

        var platformOptions = new ThorPlatformOptions(channel.Address, channel.Key, channel.Other);

        AnthropicChatCompletionDto result = null;

        if (!string.IsNullOrEmpty(input.System))
        {
            requestToken += TokenHelper.GetTotalTokens(input.System);
        }

        if (input.Systems?.Count > 0)
        {
            requestToken += TokenHelper.GetTotalTokens(input.Systems.Select(x => x.Text).ToArray());
        }

        if (input.Tools != null)
        {
            foreach (var tool in input.Tools)
            {
                requestToken += TokenHelper.GetTotalTokens(tool.name, tool.Description);
                requestToken += TokenHelper.GetTotalTokens(tool?.InputSchema?.Required ?? []);
                requestToken += TokenHelper.GetTotalTokens(JsonSerializer.Serialize(tool?.InputSchema?.Properties));
            }
        }

        // 这里应该用其他的方式来判断是否是vision模型，目前先这样处理
        if (rate.QuotaType == ModelQuotaType.OnDemand && input.Messages.Any(x => x.Contents != null))
        {
            foreach (var content in input?.Messages.Where(x => x.Contents != null)
                         .SelectMany(x => x.Contents))
            {
                requestToken += TokenHelper.GetTotalTokens(content.Text ?? string.Empty);
                if (content.Content != null)
                {
                    requestToken += TokenHelper.GetTotalTokens(JsonSerializer.Serialize(content.Content));
                }

                if (content.Input != null)
                {
                    requestToken += TokenHelper.GetTotalTokens(JsonSerializer.Serialize(content.Input));
                }
            }

            requestToken += TokenHelper.GetTotalTokens(input.Messages.Where(x => x.Contents == null)
                .Select(x => x.Content).ToArray());

            // 解析图片
            foreach (var message in input.Messages.Where(x => x.Contents != null).SelectMany(x => x.Contents)
                         .Where(x => x.Type is "image" or "image_url"))
            {
                var imageUrl = message.Source;
                if (imageUrl != null)
                {
                    var url = imageUrl.Data;

                    try
                    {
                        var imageTokens = await CountImageTokens(url, "high");
                        requestToken += imageTokens.Item1;
                    }
                    catch (Exception ex)
                    {
                        GetLogger<ChatService>().LogError("Error counting image tokens: " + ex.Message);
                    }
                }
            }

            var quota = requestToken * rate.PromptRate;

            // 检查额度（优先使用套餐额度）
            var (quotaSuccess, quotaUsedSubscription, quotaErrorMessage, subscriptionGroups) = await CheckAndValidateQuotaAsync(user, input.Model, (long)quota);
            if (!quotaSuccess)
            {
                throw new InsufficientQuotaException(quotaErrorMessage!);
            }
            usedSubscription = quotaUsedSubscription;

            result = await openService.ChatCompletionsAsync(input, platformOptions);

            await context.Response.WriteAsJsonAsync(result);

            if (result?.Usage?.InputTokens is not null && result.Usage.InputTokens > 0)
            {
                requestToken = result.Usage.InputTokens.Value;
            }

            // 如果存在返回的Usage则使用返回的Usage中的CompletionTokens
            if (result?.Usage?.OutputTokens is not null && result.Usage.OutputTokens > 0)
            {
                responseToken = result.Usage.OutputTokens.Value;
            }
            else
            {
                responseToken =
                    TokenHelper.GetTotalTokens(result?.content?.Select(x => x.text).ToArray() ?? []);
            }
        }
        else if (rate.QuotaType == ModelQuotaType.OnDemand)
        {
            var contentArray = input.Messages.Select(x => x.Content).ToArray();
            requestToken = TokenHelper.GetTotalTokens(contentArray);

            var quota = requestToken * rate.PromptRate;

            // 检查额度（优先使用套餐额度）
            var (quotaSuccess, quotaUsedSubscription, quotaErrorMessage, subscriptionGroups) = await CheckAndValidateQuotaAsync(user, input.Model, (long)quota);
            if (!quotaSuccess)
            {
                throw new InsufficientQuotaException(quotaErrorMessage!);
            }
            usedSubscription = quotaUsedSubscription;

            result = await openService.ChatCompletionsAsync(input, platformOptions);

            await context.Response.WriteAsJsonAsync(result);
        }
        else
        {
            result = await openService.ChatCompletionsAsync(input, platformOptions);

            await context.Response.WriteAsJsonAsync(result);
        }

        if (result?.Usage?.InputTokens is not null && result.Usage.InputTokens > 0)
        {
            requestToken = result.Usage.InputTokens.Value;
        }

        if (result?.Usage?.OutputTokens is not null && result.Usage.OutputTokens > 0)
        {
            responseToken = result.Usage.OutputTokens.Value;
        }
        else
        {
            responseToken += TokenHelper.GetTotalTokens(result?.content?.Select(x => x.text).ToArray() ?? []);
            responseToken += TokenHelper.GetTotalTokens(result?.content?.Select(x => x.Thinking).ToArray() ?? []);
            responseToken +=
                TokenHelper.GetTotalTokens(
                    result?.content?.Where(x => x.input != null).Select(x =>
                        JsonSerializer.Serialize(x.input, ThorJsonSerializer.DefaultOptions)).ToArray() ?? []);
        }

        if (result?.Usage?.CacheReadInputTokens.HasValue == true)
        {
            cachedTokens = result.Usage.CacheReadInputTokens.Value;
        }

        if (result?.Usage?.CacheCreationInputTokens.HasValue == true)
        {
            cacheWriteTokens = result.Usage.CacheCreationInputTokens.Value;
        }

        return (requestToken, responseToken, cachedTokens, cacheWriteTokens, usedSubscription);
    }

    private async Task<(int requestToken, int responseToken, int cachedTokens, int cacheWriteTokens, bool usedSubscription)>
        StreamChatCompletionsHandlerAsync(
            HttpContext context,
            AnthropicInput input, ChatChannel channel, IAnthropicChatCompletionsService openService, User? user,
            ModelManager rate)
    {
        int requestToken = 0;

        var platformOptions = new ThorPlatformOptions(channel.Address, channel.Key, channel.Other);

        var responseMessage = new StringBuilder();
        int cachedTokens = 0;
        int cacheWriteTokens = 0;
        bool usedSubscription = false;

        requestToken += TokenHelper.GetTotalTokens(input?.System);
        requestToken += TokenHelper.GetTotalTokens(input?.Systems?.Select(x => x.Text).ToArray() ?? []);

        if (!string.IsNullOrEmpty(input.System))
        {
            requestToken += TokenHelper.GetTotalTokens(input.System);
        }

        if (input.Systems?.Count > 0)
        {
            requestToken += TokenHelper.GetTotalTokens(input.Systems.Select(x => x.Text).ToArray());
        }

        if (input.Tools != null)
        {
            foreach (var tool in input.Tools)
            {
                requestToken += TokenHelper.GetTotalTokens(tool.name, tool.Description);
                requestToken += TokenHelper.GetTotalTokens(tool?.InputSchema?.Required ?? []);
                requestToken += TokenHelper.GetTotalTokens(JsonSerializer.Serialize(tool?.InputSchema?.Properties));
            }
        }

        if (input.Messages.Any(x => x.Contents != null) && rate.QuotaType == ModelQuotaType.OnDemand)
        {
            foreach (var content in input?.Messages.Where(x => x.Contents != null)
                         .SelectMany(x => x.Contents))
            {
                requestToken += TokenHelper.GetTotalTokens(content.Text ?? string.Empty);
                if (content.Content != null)
                {
                    requestToken += TokenHelper.GetTotalTokens(JsonSerializer.Serialize(content.Content));
                }

                if (content.Input != null)
                {
                    requestToken += TokenHelper.GetTotalTokens(JsonSerializer.Serialize(content.Input));
                }
            }

            requestToken += TokenHelper.GetTotalTokens(input.Messages.Where(x => x.Contents == null)
                .Select(x => x.Content).ToArray());

            requestToken += TokenHelper.GetTotalTokens(input.Messages.Where(x => x.Contents == null)
                .Select(x => x.Content).ToArray());

            foreach (var message in input.Messages.Where(x => x is { Contents: not null }).SelectMany(x => x.Contents)
                         .Where(x => x.Type is "image" or "image_url"))
            {
                var imageUrl = message.Source;
                if (imageUrl == null) continue;
                var url = imageUrl.MediaType;
                var detail = "";
                try
                {
                    var imageTokens = await CountImageTokens(url, detail);
                    requestToken += imageTokens.Item1;
                }
                catch (Exception ex)
                {
                    GetLogger<ChatService>().LogError("Error counting image tokens: " + ex.Message);
                }
            }

            var quota = requestToken * rate.PromptRate;

            // 检查额度（优先使用套餐额度）
            var (quotaSuccess, quotaUsedSubscription, quotaErrorMessage, subscriptionGroups) = await CheckAndValidateQuotaAsync(user, input.Model, (long)quota);
            if (!quotaSuccess)
            {
                throw new InsufficientQuotaException(quotaErrorMessage!);
            }
            usedSubscription = quotaUsedSubscription;
        }
        else if (rate.QuotaType == ModelQuotaType.OnDemand)
        {
            requestToken = TokenHelper.GetTotalTokens(input?.Messages.Select(x => x.Content).ToArray());


            var quota = requestToken * rate.PromptRate;

            // 检查额度（优先使用套餐额度）
            var (quotaSuccess, quotaUsedSubscription, quotaErrorMessage, subscriptionGroups) = await CheckAndValidateQuotaAsync(user, input.Model, (long)quota);
            if (!quotaSuccess)
            {
                throw new InsufficientQuotaException(quotaErrorMessage!);
            }
            usedSubscription = quotaUsedSubscription;
        }

        // 是否第一次输出
        bool isFirst = true;
        int responseToken = 0;

        await foreach (var (@eventName, item) in openService.StreamChatCompletionsAsync(input, platformOptions))
        {
            if (isFirst)
            {
                context.SetEventStreamHeaders();
                isFirst = false;
            }

            if (item?.Usage is { CacheCreationInputTokens: > 0 } || item?.Message?.Usage?.CacheCreationInputTokens > 0)
            {
                cacheWriteTokens =
                    (item.Usage?.CacheCreationInputTokens ?? item?.Message?.Usage?.CacheCreationInputTokens) ?? 0;
            }

            if (item?.Usage is { CacheReadInputTokens: > 0 } || item?.Message?.Usage?.CacheReadInputTokens > 0)
            {
                cachedTokens =
                    (item.Usage?.CacheReadInputTokens ?? item.Message?.Usage?.CacheReadInputTokens ?? 0);
            }

            if (item?.Usage is { OutputTokens: > 0 } || item?.Message?.Usage?.OutputTokens > 0)
            {
                responseToken = item.Usage?.OutputTokens ?? item.Message?.Usage?.OutputTokens ?? 0;
            }
            else
            {
                responseToken +=
                    TokenHelper.GetTotalTokens(item?.Message?.content.Select(x => x.Thinking ?? x.text ?? x.PartialJson)
                        .ToArray() ?? []);
            }

            if (item?.Usage is { InputTokens: > 0 } || item?.Message?.Usage?.InputTokens > 0)
            {
                requestToken = item.Usage?.InputTokens ?? item.Message?.Usage?.InputTokens ?? 0;
            }

            await context.WriteAsEventStreamDataAsync(eventName.Trim(), item);
        }

        responseToken = rate.QuotaType switch
        {
            ModelQuotaType.OnDemand when responseToken == 0 => TokenHelper.GetTokens(responseMessage.ToString()),
            ModelQuotaType.ByCount => rate.QuotaType == ModelQuotaType.OnDemand
                ? TokenHelper.GetTokens(responseMessage.ToString())
                : 0,
            _ => responseToken
        };

        return (requestToken, responseToken, cachedTokens, cacheWriteTokens, usedSubscription);
    }
}