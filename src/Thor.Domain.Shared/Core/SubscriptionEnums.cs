namespace Thor.Service.Domain.Core;

/// <summary>
/// 套餐类型
/// </summary>
public enum SubscriptionType
{
    /// <summary>
    /// 包月
    /// </summary>
    Monthly = 1,

    /// <summary>
    /// 包年
    /// </summary>
    Yearly = 2,

    /// <summary>
    /// 包周
    /// </summary>
    Weekly = 3
}

/// <summary>
/// 订阅状态
/// </summary>
public enum SubscriptionStatus
{
    /// <summary>
    /// 待激活
    /// </summary>
    Pending = 0,

    /// <summary>
    /// 激活中
    /// </summary>
    Active = 1,

    /// <summary>
    /// 已过期
    /// </summary>
    Expired = 2,

    /// <summary>
    /// 已取消
    /// </summary>
    Cancelled = 3,

    /// <summary>
    /// 已暂停
    /// </summary>
    Suspended = 4
}

/// <summary>
/// 支付状态
/// </summary>
public enum PaymentStatus
{
    /// <summary>
    /// 待支付
    /// </summary>
    Pending = 0,

    /// <summary>
    /// 已支付
    /// </summary>
    Paid = 1,

    /// <summary>
    /// 支付失败
    /// </summary>
    Failed = 2,

    /// <summary>
    /// 已取消
    /// </summary>
    Cancelled = 3,

    /// <summary>
    /// 已退款
    /// </summary>
    Refunded = 4
}

/// <summary>
/// 升级状态
/// </summary>
public enum UpgradeStatus
{
    /// <summary>
    /// 待处理
    /// </summary>
    Pending = 0,

    /// <summary>
    /// 已完成
    /// </summary>
    Completed = 1,

    /// <summary>
    /// 失败
    /// </summary>
    Failed = 2,

    /// <summary>
    /// 已取消
    /// </summary>
    Cancelled = 3
}