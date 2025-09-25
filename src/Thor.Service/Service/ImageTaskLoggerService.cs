using System.Diagnostics;
using System.Text.Json;
using Thor.BuildingBlocks.Event;
using Thor.Domain.Images;
using Thor.Domain.Shared;
using Thor.Infrastructure;

namespace Thor.Service.Service;

/// <summary>
/// 图片任务日志服务
/// </summary>
public sealed class ImageTaskLoggerService(
    IServiceProvider serviceProvider,
    IEventBus<ImageTaskLogger> eventBus,
    IServiceCache serviceCache)
    : ApplicationService(serviceProvider)
{
    /// <summary>
    /// 创建图片任务日志
    /// </summary>
    public async ValueTask CreateAsync(ImageTaskLogger logger)
    {
        logger.CreatedAt = DateTime.Now;
        await eventBus.PublishAsync(logger);
    }

    /// <summary>
    /// 创建图片任务提交日志
    /// </summary>
    public async ValueTask CreateTaskAsync(
        string taskId,
        ThorImageTaskType taskType,
        string prompt,
        string model,
        long quota,
        string? tokenName,
        string? userName,
        string? userId,
        string? channelId,
        string? channelName,
        string ip,
        string userAgent,
        string url,
        int totalTime,
        string? organizationId = null,
        bool isSuccess = true,
        string? errorMessage = null,
        object? taskParameters = null)
    {
        using var activity = Activity.Current?.Source.StartActivity("创建图片任务日志");

        activity?.SetTag("TaskId", taskId);
        activity?.SetTag("TaskType", taskType.ToString());
        activity?.SetTag("Model", model);

        var logger = new ImageTaskLogger
        {
            TaskId = taskId,
            TaskType = taskType,
            TaskStatus = isSuccess ? ThorImageTaskStatus.Submitted : ThorImageTaskStatus.Failed,
            Prompt = prompt,
            ModelName = model,
            Quota = quota,
            TokenName = tokenName,
            UserName = userName,
            UserId = userId,
            ChannelId = channelId,
            ChannelName = channelName,
            TotalTime = totalTime,
            IP = ip,
            UserAgent = userAgent,
            OrganizationId = organizationId,
            Url = url,
            IsSuccess = isSuccess,
            ErrorMessage = errorMessage,
            TaskParameters = taskParameters != null ? JsonSerializer.Serialize(taskParameters) : null,
            TaskCreatedAt = DateTime.Now
        };

        await CreateAsync(logger);
    }

    /// <summary>
    /// 更新任务状态
    /// </summary>
    public async ValueTask UpdateTaskStatusAsync(
        string taskId,
        ThorImageTaskStatus status,
        int progress = 0,
        string[]? imageUrls = null,
        string? errorMessage = null)
    {
        var logger = await LoggerDbContext.ImageTaskLoggers
            .FirstOrDefaultAsync(x => x.TaskId == taskId);

        if (logger == null) return;

        logger.TaskStatus = status;
        logger.Progress = progress;
        logger.ErrorMessage = errorMessage;

        if (imageUrls?.Length > 0)
        {
            logger.ImageUrls = JsonSerializer.Serialize(imageUrls);
        }

        if (status == ThorImageTaskStatus.Completed || status == ThorImageTaskStatus.Failed)
        {
            logger.TaskCompletedAt = DateTime.Now;
        }

        logger.UpdatedAt = DateTime.Now;

        await LoggerDbContext.SaveChangesAsync();

        // 发布任务状态更新事件
        await eventBus.PublishAsync(logger);
    }

    /// <summary>
    /// 根据TaskId获取任务日志
    /// </summary>
    public async ValueTask<ImageTaskLogger?> GetByTaskIdAsync(string taskId)
    {
        return await LoggerDbContext.ImageTaskLoggers
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.TaskId == taskId);
    }

    /// <summary>
    /// 分页查询图片任务日志
    /// </summary>
    public async ValueTask<PagingDto<ImageTaskLogger>> GetAsync(
        int page,
        int pageSize,
        ThorImageTaskType? taskType = null,
        ThorImageTaskStatus? taskStatus = null,
        string? model = null,
        DateTime? startTime = null,
        DateTime? endTime = null,
        string? keyword = null,
        string? userId = null)
    {
        var query = LoggerDbContext.ImageTaskLoggers.AsNoTracking();

        if (taskType.HasValue)
            query = query.Where(x => x.TaskType == taskType);

        if (taskStatus.HasValue)
            query = query.Where(x => x.TaskStatus == taskStatus);

        if (!string.IsNullOrWhiteSpace(model))
            query = query.Where(x => x.ModelName == model);

        if (startTime.HasValue)
            query = query.Where(x => x.CreatedAt >= startTime);

        if (endTime.HasValue)
            query = query.Where(x => x.CreatedAt <= endTime);

        // 用户权限校验
        if (!UserContext.IsAdmin)
        {
            query = query.Where(x => x.UserId == UserContext.CurrentUserId);
        }
        else if (!string.IsNullOrWhiteSpace(userId))
        {
            query = query.Where(x => x.UserId == userId);
        }

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            query = query.Where(x =>
                x.UserName!.Contains(keyword) ||
                x.Prompt.Contains(keyword) ||
                x.TaskId.Contains(keyword) ||
                x.TokenName!.Contains(keyword) ||
                (!string.IsNullOrEmpty(x.ChannelName) && x.ChannelName.Contains(keyword)) ||
                x.ModelName.Contains(keyword)
            );
        }

        var total = await query.CountAsync();

        if (total <= 0)
            return new PagingDto<ImageTaskLogger>(total, []);

        var result = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        // 脱敏处理
        if (!UserContext.IsAdmin)
        {
            result.ForEach(x => { x.ChannelName = null; });
        }

        result.ForEach(x =>
        {
            if (!string.IsNullOrEmpty(x.TokenName))
            {
                x.TokenName = x.TokenName[..3] + "..." + x.TokenName[^3..];
            }
        });

        return new PagingDto<ImageTaskLogger>(total, result);
    }

    /// <summary>
    /// 获取任务统计信息
    /// </summary>
    public async ValueTask<object> GetTaskStatisticsAsync(DateTime? startTime = null, DateTime? endTime = null)
    {
        var query = LoggerDbContext.ImageTaskLoggers.AsNoTracking();

        if (startTime.HasValue)
            query = query.Where(x => x.CreatedAt >= startTime);

        if (endTime.HasValue)
            query = query.Where(x => x.CreatedAt <= endTime);

        if (!UserContext.IsAdmin)
        {
            query = query.Where(x => x.UserId == UserContext.CurrentUserId);
        }

        var statistics = await query
            .GroupBy(x => x.TaskType)
            .Select(g => new
            {
                TaskType = g.Key.ToString(),
                Total = g.Count(),
                Completed = g.Count(x => x.TaskStatus == ThorImageTaskStatus.Completed),
                Failed = g.Count(x => x.TaskStatus == ThorImageTaskStatus.Failed),
                Processing = g.Count(x => x.TaskStatus == ThorImageTaskStatus.Processing),
                TotalQuota = g.Sum(x => x.Quota)
            })
            .ToListAsync();

        return new
        {
            TaskTypes = statistics,
            TotalTasks = statistics.Sum(x => x.Total),
            TotalQuota = statistics.Sum(x => x.TotalQuota),
            SuccessRate = statistics.Sum(x => x.Total) > 0
                ? Math.Round((double)statistics.Sum(x => x.Completed) / statistics.Sum(x => x.Total) * 100, 2)
                : 0
        };
    }

    /// <summary>
    /// 根据渠道和TaskId列表查询任务
    /// 用于MJ的GetTaskListByCondition接口
    /// </summary>
    public async ValueTask<List<ImageTaskLogger>> GetTasksByChannelAndIdsAsync(
        string channelId,
        List<string> taskIds)
    {
        return await LoggerDbContext.ImageTaskLoggers
            .AsNoTracking()
            .Where(x => x.ChannelId == channelId && taskIds.Contains(x.TaskId))
            .ToListAsync();
    }
}