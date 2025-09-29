using Thor.Service.Domain.Core;

namespace Thor.Service.Domain;

/// <summary>
/// 套餐购买记录
/// </summary>
public class SubscriptionPurchaseRecord : Entity<string>
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
    /// 支付金额
    /// </summary>
    public decimal Amount { get; set; }

    /// <summary>
    /// 购买时间
    /// </summary>
    public DateTime PurchaseTime { get; set; }

    /// <summary>
    /// 支付状态
    /// </summary>
    public PaymentStatus PaymentStatus { get; set; }

    /// <summary>
    /// 订单号（支付平台返回）
    /// </summary>
    public string? OrderId { get; set; }

    /// <summary>
    /// 支付平台交易号
    /// </summary>
    public string? TransactionId { get; set; }

    /// <summary>
    /// 套餐有效期开始时间
    /// </summary>
    public DateTime? ValidFrom { get; set; }

    /// <summary>
    /// 套餐有效期结束时间
    /// </summary>
    public DateTime? ValidTo { get; set; }

    /// <summary>
    /// 备注信息
    /// </summary>
    public string? Remarks { get; set; }

    /// <summary>
    /// 退款时间
    /// </summary>
    public DateTime? RefundTime { get; set; }

    /// <summary>
    /// 退款金额
    /// </summary>
    public decimal? RefundAmount { get; set; }

    /// <summary>
    /// 支付方式（alipay, wechat, paypal等）
    /// </summary>
    public string PaymentMethod { get; set; } = "alipay";

    /// <summary>
    /// 套餐导航属性
    /// </summary>
    public SubscriptionPlan? Plan { get; set; }

    /// <summary>
    /// 用户导航属性
    /// </summary>
    public User? User { get; set; }

    /// <summary>
    /// 创建购买记录
    /// </summary>
    /// <param name="userId">用户ID</param>
    /// <param name="planId">套餐ID</param>
    /// <param name="amount">金额</param>
    /// <param name="paymentMethod">支付方式</param>
    /// <returns></returns>
    public static SubscriptionPurchaseRecord Create(string userId, string planId, decimal amount, string paymentMethod = "alipay")
    {
        return new SubscriptionPurchaseRecord
        {
            Id = Guid.NewGuid().ToString("N"),
            UserId = userId,
            PlanId = planId,
            Amount = amount,
            PurchaseTime = DateTime.UtcNow,
            PaymentStatus = PaymentStatus.Pending,
            PaymentMethod = paymentMethod,
            CreatedAt = DateTime.UtcNow
        };
    }

    /// <summary>
    /// 标记支付成功
    /// </summary>
    /// <param name="transactionId">交易号</param>
    /// <param name="validFrom">有效期开始</param>
    /// <param name="validTo">有效期结束</param>
    public void MarkPaid(string transactionId, DateTime validFrom, DateTime validTo)
    {
        PaymentStatus = PaymentStatus.Paid;
        TransactionId = transactionId;
        ValidFrom = validFrom;
        ValidTo = validTo;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// 标记支付失败
    /// </summary>
    /// <param name="remarks">失败原因</param>
    public void MarkFailed(string? remarks = null)
    {
        PaymentStatus = PaymentStatus.Failed;
        Remarks = remarks;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// 标记取消
    /// </summary>
    /// <param name="remarks">取消原因</param>
    public void MarkCancelled(string? remarks = null)
    {
        PaymentStatus = PaymentStatus.Cancelled;
        Remarks = remarks;
        UpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// 执行退款
    /// </summary>
    /// <param name="refundAmount">退款金额</param>
    /// <param name="remarks">退款原因</param>
    public void Refund(decimal refundAmount, string? remarks = null)
    {
        PaymentStatus = PaymentStatus.Refunded;
        RefundAmount = refundAmount;
        RefundTime = DateTime.UtcNow;
        Remarks = remarks;
        UpdatedAt = DateTime.UtcNow;
    }
}