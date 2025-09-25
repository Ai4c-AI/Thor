namespace Thor.Domain.Shared;

/// <summary>
/// 图片任务类型枚举
/// </summary>
public enum ThorImageTaskType
{
    /// <summary>
    /// 文本生成图片
    /// </summary>
    Imagine = 1,

    /// <summary>
    /// 图片混合
    /// </summary>
    Blend = 2,

    /// <summary>
    /// 图片描述
    /// </summary>
    Describe = 3,

    /// <summary>
    /// 提示词简化
    /// </summary>
    Shorten = 4,

    /// <summary>
    /// 模态操作 (放大、变体等)
    /// </summary>
    Modal = 5
}

/// <summary>
/// 图片任务状态枚举
/// </summary>
public enum ThorImageTaskStatus
{
    /// <summary>
    /// 已提交
    /// </summary>
    Submitted = 1,

    /// <summary>
    /// 处理中
    /// </summary>
    Processing = 2,

    /// <summary>
    /// 已完成
    /// </summary>
    Completed = 3,

    /// <summary>
    /// 失败
    /// </summary>
    Failed = 4,

    /// <summary>
    /// 已取消
    /// </summary>
    Cancelled = 5
}