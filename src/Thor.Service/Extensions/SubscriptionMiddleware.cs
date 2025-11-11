using Thor.Abstractions.Exceptions;
using Thor.Service.Service;

namespace Thor.Service.Extensions;

/// <summary>
/// 套餐限流中间件
/// </summary>
public class SubscriptionMiddleware(RequestDelegate next, ILogger<SubscriptionMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context, SubscriptionRateLimitService rateLimitService)
    {
        // 只对聊天相关的API进行套餐检查
        if (ShouldCheckSubscription(context.Request.Path))
        {
            try
            {
                // 从请求中获取用户ID和模型信息
                var userInfo = await ExtractUserAndModelInfoAsync(context);
                if (userInfo != null)
                {
                    // 检查套餐权限和额度
                    var rateLimitResult = await rateLimitService.CheckRequestAllowedAsync(
                        userInfo.UserId, userInfo.ModelName, userInfo.EstimatedQuota);

                    if (!rateLimitResult.IsAllowed)
                    {
                        // 记录失败请求
                        await rateLimitService.RecordFailedRequestAsync(
                            userInfo.UserId, userInfo.ModelName, rateLimitResult.DeniedReason ?? "请求被拒绝",
                            context.Connection.RemoteIpAddress?.ToString(),
                            context.Request.Headers.UserAgent,
                            context.TraceIdentifier);

                        // 返回429状态码和具体原因
                        context.Response.StatusCode = 429;
                        context.Response.ContentType = "application/json";

                        var response = new
                        {
                            error = new
                            {
                                message = rateLimitResult.DeniedReason,
                                type = "subscription_quota_exceeded",
                                code = "subscription_required"
                            }
                        };

                        await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(response));
                        return;
                    }

                    // 将套餐信息添加到请求上下文中，供后续使用
                    context.Items["UserSubscription"] = rateLimitResult.Subscription;
                    context.Items["SubscriptionUserId"] = userInfo.UserId;
                    context.Items["SubscriptionModelName"] = userInfo.ModelName;
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "套餐限流检查时发生错误，路径: {Path}", context.Request.Path);
                // 如果套餐检查出错，继续执行原有流程，不阻断请求
            }
        }

        await next(context);
    }

    /// <summary>
    /// 判断是否需要进行套餐检查
    /// </summary>
    /// <param name="path"></param>
    /// <returns></returns>
    private static bool ShouldCheckSubscription(PathString path)
    {
        var pathValue = path.Value?.ToLowerInvariant();
        if (string.IsNullOrEmpty(pathValue))
            return false;

        // 只对聊天和向量化API进行套餐检查
        return pathValue.Contains("/v1/chat/completions") ||
               pathValue.Contains("/v1/completions") ||
               pathValue.Contains("/v1/embeddings") ||
               pathValue.Contains("/v1/audio/") ||
               pathValue.Contains("/v1/images/");
    }

    /// <summary>
    /// 从请求中提取用户和模型信息
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    private static async Task<UserModelInfo?> ExtractUserAndModelInfoAsync(HttpContext context)
    {
        try
        {
            // 从认证信息中获取用户ID
            var userIdClaim = context.User?.FindFirst("UserId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return null;

            // 从请求体中提取模型信息
            var modelName = await ExtractModelFromRequestAsync(context);
            if (string.IsNullOrEmpty(modelName))
                return null;

            // 估算额度消耗（这里使用一个基础值，实际消耗在请求完成后会重新计算）
            var estimatedQuota = EstimateQuotaForModel(modelName);

            return new UserModelInfo
            {
                UserId = userIdClaim,
                ModelName = modelName,
                EstimatedQuota = estimatedQuota
            };
        }
        catch (Exception)
        {
            return null;
        }
    }

    /// <summary>
    /// 从请求中提取模型名称
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    private static async Task<string?> ExtractModelFromRequestAsync(HttpContext context)
    {
        if (context.Request.ContentType?.Contains("application/json") != true)
            return null;

        try
        {
            // 保存请求体供后续使用
            context.Request.EnableBuffering();

            using var reader = new StreamReader(context.Request.Body, leaveOpen: true);
            var requestBody = await reader.ReadToEndAsync();
            context.Request.Body.Position = 0;

            if (string.IsNullOrEmpty(requestBody))
                return null;

            var jsonDoc = System.Text.Json.JsonDocument.Parse(requestBody);
            var root = jsonDoc.RootElement;

            if (root.TryGetProperty("model", out var modelProperty))
            {
                return modelProperty.GetString();
            }
        }
        catch (Exception)
        {
            // 解析失败时重置流位置
            if (context.Request.Body.CanSeek)
                context.Request.Body.Position = 0;
        }

        return null;
    }

    /// <summary>
    /// 估算模型的额度消耗
    /// </summary>
    /// <param name="modelName"></param>
    /// <returns></returns>
    private static long EstimateQuotaForModel(string modelName)
    {
        // 基于模型类型估算基础额度消耗（美分）
        return modelName.ToLowerInvariant() switch
        {
            var name when name.Contains("gpt-4") => 100, // $1.00
            var name when name.Contains("gpt-3.5") => 20, // $0.20
            var name when name.Contains("claude-3-opus") => 150, // $1.50
            var name when name.Contains("claude-3-sonnet") => 60, // $0.60
            var name when name.Contains("claude-3-haiku") => 25, // $0.25
            var name when name.Contains("gpt-5") => 200, // $2.00
            _ => 50 // 默认 $0.50
        };
    }
}

/// <summary>
/// 用户模型信息
/// </summary>
public class UserModelInfo
{
    public string UserId { get; set; } = null!;
    public string ModelName { get; set; } = null!;
    public long EstimatedQuota { get; set; }
}

/// <summary>
/// 套餐中间件扩展
/// </summary>
public static class SubscriptionMiddlewareExtensions
{
    public static IApplicationBuilder UseSubscriptionRateLimit(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<SubscriptionMiddleware>();
    }
}