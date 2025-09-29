using Thor.Service.Domain.Core;

namespace Thor.Service.Domain;

/// <summary>
/// 套餐计划
/// </summary>
public class SubscriptionPlan : Entity<string>
{
    /// <summary>
    /// 套餐名称
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// 套餐描述
    /// </summary>
    public string Description { get; set; } = null!;

    /// <summary>
    /// 套餐价格
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// 套餐类型 (Monthly, Yearly)
    /// </summary>
    public SubscriptionType Type { get; set; }

    /// <summary>
    /// 允许使用的模型列表
    /// </summary>
    public string[] AllowedModels { get; set; } = [];

    /// <summary>
    /// 每日额度限制（美分）
    /// </summary>
    public long DailyQuotaLimit { get; set; }

    /// <summary>
    /// 每周额度限制（美分）
    /// </summary>
    public long WeeklyQuotaLimit { get; set; }

    /// <summary>
    /// 是否启用
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// 套餐等级，数字越高等级越高
    /// </summary>
    public int Level { get; set; }

    /// <summary>
    /// 套餐图标
    /// </summary>
    public string? Icon { get; set; }

    /// <summary>
    /// 套餐标签（如：推荐、热门等）
    /// </summary>
    public string? Tag { get; set; }

    /// <summary>
    /// 排序权重
    /// </summary>
    public int Sort { get; set; }

    /// <summary>
    /// 绑定的分组ID列表（如果为空则使用用户默认分组）
    /// </summary>
    public string[]? Groups { get; set; }

    /// <summary>
    /// 获取套餐有效期（天数）
    /// </summary>
    /// <returns></returns>
    public int GetValidityDays()
    {
        return Type switch
        {
            SubscriptionType.Monthly => 30,
            SubscriptionType.Yearly => 365,
            SubscriptionType.Weekly => 7,
            _ => 30
        };
    }

    /// <summary>
    /// 检查模型是否被允许
    /// </summary>
    /// <param name="modelName"></param>
    /// <returns></returns>
    public bool IsModelAllowed(string modelName)
    {
        return AllowedModels.Contains(modelName, StringComparer.OrdinalIgnoreCase);
    }

    /// <summary>
    /// 检查是否有特定分组限制
    /// </summary>
    /// <returns></returns>
    public bool HasGroupRestriction()
    {
        return Groups != null && Groups.Length > 0;
    }

    /// <summary>
    /// 检查分组是否被允许使用
    /// </summary>
    /// <param name="groupId"></param>
    /// <returns></returns>
    public bool IsGroupAllowed(string groupId)
    {
        // 如果没有分组限制，则允许所有分组
        if (!HasGroupRestriction())
            return true;

        return Groups!.Contains(groupId, StringComparer.OrdinalIgnoreCase);
    }
}