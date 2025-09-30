using System.Diagnostics;
using System.Text;
using System.Text.Json;
using Thor.Abstractions.Anthropic;
using Thor.Abstractions.Exceptions;
using Thor.Domain.Chats;
using Thor.Domain.System;
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
    private async Task<(bool success, bool usedSubscription, string? errorMessage, string[]? subscriptionGroups)>
        CheckAndValidateQuotaAsync(User user, string model, long quota)
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

        bool header = false;
        var rateLimit = 0;
        bool hasConsumed = false; // 防重复扣费标记

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
                // 首先不检查Token额度获取用户信息，以便检查套餐状态
                var (token, user) = await tokenService.CheckTokenAsync(context, rate, false);

                // 检查用户是否有套餐，获取套餐分组信息
                var subscription = await subscriptionService.GetUserActiveSubscriptionAsync(user.Id);
                bool hasValidSubscription =
                    subscription?.Plan != null && subscription.Plan.IsModelAllowed(request.Model);

                // 如果没有有效套餐支持该模型，则需要检查Token额度和用户余额
                if (!hasValidSubscription)
                {
                    // 重新进行完整的Token检查（包括Token额度）
                    (token, user) = await tokenService.CheckTokenAsync(context, rate, true);
                }
                else
                {
                    // 请求前先校验套餐额度当天是否充足
                    if (subscription!.Plan!.DailyQuotaLimit > 0 &&
                        subscription.DailyUsedQuota >= subscription.Plan.DailyQuotaLimit)
                    {
                        context.Response.StatusCode = 402;
                        await context.WriteErrorAsync("当前套餐日额度已用尽，请明天再试或升级套餐", "402");
                        return;
                    }

                    // 请求前先校验套餐额度每周是否充足
                    if (subscription!.Plan!.WeeklyQuotaLimit > 0 &&
                        subscription.WeeklyUsedQuota >= subscription.Plan.WeeklyQuotaLimit)
                    {
                        context.Response.StatusCode = 402;
                        await context.WriteErrorAsync("当前套餐周额度已用尽，请下周再试或升级套餐", "402");
                        return;
                    }
                }

                await rateLimitModelService.CheckAsync(model, user.Id);

                TokenService.CheckModel(model, token, context);

                request.Model = await modelMapService.ModelMap(request.Model);

                string[]? subscriptionGroups = null;
                if (hasValidSubscription)
                {
                    subscriptionGroups = subscription!.Plan!.Groups;
                }

                // 获取渠道通过算法计算权重（优先使用套餐分组）
                var channel =
                    CalculateWeight(
                        await channelService.GetChannelsContainsModelWithSubscriptionGroupAsync(request.Model, user,
                            token, subscriptionGroups));

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

                var sw = Stopwatch.StartNew();

                // 如果使用套餐额度，添加响应头
                if (hasValidSubscription && !header)
                {
                    AddSubscriptionUsageHeaders(context, subscription!);
                    header = true;
                }

                if (request.Stream == true)
                {
                    using var activity =
                        Activity.Current?.Source.StartActivity("流式对话");

                    (requestToken, responseToken, cachedTokens, cacheWriteTokens) =
                        await StreamChatCompletionsHandlerAsync(context, request, channel, chatCompletionsService)
                            .ConfigureAwait(false);
                }
                else
                {
                    using var activity =
                        Activity.Current?.Source.StartActivity("非流式对话");

                    (requestToken, responseToken, cachedTokens, cacheWriteTokens) =
                        await ChatCompletionsHandlerAsync(context, request, channel, chatCompletionsService)
                            .ConfigureAwait(false);
                }

                sw.Stop();

                // 判断是否按次
                if (rate.QuotaType == ModelQuotaType.OnDemand)
                {
                    // 按照Anthropic定价规则计算费用：输入单价 * (文字输入 + 创建缓存Tokens * CacheRate + 命中缓存Tokens * 0.1 + 文字输出 * 补全倍率)
                    var completionRatio = rate.CompletionRate ?? GetCompletionRatio(model);

                    // 文字输入费用（不包括缓存相关的tokens）
                    var quota = requestToken * rate.PromptRate;

                    // 创建缓存费用 (使用动态的CacheRate倍率，默认1.25倍)
                    // 注意：缓存写入是额外成本，需要累加而非覆盖
                    if (cacheWriteTokens > 0)
                    {
                        var cacheWriteRate = rate.CacheRate ?? 1.25m;
                        quota += cacheWriteTokens * rate.PromptRate * cacheWriteRate;
                    }

                    // 命中缓存费用 (缓存命中享受90%折扣，仅按10%计费，默认0.1倍输入单价)
                    if (cachedTokens > 0)
                    {
                        var cacheHitRate = rate.CacheHitRate ?? 0.25m;
                        quota += cachedTokens * rate.PromptRate * cacheHitRate;
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
                        var cacheWriteRate = rate.CacheRate ?? 1.25m;
                        var cacheHitRate = rate.CacheHitRate ?? 0.25m;
                        var savingsPercent = Math.Round((1 - cacheHitRate) * 100, 2);
                        var writeExtraCost = Math.Round((cacheWriteRate - 1) * 100, 2);

                        template = string.Format(ConsumerTemplateCacheWriteTokens,
                            rate.PromptRate, completionRatio, userGroup.Rate,
                            cachedTokens, cacheHitRate, cacheWriteTokens,
                            savingsPercent, cacheWriteRate, writeExtraCost);
                    }
                    else if (cachedTokens > 0)
                    {
                        var cacheHitRate = rate.CacheHitRate ?? 0.25m;
                        var savingsPercent = Math.Round((1 - cacheHitRate) * 100, 2);

                        template = string.Format(ConsumerTemplateCache, rate.PromptRate, completionRatio,
                            userGroup.Rate,
                            cachedTokens, cacheHitRate, savingsPercent);
                    }
                    else
                    {
                        template = string.Format(ConsumerTemplate, rate.PromptRate, completionRatio,
                            userGroup.Rate);
                    }

                    // 添加扣费来源信息
                    if (hasValidSubscription)
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

                    // 防止重试导致重复扣费
                    if (!hasConsumed)
                    {
                        await ConsumeQuotaAsync(user!, model, (long)quota, requestToken, responseToken,
                            hasValidSubscription, token?.Key, channel.Id, context);
                        hasConsumed = true;

                        // 扣费成功后再记录日志，确保数据一致性
                        await loggerService.CreateConsumeAsync("/v1/messages", template,
                            model,
                            requestToken, responseToken, (int)quota, token?.Key, user?.UserName, user?.Id, channel.Id,
                            channel.Name, context.GetIpAddress(), context.GetUserAgent(),
                            request.Stream is true,
                            (int)sw.ElapsedMilliseconds, organizationId);
                    }
                }
                else
                {
                    // 准备内容，记录是否使用套餐
                    var content = string.Format(ConsumerTemplateOnDemand, RenderHelper.RenderQuota(rate.PromptRate),
                        userGroup.Rate);
                    if (hasValidSubscription)
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

                    // 防止重试导致重复扣费
                    if (!hasConsumed)
                    {
                        await ConsumeQuotaAsync(user!, model, (long)rate.PromptRate, requestToken, responseToken,
                            hasValidSubscription, token?.Key, channel.Id, context);
                        hasConsumed = true;

                        // 扣费成功后再记录日志，确保数据一致性
                        await loggerService.CreateConsumeAsync("/v1/messages",
                            content,
                            model,
                            requestToken, responseToken, (int)((int)rate.PromptRate * (decimal)userGroup.Rate), token?.Key,
                            user?.UserName, user?.Id,
                            channel.Id,
                            channel.Name, context.GetIpAddress(), context.GetUserAgent(),
                            request.Stream is true,
                            (int)sw.ElapsedMilliseconds, organizationId);
                    }
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

    private static async Task<(int requestToken, int responseToken, int cachedTokens, int cacheWriteTokens)>
        ChatCompletionsHandlerAsync(
            HttpContext context, AnthropicInput input, ChatChannel channel,
            IAnthropicChatCompletionsService openService)
    {
        var requestToken = 0;
        var responseToken = 0;

        // 命中缓存tokens数量
        var cachedTokens = 0;
        var cacheWriteTokens = 0;

        var platformOptions = new ThorPlatformOptions(channel.Address, channel.Key, channel.Other);

        var result = await openService.ChatCompletionsAsync(input, platformOptions);

        await context.Response.WriteAsJsonAsync(result);

        if (result?.Usage?.CacheReadInputTokens.HasValue == true)
        {
            cachedTokens = result.Usage.CacheReadInputTokens.Value;
        }

        if (result?.Usage?.CacheCreationInputTokens.HasValue == true)
        {
            cacheWriteTokens = result.Usage.CacheCreationInputTokens.Value;
        }

        if (result?.Usage?.InputTokens.HasValue == true)
        {
            requestToken = result.Usage.InputTokens.Value;
        }

        if (result?.Usage?.OutputTokens.HasValue == true)
        {
            responseToken = result.Usage.OutputTokens.Value;
        }

        return (requestToken, responseToken, cachedTokens, cacheWriteTokens);
    }

    private async Task<(int requestToken, int responseToken, int cachedTokens, int cacheWriteTokens)>
        StreamChatCompletionsHandlerAsync(
            HttpContext context,
            AnthropicInput input, ChatChannel channel, IAnthropicChatCompletionsService openService)
    {
        var requestToken = 0;

        var platformOptions = new ThorPlatformOptions(channel.Address, channel.Key, channel.Other);

        var cachedTokens = 0;
        var cacheWriteTokens = 0;


        // 是否第一次输出
        var isFirst = true;
        var responseToken = 0;

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

            if (item?.Usage is { InputTokens: > 0 } || item?.Message?.Usage?.InputTokens > 0)
            {
                requestToken = item.Usage?.InputTokens ?? item.Message?.Usage?.InputTokens ?? 0;
            }

            await context.WriteAsEventStreamDataAsync(eventName.Trim(), item);
        }

        return (requestToken, responseToken, cachedTokens, cacheWriteTokens);
    }

    private static void AddSubscriptionUsageHeaders(HttpContext context, UserSubscription userSubscription)
    {
        // 计算剩余配额
        var dailyRemaining = Math.Max(0, userSubscription.Plan!.DailyQuotaLimit - userSubscription.DailyUsedQuota);
        var weeklyRemaining = Math.Max(0, userSubscription.Plan.WeeklyQuotaLimit - userSubscription.WeeklyUsedQuota);

        // 添加 Claude API 风格的限流响应头
        context.Response.Headers["anthropic-ratelimit-requests-limit"] =
            Math.Min(dailyRemaining, weeklyRemaining).ToString();
        context.Response.Headers["anthropic-ratelimit-requests-remaining"] =
            Math.Min(dailyRemaining, weeklyRemaining).ToString();

        // 计算重置时间 (基于SubscriptionService的重置算法)
        var now = DateTime.Now;
        var tomorrowUtc = now.Date.AddDays(1); // 下一天UTC零点
        var dailyResetSeconds = (long)(tomorrowUtc - now).TotalSeconds;

        var weekStart = GetWeekStart(now);
        var nextWeekStart = weekStart.AddDays(7); // 下周一UTC零点
        var weeklyResetSeconds = (long)(nextWeekStart - now).TotalSeconds;

        // 使用较短的重置时间
        var resetSeconds = Math.Min(dailyResetSeconds, weeklyResetSeconds);
        var resetTime = DateTimeOffset.Now.AddSeconds(resetSeconds);

        context.Response.Headers["anthropic-ratelimit-requests-reset"] = resetTime.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
        context.Response.Headers["retry-after"] = resetSeconds.ToString();
    }

    private static DateTime GetWeekStart(DateTime date)
    {
        // 基于SubscriptionService的GetWeekStart逻辑：周一为一周开始
        var diff = (7 + (date.DayOfWeek - DayOfWeek.Monday)) % 7;
        return date.AddDays(-1 * diff).Date;
    }
}