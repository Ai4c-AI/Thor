using Thor.BuildingBlocks.Event;
using Thor.Core.DataAccess;
using Thor.Infrastructure;
using Thor.Service.Domain;
using Thor.Service.Eto;

namespace Thor.Service.EventHandlers;

/// <summary>
/// 套餐额度使用事件处理器
/// </summary>
public class SubscriptionQuotaUsageEventHandler : IEventHandler<SubscriptionQuotaUsageEto>, IDisposable
{
    private readonly ILogger<SubscriptionQuotaUsageEventHandler> _logger;
    private readonly IServiceProvider _serviceProvider;

    public SubscriptionQuotaUsageEventHandler(
        ILogger<SubscriptionQuotaUsageEventHandler> logger,
        IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
        _logger.LogInformation("SubscriptionQuotaUsageEventHandler created");
    }

    public async Task HandleAsync(SubscriptionQuotaUsageEto @event)
    {
        _logger.LogInformation("SubscriptionQuotaUsageEto event received for user {UserId}, model {ModelName}, quota {QuotaUsed}",
            @event.UserId, @event.ModelName, @event.QuotaUsed);

        try
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<IThorContext>();

            // 创建使用明细记录
            var usage = SubscriptionQuotaUsage.Create(
                @event.UserId,
                @event.SubscriptionId,
                @event.ModelName,
                @event.QuotaUsed,
                @event.RequestTokens,
                @event.ResponseTokens,
                @event.RequestIp,
                @event.UserAgent,
                @event.RequestId);

            await dbContext.SubscriptionQuotaUsages.AddAsync(usage);
            await dbContext.SaveChangesAsync();

            _logger.LogInformation("Subscription quota usage recorded successfully for user {UserId}", @event.UserId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to handle SubscriptionQuotaUsageEto event for user {UserId}", @event.UserId);
            throw;
        }
    }

    public void Dispose()
    {
        _logger.LogInformation("SubscriptionQuotaUsageEventHandler disposed");
    }
}