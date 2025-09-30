using Thor.Service.Domain;
using Thor.Service.Domain.Core;

namespace Thor.Domain.System;

/// <summary>
/// 用户套餐订阅
/// </summary>
public class UserSubscription : Entity<string>
{
    /// <summary>
    /// 用户ID
    /// </summary>
    public string UserId { get; set; } = null!;

    /// <summary>
    /// 套餐ID
    /// </summary>
    public string PlanId { get; set; } = null!;

    /// <summary>
    /// 套餐开始时间
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// 套餐结束时间
    /// </summary>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// 订阅状态
    /// </summary>
    public SubscriptionStatus Status { get; set; }

    /// <summary>
    /// 当日已使用额度（计费）
    /// </summary>
    public long DailyUsedQuota { get; set; }

    /// <summary>
    /// 当周已使用额度（计费）
    /// </summary>
    public long WeeklyUsedQuota { get; set; }

    /// <summary>
    /// 上次日额度重置时间
    /// </summary>
    public DateTime LastDailyResetDate { get; set; }

    /// <summary>
    /// 上次周额度重置时间
    /// </summary>
    public DateTime LastWeeklyResetDate { get; set; }

    /// <summary>
    /// 是否自动续费
    /// </summary>
    public bool AutoRenew { get; set; }

    /// <summary>
    /// 购买记录ID
    /// </summary>
    public string? PurchaseRecordId { get; set; }

    /// <summary>
    /// 套餐导航属性
    /// </summary>
    public SubscriptionPlan? Plan { get; set; }

    /// <summary>
    /// 用户导航属性
    /// </summary>
    public User? User { get; set; }

    /// <summary>
    /// 检查套餐是否过期
    /// </summary>
    /// <returns></returns>
    public bool IsExpired()
    {
        return DateTime.Now > EndDate;
    }

    /// <summary>
    /// 检查每日额度是否充足
    /// </summary>
    /// <param name="requiredQuota">需要的额度</param>
    /// <param name="plan">套餐计划</param>
    /// <returns></returns>
    public bool HasSufficientDailyQuota(long requiredQuota, SubscriptionPlan plan)
    {
        return (DailyUsedQuota + requiredQuota) <= plan.DailyQuotaLimit;
    }

    /// <summary>
    /// 检查每周额度是否充足
    /// </summary>
    /// <param name="requiredQuota">需要的额度</param>
    /// <param name="plan">套餐计划</param>
    /// <returns></returns>
    public bool HasSufficientWeeklyQuota(long requiredQuota, SubscriptionPlan plan)
    {
        return (WeeklyUsedQuota + requiredQuota) <= plan.WeeklyQuotaLimit;
    }

    /// <summary>
    /// 消费额度
    /// </summary>
    /// <param name="quota">消费的额度</param>
    public void ConsumeQuota(long quota)
    {
        DailyUsedQuota += quota;
        WeeklyUsedQuota += quota;
    }

    /// <summary>
    /// 重置每日额度
    /// </summary>
    public void ResetDailyQuota()
    {
        DailyUsedQuota = 0;
        LastDailyResetDate = DateTime.Now.Date;
    }

    /// <summary>
    /// 重置每周额度
    /// </summary>
    public void ResetWeeklyQuota()
    {
        WeeklyUsedQuota = 0;
        LastWeeklyResetDate = GetWeekStart(DateTime.Now);
    }

    /// <summary>
    /// 激活套餐
    /// </summary>
    public void Activate()
    {
        Status = SubscriptionStatus.Active;
        StartDate = DateTime.Now;
    }

    /// <summary>
    /// 过期套餐
    /// </summary>
    public void Expire()
    {
        Status = SubscriptionStatus.Expired;
    }

    /// <summary>
    /// 取消套餐
    /// </summary>
    public void Cancel()
    {
        Status = SubscriptionStatus.Cancelled;
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