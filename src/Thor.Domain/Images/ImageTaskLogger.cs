using Thor.Abstractions;
using Thor.Service.Domain.Core;
using Thor.Domain.Shared;

namespace Thor.Domain.Images;

/// <summary>
/// 图片生成任务日志
/// </summary>
public sealed class ImageTaskLogger : Entity<string>
{
    /// <summary>
    /// 任务ID - 来自外部API响应
    /// </summary>
    public string TaskId { get; set; } = string.Empty;

    /// <summary>
    /// 任务类型
    /// </summary>
    public ThorImageTaskType TaskType { get; set; } = ThorImageTaskType.Imagine;

    /// <summary>
    /// 任务状态
    /// </summary>
    public ThorImageTaskStatus TaskStatus { get; set; } = ThorImageTaskStatus.Submitted;

    /// <summary>
    /// 提示词内容
    /// </summary>
    public string Prompt { get; set; } = string.Empty;

    /// <summary>
    /// 生成的图片URLs (JSON数组)
    /// </summary>
    public string? ImageUrls { get; set; }

    /// <summary>
    /// 消费额度
    /// </summary>
    public long Quota { get; set; }

    /// <summary>
    /// 模型名称
    /// </summary>
    public string ModelName { get; set; } = string.Empty;

    /// <summary>
    /// Token名称
    /// </summary>
    public string? TokenName { get; set; }

    /// <summary>
    /// 用户名
    /// </summary>
    public string? UserName { get; set; }

    /// <summary>
    /// 用户ID
    /// </summary>
    public string? UserId { get; set; }

    /// <summary>
    /// 渠道ID
    /// </summary>
    public string? ChannelId { get; set; }

    /// <summary>
    /// 渠道名称
    /// </summary>
    public string? ChannelName { get; set; }

    /// <summary>
    /// 请求耗时 (毫秒)
    /// </summary>
    public int TotalTime { get; set; }

    /// <summary>
    /// 客户端IP
    /// </summary>
    public string? IP { get; set; }

    /// <summary>
    /// 用户代理
    /// </summary>
    public string? UserAgent { get; set; }

    /// <summary>
    /// 组织ID
    /// </summary>
    public string? OrganizationId { get; set; }

    /// <summary>
    /// 请求URL
    /// </summary>
    public string? Url { get; set; }

    /// <summary>
    /// 是否请求成功
    /// </summary>
    public bool IsSuccess { get; set; } = true;

    /// <summary>
    /// 错误信息
    /// </summary>
    public string? ErrorMessage { get; set; }

    /// <summary>
    /// 任务参数 (JSON格式存储具体参数)
    /// </summary>
    public string? TaskParameters { get; set; }

    /// <summary>
    /// 任务进度百分比 (0-100)
    /// </summary>
    public int Progress { get; set; } = 0;

    /// <summary>
    /// 外部任务的创建时间
    /// </summary>
    public DateTime? TaskCreatedAt { get; set; }

    /// <summary>
    /// 任务完成时间
    /// </summary>
    public DateTime? TaskCompletedAt { get; set; }

    /// <summary>
    /// 元数据
    /// </summary>
    public Dictionary<string, string>? Metadata { get; set; } = new();
}