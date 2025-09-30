using Thor.Domain.System;
using Thor.Service.Domain.Core;

namespace Thor.Service.Domain;

/// <summary>
/// 套餐额度使用记录（用于详细追踪和统计）
/// </summary>
public class SubscriptionQuotaUsage : Entity<string>
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
    /// 使用的模型名称
    /// </summary>
    public string ModelName { get; set; } = null!;

    /// <summary>
    /// 使用的额度（美分）
    /// </summary>
    public long QuotaUsed { get; set; }

    /// <summary>
    /// 请求tokens数量
    /// </summary>
    public int RequestTokens { get; set; }

    /// <summary>
    /// 响应tokens数量
    /// </summary>
    public int ResponseTokens { get; set; }

    /// <summary>
    /// 总tokens数量
    /// </summary>
    public int TotalTokens { get; set; }

    /// <summary>
    /// 使用时间
    /// </summary>
    public DateTime UsageTime { get; set; }

    /// <summary>
    /// 请求IP
    /// </summary>
    public string? RequestIp { get; set; }

    /// <summary>
    /// 用户代理
    /// </summary>
    public string? UserAgent { get; set; }

    /// <summary>
    /// 请求ID（用于关联聊天记录）
    /// </summary>
    public string? RequestId { get; set; }

    /// <summary>
    /// 请求状态（成功/失败）
    /// </summary>
    public bool IsSuccess { get; set; } = true;

    /// <summary>
    /// 错误信息
    /// </summary>
    public string? ErrorMessage { get; set; }

    /// <summary>
    /// 用户订阅导航属性
    /// </summary>
    public UserSubscription? Subscription { get; set; }

    /// <summary>
    /// 用户导航属性
    /// </summary>
    public User? User { get; set; }

    /// <summary>
    /// 创建使用记录
    /// </summary>
    /// <param name="userId">用户ID</param>
    /// <param name="subscriptionId">订阅ID</param>
    /// <param name="modelName">模型名称</param>
    /// <param name="quotaUsed">使用额度</param>
    /// <param name="requestTokens">请求tokens</param>
    /// <param name="responseTokens">响应tokens</param>
    /// <param name="requestIp">请求IP</param>
    /// <param name="userAgent">用户代理</param>
    /// <param name="requestId">请求ID</param>
    /// <returns></returns>
    public static SubscriptionQuotaUsage Create(
        string userId,
        string subscriptionId,
        string modelName,
        long quotaUsed,
        int requestTokens,
        int responseTokens,
        string? requestIp = null,
        string? userAgent = null,
        string? requestId = null)
    {
        return new SubscriptionQuotaUsage
        {
            Id = Guid.NewGuid().ToString("N"),
            UserId = userId,
            SubscriptionId = subscriptionId,
            ModelName = modelName,
            QuotaUsed = quotaUsed,
            RequestTokens = requestTokens,
            ResponseTokens = responseTokens,
            TotalTokens = requestTokens + responseTokens,
            UsageTime = DateTime.UtcNow,
            RequestIp = requestIp,
            UserAgent = userAgent,
            RequestId = requestId,
            CreatedAt = DateTime.UtcNow
        };
    }

    /// <summary>
    /// 标记为失败
    /// </summary>
    /// <param name="errorMessage">错误信息</param>
    public void MarkFailed(string errorMessage)
    {
        IsSuccess = false;
        ErrorMessage = errorMessage;
    }
}