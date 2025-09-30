using Thor.Domain.System;
using Thor.Service.Domain.Core;

namespace Thor.Service.Domain;

/// <summary>
/// 套餐升级记录
/// </summary>
public class SubscriptionUpgrade : Entity<string>
{
    /// <summary>
    /// 用户ID
    /// </summary>
    public string UserId { get; set; } = null!;

    /// <summary>
    /// 原套餐订阅ID
    /// </summary>
    public string FromSubscriptionId { get; set; } = null!;

    /// <summary>
    /// 原套餐ID
    /// </summary>
    public string FromPlanId { get; set; } = null!;

    /// <summary>
    /// 目标套餐ID
    /// </summary>
    public string ToPlanId { get; set; } = null!;

    /// <summary>
    /// 原套餐剩余天数
    /// </summary>
    public int RemainingDays { get; set; }

    /// <summary>
    /// 原套餐剩余价值（折算金额）
    /// </summary>
    public decimal RemainingValue { get; set; }

    /// <summary>
    /// 目标套餐原价
    /// </summary>
    public decimal TargetPrice { get; set; }

    /// <summary>
    /// 实际需要支付的金额（目标价格 - 剩余价值）
    /// </summary>
    public decimal ActualPayAmount { get; set; }

    /// <summary>
    /// 升级时间
    /// </summary>
    public DateTime UpgradeTime { get; set; }

    /// <summary>
    /// 升级状态
    /// </summary>
    public UpgradeStatus Status { get; set; }

    /// <summary>
    /// 新订阅的开始时间
    /// </summary>
    public DateTime NewStartDate { get; set; }

    /// <summary>
    /// 新订阅的结束时间
    /// </summary>
    public DateTime NewEndDate { get; set; }

    /// <summary>
    /// 升级后的新订阅ID
    /// </summary>
    public string? NewSubscriptionId { get; set; }

    /// <summary>
    /// 支付记录ID
    /// </summary>
    public string? PaymentRecordId { get; set; }

    /// <summary>
    /// 备注信息
    /// </summary>
    public string? Remarks { get; set; }

    /// <summary>
    /// 原套餐导航属性
    /// </summary>
    public SubscriptionPlan? FromPlan { get; set; }

    /// <summary>
    /// 目标套餐导航属性
    /// </summary>
    public SubscriptionPlan? ToPlan { get; set; }

    /// <summary>
    /// 用户导航属性
    /// </summary>
    public User? User { get; set; }

    /// <summary>
    /// 原订阅导航属性
    /// </summary>
    public UserSubscription? FromSubscription { get; set; }

    /// <summary>
    /// 新订阅导航属性
    /// </summary>
    public UserSubscription? NewSubscription { get; set; }

    /// <summary>
    /// 支付记录导航属性
    /// </summary>
    public SubscriptionPurchaseRecord? PaymentRecord { get; set; }

    /// <summary>
    /// 创建升级记录
    /// </summary>
    /// <param name="userId">用户ID</param>
    /// <param name="fromSubscription">原订阅</param>
    /// <param name="targetPlan">目标套餐</param>
    /// <param name="remainingValue">剩余价值</param>
    /// <param name="actualPayAmount">实际支付金额</param>
    /// <returns></returns>
    public static SubscriptionUpgrade Create(
        string userId,
        UserSubscription fromSubscription,
        SubscriptionPlan targetPlan,
        decimal remainingValue,
        decimal actualPayAmount)
    {
        var remainingDays = (int)(fromSubscription.EndDate - DateTime.UtcNow).TotalDays;

        return new SubscriptionUpgrade
        {
            Id = Guid.NewGuid().ToString("N"),
            UserId = userId,
            FromSubscriptionId = fromSubscription.Id,
            FromPlanId = fromSubscription.PlanId,
            ToPlanId = targetPlan.Id,
            RemainingDays = Math.Max(0, remainingDays),
            RemainingValue = remainingValue,
            TargetPrice = targetPlan.Price,
            ActualPayAmount = actualPayAmount,
            UpgradeTime = DateTime.UtcNow,
            Status = UpgradeStatus.Pending,
            NewStartDate = DateTime.UtcNow,
            NewEndDate = DateTime.UtcNow.AddDays(targetPlan.GetValidityDays()),
            CreatedAt = DateTime.UtcNow
        };
    }

    /// <summary>
    /// 标记升级完成
    /// </summary>
    /// <param name="newSubscriptionId">新订阅ID</param>
    /// <param name="paymentRecordId">支付记录ID</param>
    public void MarkCompleted(string newSubscriptionId, string? paymentRecordId = null)
    {
        Status = UpgradeStatus.Completed;
        NewSubscriptionId = newSubscriptionId;
        PaymentRecordId = paymentRecordId;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// 标记升级失败
    /// </summary>
    /// <param name="reason">失败原因</param>
    public void MarkFailed(string reason)
    {
        Status = UpgradeStatus.Failed;
        Remarks = reason;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// 标记升级取消
    /// </summary>
    /// <param name="reason">取消原因</param>
    public void MarkCancelled(string reason)
    {
        Status = UpgradeStatus.Cancelled;
        Remarks = reason;
        UpdatedAt = DateTime.UtcNow;
    }
}