using Thor.BuildingBlocks.Event;
using Thor.Core.DataAccess;
using Thor.Domain.Images;

namespace Thor.Service.EventHandlers;

public sealed class ImageTaskLoggerEventHandler(
    ILogger<ImageTaskLoggerEventHandler> logger,
    ILoggerDbContext loggerDbContext)
    : IEventHandler<ImageTaskLogger>, IDisposable
{
    public async Task HandleAsync(ImageTaskLogger @event)
    {
        @event.Id = Guid.NewGuid().ToString("N") + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        @event.CreatedAt = DateTime.Now;
        await loggerDbContext.ImageTaskLoggers.AddAsync(@event);
        await loggerDbContext.SaveChangesAsync();

        logger.LogInformation("ImageTaskLogger event received for TaskId: {TaskId}", @event.TaskId);
    }

    public void Dispose()
    {
        logger.LogInformation("图片任务事件处理器已释放");
    }
}