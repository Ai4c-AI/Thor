using Thor.Service.Domain;

namespace Thor.Service.Eto;

/// <summary>
/// 套餐额度使用事件
/// </summary>
public class SubscriptionQuotaUsageEto
{
    /// <summary>
    /// 用户ID
    /// </summary>
    public string UserId { get; set; } = null!;

    /// <summary>
    /// 订阅ID
    /// </summary>
    public string SubscriptionId { get; set; } = null!;

    /// <summary>
    /// 模型名称
    /// </summary>
    public string ModelName { get; set; } = null!;

    /// <summary>
    /// 使用的额度
    /// </summary>
    public long QuotaUsed { get; set; }

    /// <summary>
    /// 请求Token数
    /// </summary>
    public int RequestTokens { get; set; }

    /// <summary>
    /// 响应Token数
    /// </summary>
    public int ResponseTokens { get; set; }

    /// <summary>
    /// 请求IP
    /// </summary>
    public string? RequestIp { get; set; }

    /// <summary>
    /// 用户代理
    /// </summary>
    public string? UserAgent { get; set; }

    /// <summary>
    /// 请求ID
    /// </summary>
    public string? RequestId { get; set; }

    /// <summary>
    /// 使用时间
    /// </summary>
    public DateTime UsedAt { get; set; } = DateTime.UtcNow;
}