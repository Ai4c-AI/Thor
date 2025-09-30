using Thor.Abstractions.Exceptions;
using Thor.Domain.System;
using Thor.Service.Domain.Core;

namespace Thor.Service.Service;

/// <summary>
/// 套餐限流服务
/// </summary>
public class SubscriptionRateLimitService(IServiceProvider serviceProvider, SubscriptionService subscriptionService)
    : ApplicationService(serviceProvider)
{
    /// <summary>
    /// 检查用户请求是否被允许（综合权限检查）
    /// </summary>
    /// <param name="userId">用户ID</param>
    /// <param name="modelName">模型名称</param>
    /// <param name="estimatedQuota">预估额度消耗（美分）</param>
    /// <returns></returns>
    public async Task<RateLimitResult> CheckRequestAllowedAsync(string userId, string modelName, long estimatedQuota)
    {
        try
        {
            // 1. 检查用户是否有有效订阅
            var subscription = await subscriptionService.GetUserActiveSubscriptionAsync(userId);
            if (subscription?.Plan == null)
            {
                return RateLimitResult.Denied("用户没有有效的套餐订阅，请先购买套餐");
            }

            // 2. 检查套餐是否过期
            if (subscription.IsExpired())
            {
                return RateLimitResult.Denied("套餐已过期，请续费或购买新套餐");
            }

            // 3. 检查模型权限
            if (!subscription.Plan.IsModelAllowed(modelName))
            {
                return RateLimitResult.Denied($"当前套餐不支持使用模型 {modelName}，请升级套餐");
            }

            // 4. 检查额度是否充足
            var quotaCheck = await subscriptionService.CheckQuotaSufficientAsync(userId, estimatedQuota);
            if (!quotaCheck.HasSufficient)
            {
                return RateLimitResult.Denied(quotaCheck.Reason ?? "额度不足");
            }

            // 5. 返回成功结果，包含当前套餐信息
            return RateLimitResult.Allowed(subscription);
        }
        catch (Exception ex)
        {
            // 记录错误日志
            var logger = GetService<ILogger<SubscriptionRateLimitService>>();
            logger.LogError(ex, "检查用户请求权限时发生错误，用户ID: {UserId}, 模型: {ModelName}", userId, modelName);

            return RateLimitResult.Denied("系统错误，请稍后重试");
        }
    }

    /// <summary>
    /// 记录请求成功后的额度消耗
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="modelName"></param>
    /// <param name="actualQuota"></param>
    /// <param name="requestTokens"></param>
    /// <param name="responseTokens"></param>
    /// <param name="requestIp"></param>
    /// <param name="userAgent"></param>
    /// <param name="requestId"></param>
    /// <returns></returns>
    public async Task<bool> RecordSuccessfulRequestAsync(
        string userId,
        string modelName,
        long actualQuota,
        int requestTokens,
        int responseTokens,
        string? requestIp = null,
        string? userAgent = null,
        string? requestId = null)
    {
        try
        {
            return await subscriptionService.ConsumeQuotaAsync(
                userId, modelName, actualQuota,
                requestTokens, responseTokens,
                requestIp, userAgent, requestId);
        }
        catch (Exception ex)
        {
            var logger = GetService<ILogger<SubscriptionRateLimitService>>();
            logger.LogError(ex, "记录用户请求消耗时发生错误，用户ID: {UserId}", userId);
            return false;
        }
    }

    /// <summary>
    /// 记录失败的请求（不消耗额度，但记录日志）
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="modelName"></param>
    /// <param name="errorMessage"></param>
    /// <param name="requestIp"></param>
    /// <param name="userAgent"></param>
    /// <param name="requestId"></param>
    /// <returns></returns>
    public async Task RecordFailedRequestAsync(
        string userId,
        string modelName,
        string errorMessage,
        string? requestIp = null,
        string? userAgent = null,
        string? requestId = null)
    {
        try
        {
            var subscription = await subscriptionService.GetUserActiveSubscriptionAsync(userId);
            if (subscription != null)
            {
                var usage = SubscriptionQuotaUsage.Create(
                    userId, subscription.Id, modelName, 0, 0, 0,
                    requestIp, userAgent, requestId);

                usage.MarkFailed(errorMessage);

                DbContext.SubscriptionQuotaUsages.Add(usage);
                await DbContext.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            var logger = GetService<ILogger<SubscriptionRateLimitService>>();
            logger.LogError(ex, "记录失败请求时发生错误，用户ID: {UserId}", userId);
        }
    }

    /// <summary>
    /// 获取用户套餐状态摘要
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<UserSubscriptionSummary?> GetUserSubscriptionSummaryAsync(string userId)
    {
        var subscription = await subscriptionService.GetUserActiveSubscriptionAsync(userId);
        if (subscription?.Plan == null)
            return null;

        return new UserSubscriptionSummary
        {
            PlanName = subscription.Plan.Name,
            PlanLevel = subscription.Plan.Level,
            Status = subscription.Status,
            StartDate = subscription.StartDate,
            EndDate = subscription.EndDate,
            DailyQuotaLimit = subscription.Plan.DailyQuotaLimit,
            DailyQuotaUsed = subscription.DailyUsedQuota,
            DailyQuotaRemaining = subscription.Plan.DailyQuotaLimit - subscription.DailyUsedQuota,
            WeeklyQuotaLimit = subscription.Plan.WeeklyQuotaLimit,
            WeeklyQuotaUsed = subscription.WeeklyUsedQuota,
            WeeklyQuotaRemaining = subscription.Plan.WeeklyQuotaLimit - subscription.WeeklyUsedQuota,
            AllowedModels = subscription.Plan.AllowedModels,
            DaysRemaining = (int)(subscription.EndDate - DateTime.Now).TotalDays
        };
    }
}

/// <summary>
/// 限流检查结果
/// </summary>
public class RateLimitResult
{
    public bool IsAllowed { get; private set; }
    public string? DeniedReason { get; private set; }
    public UserSubscription? Subscription { get; private set; }

    private RateLimitResult() { }

    public static RateLimitResult Allowed(UserSubscription subscription)
    {
        return new RateLimitResult
        {
            IsAllowed = true,
            Subscription = subscription
        };
    }

    public static RateLimitResult Denied(string reason)
    {
        return new RateLimitResult
        {
            IsAllowed = false,
            DeniedReason = reason
        };
    }

    /// <summary>
    /// 如果被拒绝，抛出异常
    /// </summary>
    public void ThrowIfDenied()
    {
        if (!IsAllowed)
        {
            throw new PaymentRequiredException(DeniedReason ?? "请求被拒绝");
        }
    }
}

/// <summary>
/// 用户订阅摘要
/// </summary>
public class UserSubscriptionSummary
{
    public string PlanName { get; set; } = null!;
    public int PlanLevel { get; set; }
    public SubscriptionStatus Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public long DailyQuotaLimit { get; set; }
    public long DailyQuotaUsed { get; set; }
    public long DailyQuotaRemaining { get; set; }
    public long WeeklyQuotaLimit { get; set; }
    public long WeeklyQuotaUsed { get; set; }
    public long WeeklyQuotaRemaining { get; set; }
    public string[] AllowedModels { get; set; } = Array.Empty<string>();
    public int DaysRemaining { get; set; }
}