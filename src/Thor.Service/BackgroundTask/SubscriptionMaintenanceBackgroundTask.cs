using Microsoft.Extensions.Hosting;
using Thor.Service.Service;

namespace Thor.Service.BackgroundTask;

/// <summary>
/// 套餐维护后台任务（处理过期检查和额度重置）
/// </summary>
public class SubscriptionMaintenanceBackgroundTask(
    IServiceProvider serviceProvider,
    ILogger<SubscriptionMaintenanceBackgroundTask> logger)
    : BackgroundService
{
    private readonly TimeSpan _checkInterval = TimeSpan.FromMinutes(30); // 每30分钟检查一次

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("套餐维护后台任务已启动");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                // 判断当前时间是否凌晨整点
                await PerformMaintenanceAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "执行套餐维护任务时发生错误");
            }

            // 等待下一次执行
            await Task.Delay(_checkInterval, stoppingToken);
        }

        logger.LogInformation("套餐维护后台任务已停止");
    }

    /// <summary>
    /// 执行维护任务
    /// </summary>
    private async Task PerformMaintenanceAsync()
    {
        using var scope = serviceProvider.CreateScope();
        var subscriptionService = scope.ServiceProvider.GetRequiredService<SubscriptionService>();

        
        await MarkExpiredSubscriptionsAsync(subscriptionService);
        await ResetDailyQuotasAsync(subscriptionService);
        await ResetWeeklyQuotasAsync(subscriptionService);
    }

    /// <summary>
    /// 标记过期的订阅
    /// </summary>
    private async Task MarkExpiredSubscriptionsAsync(SubscriptionService subscriptionService)
    {
        try
        {
            var expiredCount = await subscriptionService.MarkExpiredSubscriptionsAsync();
            if (expiredCount > 0)
            {
                logger.LogInformation("标记了 {Count} 个过期的套餐订阅", expiredCount);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "标记过期订阅时发生错误");
        }
    }

    /// <summary>
    /// 重置每日额度
    /// </summary>
    private async Task ResetDailyQuotasAsync(SubscriptionService subscriptionService)
    {
        try
        {
            var resetCount = await subscriptionService.ResetAllDailyQuotasAsync();
            if (resetCount > 0)
            {
                logger.LogInformation("重置了 {Count} 个用户的每日额度", resetCount);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "重置每日额度时发生错误");
        }
    }

    /// <summary>
    /// 重置每周额度
    /// </summary>
    private async Task ResetWeeklyQuotasAsync(SubscriptionService subscriptionService)
    {
        try
        {
            var resetCount = await subscriptionService.ResetAllWeeklyQuotasAsync();
            if (resetCount > 0)
            {
                logger.LogInformation("重置了 {Count} 个用户的每周额度", resetCount);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "重置每周额度时发生错误");
        }
    }
}