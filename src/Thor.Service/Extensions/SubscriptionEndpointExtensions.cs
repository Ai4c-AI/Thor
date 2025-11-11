using Microsoft.AspNetCore.Authorization;
using Thor.Core.DataAccess;
using Thor.Service.Domain.Core;
using Thor.Service.Filters;
using Thor.Service.Infrastructure;
using Thor.Service.Service;

namespace Thor.Service.Extensions;

public static class SubscriptionEndpointExtensions
{
    public static IEndpointRouteBuilder MapSubscription(this IEndpointRouteBuilder endpoints)
    {
        #region 套餐管理 (用户端)

        var subscription = endpoints
            .MapGroup("/api/v1/subscription")
            .WithTags("Subscription")
            .AddEndpointFilter<ResultFilter>()
            .RequireAuthorization();

        // 获取所有可用套餐
        subscription.MapGet("plans", async (SubscriptionService service) =>
                await service.GetAvailablePlansAsync())
            .WithDescription("获取所有可用套餐")
            .AllowAnonymous()
            .WithName("获取所有可用套餐");

        // 获取用户当前订阅状态
        subscription.MapGet("current", async (SubscriptionService service, IUserContext userContext) =>
                await service.GetUserActiveSubscriptionAsync(userContext.CurrentUserId))
            .WithDescription("获取用户当前订阅状态")
            .WithName("获取用户当前订阅状态");

        // 获取用户当前订阅详情（包含使用额度）
        subscription.MapGet("current-detailed", async (SubscriptionService service, IUserContext userContext) =>
                await service.GetUserSubscriptionDetailedAsync(userContext.CurrentUserId))
            .WithDescription("获取用户当前订阅详情（包含使用额度）")
            .WithName("获取用户当前订阅详情");

        // 获取用户订阅状态摘要
        subscription.MapGet("summary", async (SubscriptionRateLimitService service, IUserContext userContext) =>
                await service.GetUserSubscriptionSummaryAsync(userContext.CurrentUserId))
            .WithDescription("获取用户订阅状态摘要")
            .WithName("获取用户订阅状态摘要");

        // 获取用户订阅历史
        subscription.MapGet("history", async (SubscriptionService service, IUserContext userContext) =>
                await service.GetUserSubscriptionHistoryAsync(userContext.CurrentUserId))
            .WithDescription("获取用户订阅历史")
            .WithName("获取用户订阅历史");

        // 获取用户购买记录
        subscription.MapGet("purchases", async (SubscriptionService service, IUserContext userContext) =>
                await service.GetUserPurchaseRecordsAsync(userContext.CurrentUserId))
            .WithDescription("获取用户购买记录")
            .WithName("获取用户购买记录");

        // 获取用户额度使用统计
        subscription.MapGet("usage", async (SubscriptionService service, IUserContext userContext, int days = 7) =>
                await service.GetUserQuotaUsageAsync(userContext.CurrentUserId, days))
            .WithDescription("获取用户额度使用统计")
            .WithName("获取用户额度使用统计");

        // 获取可升级的套餐列表
        subscription.MapGet("upgradeable-plans",
                async (SubscriptionUpgradeService upgradeService, IUserContext userContext) =>
                    await upgradeService.GetUpgradeableePlansAsync(userContext.CurrentUserId))
            .WithDescription("获取可升级的套餐列表")
            .WithName("获取可升级的套餐列表");

        // 计算升级费用
        subscription.MapPost("calculate-upgrade-cost",
                async (SubscriptionUpgradeService upgradeService, IUserContext userContext,
                    CalculateUpgradeCostInput input) =>
                {
                    var calculation =
                        await upgradeService.CalculateUpgradeCostAsync(userContext.CurrentUserId, input.TargetPlanId);
                    if (calculation == null)
                        return Results.BadRequest("无法计算升级费用，请检查当前订阅状态和目标套餐");

                    return Results.Ok(calculation);
                })
            .WithDescription("计算升级费用")
            .WithName("计算升级费用");

        // 创建升级记录
        subscription.MapPost("upgrade",
                async (SubscriptionUpgradeService upgradeService, IUserContext userContext, CreateUpgradeInput input) =>
                {
                    var upgradeRecord =
                        await upgradeService.CreateUpgradeRecordAsync(userContext.CurrentUserId, input.TargetPlanId);
                    if (upgradeRecord == null)
                        return Results.BadRequest("无法创建升级记录，请检查当前订阅状态和目标套餐");

                    return Results.Ok(upgradeRecord);
                })
            .WithDescription("创建升级记录")
            .WithName("创建升级记录");

        // 执行免费升级
        subscription.MapPost("upgrade/{upgradeId}/execute-free",
                async (SubscriptionUpgradeService upgradeService, string upgradeId) =>
                {
                    var success = await upgradeService.ExecuteFreeUpgradeAsync(upgradeId);
                    return success ? Results.Ok() : Results.BadRequest("免费升级失败");
                })
            .WithDescription("执行免费升级")
            .WithName("执行免费升级");

        // 发起升级支付
        subscription.MapPost("upgrade/{upgradeId}/payment",
                async (SubscriptionPaymentService paymentService, string upgradeId) =>
                {
                    try
                    {
                        var result = await paymentService.StartUpgradePaymentAsync(upgradeId);
                        return Results.Ok(result);
                    }
                    catch (Exception ex)
                    {
                        return Results.BadRequest(ex.Message);
                    }
                })
            .WithDescription("发起升级支付")
            .WithName("发起升级支付");

        // 取消升级
        subscription.MapPost("upgrade/{upgradeId}/cancel",
                async (SubscriptionUpgradeService upgradeService, string upgradeId, CancelUpgradeInput input) =>
                {
                    var success = await upgradeService.CancelUpgradeAsync(upgradeId, input.Reason ?? "用户取消");
                    return success ? Results.Ok() : Results.BadRequest("取消升级失败");
                })
            .WithDescription("取消升级")
            .WithName("取消升级");

        // 获取用户升级历史
        subscription.MapGet("upgrade/history",
                async (SubscriptionUpgradeService upgradeService, IUserContext userContext) =>
                    await upgradeService.GetUserUpgradeHistoryAsync(userContext.CurrentUserId))
            .WithDescription("获取用户升级历史")
            .WithName("获取用户升级历史");

        // 创建套餐购买订单
        subscription.MapPost("purchase",
                async (SubscriptionService service, IUserContext userContext, PurchaseSubscriptionInput input) =>
                {
                    var record = await service.CreatePurchaseRecordAsync(userContext.CurrentUserId, input.PlanId,
                        input.PaymentMethod);
                    if (record == null)
                        throw new InvalidOperationException("无法创建购买记录，请检查套餐ID和当前订阅状态");

                    return record;
                })
            .WithDescription("创建套餐购买订单")
            .WithName("创建套餐购买订单");

        // 发起套餐支付
        subscription.MapPost("payment/{purchaseRecordId}",
                async (SubscriptionPaymentService paymentService, string purchaseRecordId) =>
                {
                    var result = await paymentService.StartSubscriptionPaymentAsync(purchaseRecordId);
                    return result;
                })
            .WithDescription("发起套餐支付")
            .WithName("发起套餐支付");

        // 查询支付状态
        subscription.MapGet("payment/{purchaseRecordId}/status",
                async (SubscriptionPaymentService paymentService, string purchaseRecordId) =>
                {
                    var result = await paymentService.QueryPaymentStatusAsync(purchaseRecordId);
                    return Results.Ok(result);
                })
            .WithDescription("查询支付状态")
            .WithName("查询支付状态");

        // 取消支付
        subscription.MapPost("payment/{purchaseRecordId}/cancel",
                async (SubscriptionPaymentService paymentService, string purchaseRecordId, CancelPaymentInput input) =>
                {
                    var success = await paymentService.CancelPaymentAsync(purchaseRecordId, input.Reason);
                    return success ? Results.Ok() : Results.BadRequest("取消失败");
                })
            .WithDescription("取消支付")
            .WithName("取消支付");

        #endregion

        #region 支付回调（无需认证）

        var paymentCallback = endpoints
            .MapGroup("/api/v1/subscription")
            .WithTags("Subscription Payment")
            .AddEndpointFilter<ResultFilter>();

        // 支付宝回调地址
        paymentCallback.MapPost("payment-callback",
                async (SubscriptionPaymentService paymentService, HttpContext context) =>
                {
                    await paymentService.HandleSubscriptionPaymentCallbackAsync(context);
                    return Results.Ok("success");
                })
            .WithDescription("支付宝回调地址")
            .AllowAnonymous()
            .WithName("支付宝回调地址");

        // 套餐升级支付回调地址
        paymentCallback.MapPost("upgrade-payment-callback",
                async (SubscriptionPaymentService paymentService, HttpContext context) =>
                {
                    await paymentService.HandleUpgradePaymentCallbackAsync(context);
                    return Results.Ok("success");
                })
            .WithDescription("套餐升级支付回调地址")
            .AllowAnonymous()
            .WithName("套餐升级支付回调地址");

        #endregion

        #region 套餐管理 (管理员端)

        var subscriptionAdmin = endpoints
            .MapGroup("/api/v1/subscription/admin")
            .WithTags("Subscription Admin")
            .AddEndpointFilter<ResultFilter>()
            .RequireAuthorization(new AuthorizeAttribute()
            {
                Roles = RoleConstant.Admin
            });

        // 创建套餐
        subscriptionAdmin.MapPost("plans",
                async (IThorContext context, CreateSubscriptionPlanInput input) =>
                {
                    var plan = new SubscriptionPlan
                    {
                        Id = Guid.NewGuid().ToString("N"),
                        Name = input.Name,
                        Description = input.Description,
                        Price = input.Price,
                        Type = input.Type,
                        AllowedModels = input.AllowedModels,
                        DailyQuotaLimit = input.DailyQuotaLimit,
                        WeeklyQuotaLimit = input.WeeklyQuotaLimit,
                        IsActive = input.IsActive,
                        Level = input.Level,
                        Icon = input.Icon,
                        Tag = input.Tag,
                        Sort = input.Sort,
                        CreatedAt = DateTime.UtcNow
                    };

                    await context.SubscriptionPlans.AddAsync(plan);
                    await context.SaveChangesAsync();

                    return Results.Ok(plan);
                })
            .WithDescription("创建套餐")
            .WithName("创建套餐");

        // 更新套餐
        subscriptionAdmin.MapPut("plans/{id}",
                async (IThorContext dbContext, SubscriptionService service, string id,
                    UpdateSubscriptionPlanInput input) =>
                {
                    var plan = await dbContext.SubscriptionPlans.FirstOrDefaultAsync(x => x.Id == id);
                    if (plan == null)
                        return Results.NotFound("套餐不存在");

                    plan.Name = input.Name;
                    plan.Description = input.Description;
                    plan.Price = input.Price;
                    plan.Type = input.Type;
                    plan.AllowedModels = input.AllowedModels;
                    plan.DailyQuotaLimit = input.DailyQuotaLimit;
                    plan.WeeklyQuotaLimit = input.WeeklyQuotaLimit;
                    plan.IsActive = input.IsActive;
                    plan.Level = input.Level;
                    plan.Icon = input.Icon;
                    plan.Tag = input.Tag;
                    plan.Sort = input.Sort;
                    plan.UpdatedAt = DateTime.Now;

                    dbContext.SubscriptionPlans.Update(plan);
                    await dbContext.SaveChangesAsync();

                    return Results.Ok(plan);
                })
            .WithDescription("更新套餐")
            .WithName("更新套餐");

        // 删除套餐
        subscriptionAdmin.MapDelete("plans/{id}",
                async (IThorContext dbContext, SubscriptionService service, string id) =>
                {
                    var deleted = await dbContext.SubscriptionPlans
                        .Where(x => x.Id == id)
                        .ExecuteDeleteAsync();

                    return deleted > 0 ? Results.Ok() : Results.NotFound("套餐不存在");
                })
            .WithDescription("删除套餐")
            .WithName("删除套餐");

        // 获取所有套餐（包括禁用的）
        subscriptionAdmin.MapGet("plans", async (IThorContext dbContext) =>
            {
                return await dbContext.SubscriptionPlans
                    .OrderBy(x => x.Sort)
                    .ThenBy(x => x.Level)
                    .ToListAsync();
            })
            .WithDescription("获取所有套餐（管理员）")
            .WithName("获取所有套餐（管理员）");

        // 获取用户订阅列表
        subscriptionAdmin.MapGet("users",
                async (IThorContext dbContext, int page = 1, int pageSize = 10, string? userId = null,
                    SubscriptionStatus? status = null) =>
                {
                    var query = dbContext.UserSubscriptions
                        .Include(x => x.Plan)
                        .Include(x => x.User)
                        .AsQueryable();

                    if (!string.IsNullOrEmpty(userId))
                        query = query.Where(x => x.UserId == userId);

                    if (status.HasValue)
                        query = query.Where(x => x.Status == status.Value);

                    var total = await query.CountAsync();
                    var items = await query
                        .OrderByDescending(x => x.CreatedAt)
                        .Skip((page - 1) * pageSize)
                        .Take(pageSize)
                        .ToListAsync();

                    return new { items, total, page, pageSize };
                })
            .WithDescription("获取用户订阅列表")
            .WithName("获取用户订阅列表");

        // 获取购买记录列表
        subscriptionAdmin.MapGet("purchases",
                async (IThorContext dbContext, SubscriptionService service, int page = 1, int pageSize = 10,
                    string? userId = null, PaymentStatus? status = null) =>
                {
                    var query = dbContext.SubscriptionPurchaseRecords
                        .Include(x => x.Plan)
                        .Include(x => x.User)
                        .AsQueryable();

                    if (!string.IsNullOrEmpty(userId))
                        query = query.Where(x => x.UserId == userId);

                    if (status.HasValue)
                        query = query.Where(x => x.PaymentStatus == status.Value);

                    var total = await query.CountAsync();
                    var items = await query
                        .OrderByDescending(x => x.CreatedAt)
                        .Skip((page - 1) * pageSize)
                        .Take(pageSize)
                        .ToListAsync();

                    return new { items, total, page, pageSize };
                })
            .WithDescription("获取购买记录列表")
            .WithName("获取购买记录列表");

        // 获取额度使用统计
        subscriptionAdmin.MapGet("usage-stats",
                async (IThorContext dbContext, string? userId = null,
                    DateTime? startDate = null, DateTime? endDate = null) =>
                {
                    var query = dbContext.SubscriptionQuotaUsages
                        .Include(x => x.User)
                        .Include(x => x.Subscription)
                        .ThenInclude(x => x.Plan)
                        .AsQueryable();

                    if (!string.IsNullOrEmpty(userId))
                        query = query.Where(x => x.UserId == userId);

                    if (startDate.HasValue)
                        query = query.Where(x => x.UsageTime >= startDate.Value);

                    if (endDate.HasValue)
                        query = query.Where(x => x.UsageTime <= endDate.Value);

                    var stats = await query
                        .GroupBy(x => new { x.UserId, x.User.UserName, x.ModelName })
                        .Select(g => new
                        {
                            g.Key.UserId,
                            g.Key.UserName,
                            g.Key.ModelName,
                            TotalQuota = g.Sum(x => x.QuotaUsed),
                            TotalTokens = g.Sum(x => x.TotalTokens),
                            RequestCount = g.Count()
                        })
                        .OrderByDescending(x => x.TotalQuota)
                        .ToListAsync();

                    return stats;
                })
            .WithDescription("获取额度使用统计")
            .WithName("获取额度使用统计");

        // 赠送套餐给用户
        subscriptionAdmin.MapPost("gift",
                async (SubscriptionService service, IUserContext userContext, GiftSubscriptionInput input) =>
                {
                    var success = await service.GiftSubscriptionAsync(userContext.CurrentUserId, input.TargetUserId,
                        input.PlanId);
                    return success ? Results.Ok("赠送成功") : Results.BadRequest("赠送失败，请检查用户ID和套餐ID");
                })
            .WithDescription("赠送套餐给用户")
            .WithName("赠送套餐给用户");

        // 手动触发维护任务
        subscriptionAdmin.MapPost("maintenance", async (SubscriptionService service) =>
            {
                var expiredCount = await service.MarkExpiredSubscriptionsAsync();
                var dailyResetCount = await service.ResetAllDailyQuotasAsync();
                var weeklyResetCount = await service.ResetAllWeeklyQuotasAsync();

                return Results.Ok(new
                {
                    ExpiredSubscriptions = expiredCount,
                    DailyQuotaReset = dailyResetCount,
                    WeeklyQuotaReset = weeklyResetCount
                });
            })
            .WithDescription("手动触发维护任务")
            .WithName("手动触发维护任务");

        #endregion

        return endpoints;
    }
}

// 输入DTO类
public record PurchaseSubscriptionInput(string PlanId, string PaymentMethod = "alipay");

public record CancelPaymentInput(string? Reason);

public record CreateSubscriptionPlanInput(
    string Name,
    string Description,
    decimal Price,
    SubscriptionType Type,
    string[] AllowedModels,
    long DailyQuotaLimit,
    long WeeklyQuotaLimit,
    bool IsActive,
    int Level,
    string? Icon,
    string? Tag,
    int Sort
);

public record UpdateSubscriptionPlanInput(
    string Name,
    string Description,
    decimal Price,
    SubscriptionType Type,
    string[] AllowedModels,
    long DailyQuotaLimit,
    long WeeklyQuotaLimit,
    bool IsActive,
    int Level,
    string? Icon,
    string? Tag,
    int Sort
);

public record CalculateUpgradeCostInput(string TargetPlanId);

public record CreateUpgradeInput(string TargetPlanId);

public record CancelUpgradeInput(string? Reason);

public record GiftSubscriptionInput(string TargetUserId, string PlanId);