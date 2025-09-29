using Thor.Domain.Chats;
using Thor.Service.Service;

namespace Thor.Service.Extensions;

/// <summary>
/// ChatService 套餐扩展方法
/// </summary>
public static class ChatServiceSubscriptionExtensions
{
    /// <summary>
    /// 执行完整的用户验证检查（包括Token、限流、套餐检查）
    /// </summary>
    /// <param name="chatService">聊天服务</param>
    /// <param name="context">HTTP上下文</param>
    /// <param name="modelName">模型名称</param>
    /// <param name="rate">费率</param>
    /// <returns>返回用户和Token信息</returns>
    public static async Task<(Token token, User user)> PerformCompleteUserValidationAsync(
        this object chatService,
        HttpContext context,
        string modelName,
        decimal rate)
    {
        // 这是一个示例扩展方法，实际使用时需要注入相关服务
        // 由于ChatService的复杂性，建议直接在ChatService中统一处理
        throw new NotImplementedException("请在ChatService中直接调用CheckSubscriptionRateLimitAsync方法");
    }
}