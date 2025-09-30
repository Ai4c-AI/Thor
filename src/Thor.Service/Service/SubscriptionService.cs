using Microsoft.EntityFrameworkCore;
using Thor.BuildingBlocks.Event;
using Thor.Domain.System;
using Thor.Infrastructure;
using Thor.Service.Domain.Core;
using Thor.Service.Eto;

namespace Thor.Service.Service;

/// <summary>
/// 套餐订阅服务
/// </summary>
public class SubscriptionService(
    ILogger<SubscriptionService> logger,
    IServiceProvider serviceProvider,
    UserService userService,
    IEventBus<SubscriptionQuotaUsageEto> eventBus)
    : ApplicationService(serviceProvider)
{
    /// <summary>
    /// 获取所有可用套餐
    /// </summary>
    /// <returns></returns>
    public async Task<List<SubscriptionPlan>> GetAvailablePlansAsync()
    {
        return await DbContext.SubscriptionPlans
            .Where(x => x.IsActive)
            .OrderBy(x => x.Sort)
            .ThenBy(x => x.Level)
            .ToListAsync();
    }

    /// <summary>
    /// 根据ID获取套餐
    /// </summary>
    /// <param name="planId"></param>
    /// <returns></returns>
    public async Task<SubscriptionPlan?> GetPlanByIdAsync(string planId)
    {
        return await DbContext.SubscriptionPlans
            .FirstOrDefaultAsync(x => x.Id == planId && x.IsActive);
    }

    /// <summary>
    /// 获取用户当前有效订阅
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<UserSubscription?> GetUserActiveSubscriptionAsync(string userId)
    {
        return await DbContext.UserSubscriptions
            .AsNoTracking()
            .Include(x => x.Plan)
            .FirstOrDefaultAsync(x => x.UserId == userId
                                      && x.Status == SubscriptionStatus.Active
                                      && x.EndDate > DateTime.UtcNow);
    }

    /// <summary>
    /// 获取用户当前订阅详情（包含使用额度）
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<UserSubscriptionDetailedDto?> GetUserSubscriptionDetailedAsync(string userId)
    {
        var subscription = await GetUserActiveSubscriptionAsync(userId);
        if (subscription?.Plan == null)
            return null;

        // 检查并重置额度（如果需要）
        await CheckAndResetQuotasAsync(subscription);

        return new UserSubscriptionDetailedDto
        {
            Id = subscription.Id,
            UserId = subscription.UserId,
            PlanId = subscription.PlanId,
            StartDate = subscription.StartDate,
            EndDate = subscription.EndDate,
            Status = subscription.Status,
            DailyUsedQuota = subscription.DailyUsedQuota,
            WeeklyUsedQuota = subscription.WeeklyUsedQuota,
            LastDailyResetDate = subscription.LastDailyResetDate,
            LastWeeklyResetDate = subscription.LastWeeklyResetDate,
            AutoRenew = subscription.AutoRenew,
            PurchaseRecordId = subscription.PurchaseRecordId,
            Plan = subscription.Plan,
            CreatedAt = subscription.CreatedAt,
            UpdatedAt = subscription.UpdatedAt
        };
    }

    /// <summary>
    /// 检查并重置额度（如果需要）
    /// </summary>
    /// <param name="subscription"></param>
    /// <returns></returns>
    private async Task CheckAndResetQuotasAsync(UserSubscription subscription)
    {
        var now = DateTime.UtcNow;
        var needsUpdate = false;

        // 检查是否需要重置日额度
        if (subscription.LastDailyResetDate.Date < now.Date)
        {
            subscription.ResetDailyQuota();
            needsUpdate = true;
        }

        // 检查是否需要重置周额度
        var currentWeekStart = GetWeekStart(now);
        if (subscription.LastWeeklyResetDate.Date < currentWeekStart)
        {
            subscription.ResetWeeklyQuota();
            needsUpdate = true;
        }

        if (needsUpdate)
        {
            DbContext.UserSubscriptions.Update(subscription);
            await DbContext.SaveChangesAsync();
        }
    }

    /// <summary>
    /// 获取用户所有订阅历史
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<List<UserSubscription>> GetUserSubscriptionHistoryAsync(string userId)
    {
        return await DbContext.UserSubscriptions
            .Include(x => x.Plan)
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    /// <summary>
    /// 检查用户是否有权限使用指定模型
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="modelName"></param>
    /// <returns></returns>
    public async Task<bool> CheckModelPermissionAsync(string userId, string modelName)
    {
        var subscription = await GetUserActiveSubscriptionAsync(userId);
        if (subscription?.Plan == null)
            return false;

        return subscription.Plan.IsModelAllowed(modelName);
    }

    /// <summary>
    /// 检查用户额度是否充足
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="requiredQuota">需要的额度（积分）</param>
    /// <returns></returns>
    public async Task<(bool HasSufficient, string? Reason)> CheckQuotaSufficientAsync(string userId, long requiredQuota)
    {
        var subscription = await GetUserActiveSubscriptionAsync(userId);
        if (subscription?.Plan == null)
            return (false, "用户没有有效的套餐订阅");

        // 检查套餐是否过期
        if (subscription.IsExpired())
            return (false, "套餐已过期");

        // 检查每日额度
        if (!subscription.HasSufficientDailyQuota(requiredQuota, subscription.Plan))
        {
            var remainingDaily = subscription.Plan.DailyQuotaLimit - subscription.DailyUsedQuota;
            return (false, $"每日额度不足，剩余 ${remainingDaily / 100.0:F2}");
        }

        // 检查每周额度
        if (!subscription.HasSufficientWeeklyQuota(requiredQuota, subscription.Plan))
        {
            var remainingWeekly = subscription.Plan.WeeklyQuotaLimit - subscription.WeeklyUsedQuota;
            return (false, $"每周额度不足，剩余 ${remainingWeekly / 100.0:F2}");
        }

        return (true, null);
    }

    /// <summary>
    /// 消费用户额度
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="modelName"></param>
    /// <param name="quotaUsed"></param>
    /// <param name="requestTokens"></param>
    /// <param name="responseTokens"></param>
    /// <param name="requestIp"></param>
    /// <param name="userAgent"></param>
    /// <param name="requestId"></param>
    /// <returns></returns>
    public async Task<bool> ConsumeQuotaAsync(
        string userId,
        string modelName,
        long quotaUsed,
        int requestTokens,
        int responseTokens,
        string? requestIp = null,
        string? userAgent = null,
        string? requestId = null)
    {
        // 更新订阅的使用量
        await DbContext.UserSubscriptions.Where(x => x.UserId == userId
                                                     && x.Status == SubscriptionStatus.Active
                                                     && x.EndDate > DateTime.UtcNow)
            .ExecuteUpdateAsync(x => x
                .SetProperty(s => s.DailyUsedQuota, s => s.DailyUsedQuota + quotaUsed)
                .SetProperty(s => s.UserId, userId)
                .SetProperty(s => s.WeeklyUsedQuota, s => s.WeeklyUsedQuota + quotaUsed));

        var subscription = await DbContext.UserSubscriptions
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == userId
                                      && x.Status == SubscriptionStatus.Active
                                      && x.EndDate > DateTime.UtcNow);

        if (subscription == null)
        {
            logger.LogWarning("User {UserId} has no active subscription when consuming quota.", userId);
            return false;
        }

        // 发送使用明细事件
        await eventBus.PublishAsync(new SubscriptionQuotaUsageEto
        {
            UserId = userId,
            SubscriptionId = subscription.Id,
            ModelName = modelName,
            QuotaUsed = quotaUsed,
            RequestTokens = requestTokens,
            ResponseTokens = responseTokens,
            RequestIp = requestIp,
            UserAgent = userAgent,
            RequestId = requestId
        });
        return true;
    }

    /// <summary>
    /// 创建套餐购买记录
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="planId"></param>
    /// <param name="paymentMethod"></param>
    /// <returns></returns>
    public async Task<SubscriptionPurchaseRecord?> CreatePurchaseRecordAsync(string userId, string planId,
        string paymentMethod = "alipay")
    {
        var plan = await GetPlanByIdAsync(planId);
        if (plan == null)
            return null;

        var record = SubscriptionPurchaseRecord.Create(userId, planId, plan.Price, paymentMethod);

        await DbContext.SubscriptionPurchaseRecords.AddAsync(record);
        await DbContext.SaveChangesAsync();

        return record;
    }

    /// <summary>
    /// 激活套餐（支付成功后调用）
    /// </summary>
    /// <param name="purchaseRecordId"></param>
    /// <param name="transactionId"></param>
    /// <returns></returns>
    public async Task<bool> ActivateSubscriptionAsync(string purchaseRecordId, string transactionId)
    {
        var record = await DbContext.SubscriptionPurchaseRecords
            .Include(x => x.Plan)
            .FirstOrDefaultAsync(x => x.Id == purchaseRecordId);

        if (record?.Plan == null || record.PaymentStatus == PaymentStatus.Paid)
            return false;

        var now = DateTime.UtcNow;
        var validFrom = now;
        var validTo = now.AddDays(record.Plan.GetValidityDays());

        // 更新购买记录
        record.MarkPaid(transactionId, validFrom, validTo);

        // 检查用户是否已有活跃订阅
        var existingSubscription = await GetUserActiveSubscriptionAsync(record.UserId);
        if (existingSubscription != null)
        {
            // 如果有现有订阅，取消现有订阅
            existingSubscription.Cancel();
            DbContext.UserSubscriptions.Update(existingSubscription);
        }

        // 创建新的用户订阅
        var subscription = new UserSubscription
        {
            Id = Guid.NewGuid().ToString("N"),
            UserId = record.UserId,
            PlanId = record.PlanId,
            StartDate = validFrom,
            EndDate = validTo,
            Status = SubscriptionStatus.Active,
            PurchaseRecordId = record.Id,
            LastDailyResetDate = validFrom.Date,
            LastWeeklyResetDate = GetWeekStart(validFrom),
            CreatedAt = now
        };

        await DbContext.UserSubscriptions.AddAsync(subscription);
        DbContext.SubscriptionPurchaseRecords.Update(record);

        await DbContext.SaveChangesAsync();

        // 记录操作日志
        var loggerService = GetService<LoggerService>();
        var user = await userService.GetAsync(record.UserId);
        await loggerService.CreateRechargeAsync(
            $"用户 {user?.UserName} 成功购买套餐：{record.Plan.Name}，有效期：{validFrom:yyyy-MM-dd} 至 {validTo:yyyy-MM-dd}",
            0, record.UserId);

        return true;
    }

    /// <summary>
    /// 获取用户购买记录
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<List<SubscriptionPurchaseRecord>> GetUserPurchaseRecordsAsync(string userId)
    {
        return await DbContext.SubscriptionPurchaseRecords
            .Include(x => x.Plan)
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    /// <summary>
    /// 获取用户额度使用统计
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="days">统计天数</param>
    /// <returns></returns>
    public async Task<List<SubscriptionQuotaUsage>> GetUserQuotaUsageAsync(string userId, int days = 7)
    {
        var startDate = DateTime.UtcNow.AddDays(-days);

        return await DbContext.SubscriptionQuotaUsages
            .Where(x => x.UserId == userId && x.UsageTime >= startDate)
            .OrderByDescending(x => x.UsageTime)
            .ToListAsync();
    }

    /// <summary>
    /// 标记过期的订阅
    /// </summary>
    /// <returns></returns>
    public async Task<int> MarkExpiredSubscriptionsAsync()
    {
        var expiredCount = await DbContext.UserSubscriptions
            .Where(x => x.Status == SubscriptionStatus.Active && x.EndDate <= DateTime.UtcNow)
            .ExecuteUpdateAsync(x => x.SetProperty(s => s.Status, SubscriptionStatus.Expired));

        return expiredCount;
    }

    /// <summary>
    /// 重置所有用户的每日额度
    /// </summary>
    /// <returns></returns>
    public async Task<int> ResetAllDailyQuotasAsync()
    {
        var today = DateTime.UtcNow.Date;
        var affectedCount = await DbContext.UserSubscriptions
            .Where(x => x.Status == SubscriptionStatus.Active
                        && x.LastDailyResetDate.Date < today)
            .ExecuteUpdateAsync(x => x
                .SetProperty(s => s.DailyUsedQuota, 0)
                .SetProperty(s => s.LastDailyResetDate, today));

        return affectedCount;
    }

    /// <summary>
    /// 重置所有用户的每周额度
    /// </summary>
    /// <returns></returns>
    public async Task<int> ResetAllWeeklyQuotasAsync()
    {
        var currentWeekStart = GetWeekStart(DateTime.UtcNow);
        var affectedCount = await DbContext.UserSubscriptions
            .Where(x => x.Status == SubscriptionStatus.Active
                        && x.LastWeeklyResetDate.Date < currentWeekStart)
            .ExecuteUpdateAsync(x => x
                .SetProperty(s => s.WeeklyUsedQuota, 0)
                .SetProperty(s => s.LastWeeklyResetDate, currentWeekStart));

        return affectedCount;
    }

    /// <summary>
    /// 管理员赠送套餐给用户
    /// </summary>
    /// <param name="adminUserId">管理员用户ID</param>
    /// <param name="targetUserId">目标用户ID</param>
    /// <param name="planId">套餐ID</param>
    /// <returns></returns>
    public async Task<bool> GiftSubscriptionAsync(string adminUserId, string targetUserId, string planId)
    {
        var plan = await GetPlanByIdAsync(planId);
        if (plan == null)
            return false;

        var now = DateTime.UtcNow;
        var validFrom = now;
        var validTo = now.AddDays(plan.GetValidityDays());

        // 创建赠送购买记录
        var record = SubscriptionPurchaseRecord.Create(targetUserId, planId, 0, "gift"); // 价格为0表示赠送
        record.MarkPaid($"GIFT_{Guid.NewGuid():N}", validFrom, validTo);

        await DbContext.SubscriptionPurchaseRecords.AddAsync(record);

        // 检查用户是否已有活跃订阅
        var existingSubscription = await GetUserActiveSubscriptionAsync(targetUserId);
        if (existingSubscription != null)
        {
            // 如果有现有订阅，取消现有订阅
            existingSubscription.Cancel();
            DbContext.UserSubscriptions.Update(existingSubscription);
        }

        // 创建新的用户订阅
        var subscription = new UserSubscription
        {
            Id = Guid.NewGuid().ToString("N"),
            UserId = targetUserId,
            PlanId = planId,
            StartDate = validFrom,
            EndDate = validTo,
            Status = SubscriptionStatus.Active,
            PurchaseRecordId = record.Id,
            LastDailyResetDate = validFrom.Date,
            LastWeeklyResetDate = GetWeekStart(validFrom),
            CreatedAt = now
        };

        await DbContext.UserSubscriptions.AddAsync(subscription);
        await DbContext.SaveChangesAsync();

        // 记录操作日志
        var loggerService = GetService<LoggerService>();
        var adminUser = await userService.GetAsync(adminUserId);
        var targetUser = await userService.GetAsync(targetUserId);
        await loggerService.CreateRechargeAsync(
            $"管理员 {adminUser?.UserName} 赠送套餐给用户 {targetUser?.UserName}：{plan.Name}，有效期：{validFrom:yyyy-MM-dd} 至 {validTo:yyyy-MM-dd}",
            0, targetUserId);

        return true;
    }

    /// <summary>
    /// 获取周开始时间（周一）
    /// </summary>
    /// <param name="date"></param>
    /// <returns></returns>
    private static DateTime GetWeekStart(DateTime date)
    {
        var days = (int)date.DayOfWeek == 0 ? 6 : (int)date.DayOfWeek - 1; // 周一为0
        return date.Date.AddDays(-days);
    }
}

/// <summary>
/// 用户订阅详情DTO
/// </summary>
public class UserSubscriptionDetailedDto
{
    public string Id { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public string PlanId { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public SubscriptionStatus Status { get; set; }
    public long DailyUsedQuota { get; set; }
    public long WeeklyUsedQuota { get; set; }
    public DateTime LastDailyResetDate { get; set; }
    public DateTime LastWeeklyResetDate { get; set; }
    public bool AutoRenew { get; set; }
    public string? PurchaseRecordId { get; set; }
    public SubscriptionPlan Plan { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}