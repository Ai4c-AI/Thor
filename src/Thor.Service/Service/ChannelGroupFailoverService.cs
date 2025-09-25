using System.Collections.Concurrent;
using Thor.Domain.Chats;
using Thor.Service.Domain.Core;
using Thor.Service.Extensions;

namespace Thor.Service.Service;

/// <summary>
/// 渠道分组故障转移服务
/// 支持按分组优先级自动切换和智能重试
/// </summary>
/// <param name="serviceProvider"></param>
/// <param name="channelService"></param>
/// <param name="cache"></param>
/// <param name="logger"></param>
public sealed class ChannelGroupFailoverService(
    IServiceProvider serviceProvider,
    ChannelService channelService,
    IServiceCache cache,
    ILogger<ChannelGroupFailoverService> logger)
    : ApplicationService(serviceProvider)
{
    private const string ChannelHealthCacheKey = "ChannelHealth:";
    private const string GroupFailureCountCacheKey = "GroupFailure:";

    /// <summary>
    /// 渠道健康状态信息
    /// </summary>
    public class ChannelHealthInfo
    {
        public string ChannelId { get; set; } = string.Empty;
        public int FailureCount { get; set; } = 0;
        public DateTime LastFailureTime { get; set; } = DateTime.MinValue;
        public TimeSpan FailureWindow { get; set; } = TimeSpan.FromMinutes(5);
        public bool IsHealthy => FailureCount < 3 ||
                                DateTime.UtcNow - LastFailureTime > FailureWindow;
    }

    /// <summary>
    /// 分组故障转移上下文
    /// </summary>
    public class GroupFailoverContext
    {
        public string Model { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        public Token? Token { get; set; }
        public string[] PreferredGroups { get; set; } = Array.Empty<string>();
        public HashSet<string> FailedChannelIds { get; set; } = new();
        public int CurrentGroupIndex { get; set; } = 0;
        public int RetryCount { get; set; } = 0;
        public bool IsResponses { get; set; } = false;
    }

    /// <summary>
    /// 获取支持指定模型的渠道，支持分组优先级自动切换
    /// </summary>
    /// <param name="context">故障转移上下文</param>
    /// <returns>可用渠道列表</returns>
    public async ValueTask<IEnumerable<ChatChannel>> GetChannelsWithFailoverAsync(GroupFailoverContext context)
    {
        logger.LogDebug("开始获取渠道，当前分组索引：{GroupIndex}, 重试次数：{RetryCount}",
            context.CurrentGroupIndex, context.RetryCount);

        // 获取当前优先级组的渠道
        var channels = await GetChannelsByGroupPriorityAsync(
            context.Model,
            context.User,
            context.Token,
            context.CurrentGroupIndex,
            context.IsResponses);

        if (!channels.Any())
        {
            logger.LogWarning("分组索引 {GroupIndex} 没有找到可用渠道", context.CurrentGroupIndex);
            return Enumerable.Empty<ChatChannel>();
        }

        // 过滤掉已失败的渠道和不健康的渠道
        var availableChannels = new List<ChatChannel>();
        foreach (var channel in channels)
        {
            if (context.FailedChannelIds.Contains(channel.Id))
            {
                logger.LogDebug("跳过已失败渠道：{ChannelId} - {ChannelName}", channel.Id, channel.Name);
                continue;
            }

            var healthInfo = await GetChannelHealthInfoAsync(channel.Id);
            if (!healthInfo.IsHealthy)
            {
                logger.LogDebug("跳过不健康渠道：{ChannelId} - {ChannelName}, 失败次数：{FailureCount}",
                    channel.Id, channel.Name, healthInfo.FailureCount);
                continue;
            }

            availableChannels.Add(channel);
        }

        return availableChannels.OrderByDescending(x => x.Order);
    }

    /// <summary>
    /// 记录渠道失败并尝试切换到下一个分组
    /// </summary>
    /// <param name="context">故障转移上下文</param>
    /// <param name="channelId">失败的渠道ID</param>
    /// <param name="exception">失败异常</param>
    /// <returns>是否应该继续重试</returns>
    public async ValueTask<bool> HandleChannelFailureAsync(
        GroupFailoverContext context,
        string channelId,
        Exception exception)
    {
        logger.LogWarning("渠道 {ChannelId} 失败：{Error}", channelId, exception.Message);

        // 记录渠道失败
        context.FailedChannelIds.Add(channelId);
        await RecordChannelFailureAsync(channelId, exception);

        // 检查当前分组是否还有可用渠道
        var currentGroupChannels = await GetChannelsByGroupPriorityAsync(
            context.Model,
            context.User,
            context.Token,
            context.CurrentGroupIndex,
            context.IsResponses);

        var hasAvailableInCurrentGroup = currentGroupChannels.Any(c =>
            !context.FailedChannelIds.Contains(c.Id));

        if (!hasAvailableInCurrentGroup)
        {
            // 当前分组无可用渠道，尝试切换到下一个分组
            return await TryFailoverToNextGroupAsync(context);
        }

        // 当前分组还有可用渠道，继续重试
        context.RetryCount++;
        return context.RetryCount < 50; // 防止无限重试
    }

    /// <summary>
    /// 尝试故障转移到下一个分组
    /// </summary>
    /// <param name="context">故障转移上下文</param>
    /// <returns>是否成功切换到下一个分组</returns>
    private async ValueTask<bool> TryFailoverToNextGroupAsync(GroupFailoverContext context)
    {
        if (context.CurrentGroupIndex + 1 >= context.PreferredGroups.Length)
        {
            logger.LogError("所有分组都已尝试，无法继续故障转移。总分组数：{TotalGroups}",
                context.PreferredGroups.Length);
            return false;
        }

        // 切换到下一个分组
        context.CurrentGroupIndex++;
        var nextGroup = context.PreferredGroups[context.CurrentGroupIndex];

        logger.LogInformation("故障转移到分组 {NextGroup} (索引：{GroupIndex})",
            nextGroup, context.CurrentGroupIndex);

        // 重置重试计数器，但保留失败的渠道ID记录
        context.RetryCount = 0;

        // 检查下一个分组是否有可用渠道
        var nextGroupChannels = await GetChannelsByGroupPriorityAsync(
            context.Model,
            context.User,
            context.Token,
            context.CurrentGroupIndex,
            context.IsResponses);

        if (!nextGroupChannels.Any())
        {
            logger.LogWarning("下一个分组 {NextGroup} 没有可用渠道", nextGroup);
            // 递归尝试下一个分组
            return await TryFailoverToNextGroupAsync(context);
        }

        return true;
    }

    /// <summary>
    /// 根据分组优先级获取渠道
    /// </summary>
    /// <param name="model">模型名称</param>
    /// <param name="user">用户</param>
    /// <param name="token">Token</param>
    /// <param name="groupIndex">分组索引</param>
    /// <param name="isResponses">是否支持响应</param>
    /// <returns>指定优先级分组的渠道列表</returns>
    private async ValueTask<IEnumerable<ChatChannel>> GetChannelsByGroupPriorityAsync(
        string model,
        User user,
        Token? token,
        int groupIndex,
        bool isResponses = false)
    {
        var preferredGroups = (token?.Groups?.Length ?? 0) > 0 ? token!.Groups : user.Groups;

        if (groupIndex >= preferredGroups.Length)
        {
            return Enumerable.Empty<ChatChannel>();
        }

        var normalizedGroups = preferredGroups
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Select(x => x.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (groupIndex >= normalizedGroups.Length)
        {
            return Enumerable.Empty<ChatChannel>();
        }

        var targetGroup = normalizedGroups[groupIndex];
        var channels = await channelService.GetChannelsAsync() ?? Array.Empty<ChatChannel>();

        return channels.Where(x =>
                x.Models.Contains(model)
                && (!isResponses || x.SupportsResponses)
                && x.Groups.Any(g =>
                    string.Equals(g?.Trim(), targetGroup, StringComparison.OrdinalIgnoreCase)))
            .OrderByDescending(x => x.Order);
    }

    /// <summary>
    /// 获取渠道健康信息
    /// </summary>
    /// <param name="channelId">渠道ID</param>
    /// <returns>渠道健康信息</returns>
    private async ValueTask<ChannelHealthInfo> GetChannelHealthInfoAsync(string channelId)
    {
        var cacheKey = ChannelHealthCacheKey + channelId;
        var healthInfo = await cache.GetAsync<ChannelHealthInfo>(cacheKey);

        if (healthInfo == null)
        {
            healthInfo = new ChannelHealthInfo { ChannelId = channelId };
            await cache.CreateAsync(cacheKey, healthInfo, TimeSpan.FromMinutes(10));
        }

        return healthInfo;
    }

    /// <summary>
    /// 记录渠道失败
    /// </summary>
    /// <param name="channelId">渠道ID</param>
    /// <param name="exception">失败异常</param>
    private async ValueTask RecordChannelFailureAsync(string channelId, Exception exception)
    {
        var healthInfo = await GetChannelHealthInfoAsync(channelId);

        healthInfo.FailureCount++;
        healthInfo.LastFailureTime = DateTime.UtcNow;

        var cacheKey = ChannelHealthCacheKey + channelId;
        await cache.CreateAsync(cacheKey, healthInfo, TimeSpan.FromMinutes(10));

        logger.LogWarning("记录渠道失败：{ChannelId}, 失败次数：{FailureCount}, 异常：{Exception}",
            channelId, healthInfo.FailureCount, exception.Message);
    }

    /// <summary>
    /// 重置渠道健康状态（用于手动恢复或定期清理）
    /// </summary>
    /// <param name="channelId">渠道ID</param>
    public async ValueTask ResetChannelHealthAsync(string channelId)
    {
        var cacheKey = ChannelHealthCacheKey + channelId;
        await cache.RemoveAsync(cacheKey);
        logger.LogInformation("重置渠道健康状态：{ChannelId}", channelId);
    }

    /// <summary>
    /// 获取所有渠道健康统计
    /// </summary>
    /// <returns>渠道健康统计</returns>
    public async ValueTask<Dictionary<string, ChannelHealthInfo>> GetAllChannelHealthStatsAsync()
    {
        var channels = await channelService.GetChannelsAsync() ?? Array.Empty<ChatChannel>();
        var healthStats = new Dictionary<string, ChannelHealthInfo>();

        foreach (var channel in channels)
        {
            var healthInfo = await GetChannelHealthInfoAsync(channel.Id);
            healthStats[channel.Id] = healthInfo;
        }

        return healthStats;
    }
}