using Microsoft.EntityFrameworkCore;
using Thor.Domain.System;
using Thor.Infrastructure;
using Thor.Service.Domain.Core;

namespace Thor.Service.Service;

/// <summary>
/// 套餐升级服务
/// </summary>
public class SubscriptionUpgradeService(
    IServiceProvider serviceProvider,
    SubscriptionService subscriptionService,
    SubscriptionPaymentService paymentService,
    LoggerService loggerService)
    : ApplicationService(serviceProvider)
{
    /// <summary>
    /// 计算套餐升级费用
    /// </summary>
    /// <param name="userId">用户ID</param>
    /// <param name="targetPlanId">目标套餐ID</param>
    /// <returns>升级费用计算结果</returns>
    public async Task<UpgradeCostCalculation?> CalculateUpgradeCostAsync(string userId, string targetPlanId)
    {
        // 获取用户当前有效订阅
        var currentSubscription = await subscriptionService.GetUserActiveSubscriptionAsync(userId);
        if (currentSubscription?.Plan == null)
        {
            return null; // 用户没有有效订阅
        }

        // 获取目标套餐
        var targetPlan = await subscriptionService.GetPlanByIdAsync(targetPlanId);
        if (targetPlan == null)
        {
            return null; // 目标套餐不存在
        }

        // 检查是否为升级（目标套餐等级必须更高）
        if (targetPlan.Level <= currentSubscription.Plan.Level)
        {
            return null; // 不是升级，是降级或同级
        }

        // 计算原套餐剩余价值
        var remainingValue = CalculateRemainingValue(currentSubscription);

        // 计算实际需要支付的金额
        var actualPayAmount = Math.Max(0, targetPlan.Price - remainingValue);

        return new UpgradeCostCalculation
        {
            CurrentPlan = currentSubscription.Plan,
            TargetPlan = targetPlan,
            CurrentSubscription = currentSubscription,
            RemainingDays = (int)Math.Max(0, (currentSubscription.EndDate - DateTime.Now).TotalDays),
            RemainingValue = remainingValue,
            TargetPrice = targetPlan.Price,
            ActualPayAmount = actualPayAmount,
            DiscountAmount = remainingValue,
            CanUpgrade = true
        };
    }

    /// <summary>
    /// 创建套餐升级记录
    /// </summary>
    /// <param name="userId">用户ID</param>
    /// <param name="targetPlanId">目标套餐ID</param>
    /// <returns>升级记录</returns>
    public async Task<SubscriptionUpgrade?> CreateUpgradeRecordAsync(string userId, string targetPlanId)
    {
        var costCalculation = await CalculateUpgradeCostAsync(userId, targetPlanId);
        if (costCalculation?.CanUpgrade != true)
        {
            return null;
        }

        var upgradeRecord = SubscriptionUpgrade.Create(
            userId,
            costCalculation.CurrentSubscription,
            costCalculation.TargetPlan,
            costCalculation.RemainingValue,
            costCalculation.ActualPayAmount);

        DbContext.SubscriptionUpgrades.Add(upgradeRecord);
        await DbContext.SaveChangesAsync();

        return upgradeRecord;
    }

    /// <summary>
    /// 执行套餐升级（支付成功后调用）
    /// </summary>
    /// <param name="upgradeId">升级记录ID</param>
    /// <param name="paymentRecordId">支付记录ID（如果需要支付）</param>
    /// <returns>是否成功</returns>
    public async Task<bool> ExecuteUpgradeAsync(string upgradeId, string? paymentRecordId = null)
    {
        var upgradeRecord = await DbContext.SubscriptionUpgrades
            .Include(x => x.FromSubscription)
            .Include(x => x.ToPlan)
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.Id == upgradeId);

        if (upgradeRecord?.FromSubscription?.Plan == null || upgradeRecord.ToPlan == null)
        {
            return false;
        }

        try
        {
            // 开始事务
            using var transaction = await DbContext.Database.BeginTransactionAsync();

            // 1. 取消原订阅
            upgradeRecord.FromSubscription.Cancel();
            DbContext.UserSubscriptions.Update(upgradeRecord.FromSubscription);

            // 2. 创建新订阅
            var newSubscription = new UserSubscription
            {
                Id = Guid.NewGuid().ToString("N"),
                UserId = upgradeRecord.UserId,
                PlanId = upgradeRecord.ToPlanId,
                StartDate = upgradeRecord.NewStartDate,
                EndDate = upgradeRecord.NewEndDate,
                Status = SubscriptionStatus.Active,
                PurchaseRecordId = paymentRecordId,
                LastDailyResetDate = upgradeRecord.NewStartDate.Date,
                LastWeeklyResetDate = GetWeekStart(upgradeRecord.NewStartDate),
                CreatedAt = DateTime.Now
            };

            DbContext.UserSubscriptions.Add(newSubscription);

            // 3. 更新升级记录
            upgradeRecord.MarkCompleted(newSubscription.Id, paymentRecordId);
            DbContext.SubscriptionUpgrades.Update(upgradeRecord);

            await DbContext.SaveChangesAsync();
            await transaction.CommitAsync();

            // 记录日志
            await loggerService.CreateRechargeAsync(
                $"用户 {upgradeRecord.User?.UserName} 成功升级套餐：{upgradeRecord.FromSubscription.Plan?.Name} → {upgradeRecord.ToPlan.Name}，" +
                $"剩余价值抵扣：${upgradeRecord.RemainingValue:F2}，实际支付：${upgradeRecord.ActualPayAmount:F2}",
                0, upgradeRecord.UserId);

            return true;
        }
        catch (Exception ex)
        {
            upgradeRecord.MarkFailed($"升级执行失败：{ex.Message}");
            DbContext.SubscriptionUpgrades.Update(upgradeRecord);
            await DbContext.SaveChangesAsync();
            return false;
        }
    }

    /// <summary>
    /// 执行免费升级（实际支付金额为0时）
    /// </summary>
    /// <param name="upgradeId">升级记录ID</param>
    /// <returns>是否成功</returns>
    public async Task<bool> ExecuteFreeUpgradeAsync(string upgradeId)
    {
        var upgradeRecord = await DbContext.SubscriptionUpgrades
            .FirstOrDefaultAsync(x => x.Id == upgradeId && x.ActualPayAmount == 0);

        if (upgradeRecord == null)
        {
            return false;
        }

        return await ExecuteUpgradeAsync(upgradeId);
    }

    /// <summary>
    /// 获取用户升级历史
    /// </summary>
    /// <param name="userId">用户ID</param>
    /// <returns>升级历史</returns>
    public async Task<List<SubscriptionUpgrade>> GetUserUpgradeHistoryAsync(string userId)
    {
        return await DbContext.SubscriptionUpgrades
            .Include(x => x.FromPlan)
            .Include(x => x.ToPlan)
            .Include(x => x.PaymentRecord)
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    /// <summary>
    /// 获取可升级的套餐列表
    /// </summary>
    /// <param name="userId">用户ID</param>
    /// <returns>可升级的套餐列表</returns>
    public async Task<List<SubscriptionPlan>> GetUpgradeableePlansAsync(string userId)
    {
        var currentSubscription = await subscriptionService.GetUserActiveSubscriptionAsync(userId);
        if (currentSubscription?.Plan == null)
        {
            return new List<SubscriptionPlan>();
        }

        var currentLevel = currentSubscription.Plan.Level;
        return await DbContext.SubscriptionPlans
            .Where(x => x.IsActive && x.Level > currentLevel)
            .OrderBy(x => x.Level)
            .ToListAsync();
    }

    /// <summary>
    /// 取消升级
    /// </summary>
    /// <param name="upgradeId">升级记录ID</param>
    /// <param name="reason">取消原因</param>
    /// <returns>是否成功</returns>
    public async Task<bool> CancelUpgradeAsync(string upgradeId, string reason)
    {
        var upgradeRecord = await DbContext.SubscriptionUpgrades
            .FirstOrDefaultAsync(x => x.Id == upgradeId && x.Status == UpgradeStatus.Pending);

        if (upgradeRecord == null)
        {
            return false;
        }

        upgradeRecord.MarkCancelled(reason);
        DbContext.SubscriptionUpgrades.Update(upgradeRecord);
        await DbContext.SaveChangesAsync();

        return true;
    }

    /// <summary>
    /// 计算套餐剩余价值
    /// </summary>
    /// <param name="subscription">当前订阅</param>
    /// <returns>剩余价值</returns>
    private static decimal CalculateRemainingValue(UserSubscription subscription)
    {
        if (subscription.Plan == null)
            return 0;

        var totalDays = subscription.Plan.GetValidityDays();
        var remainingDays = Math.Max(0, (subscription.EndDate - DateTime.Now).TotalDays);

        if (totalDays <= 0 || remainingDays <= 0)
            return 0;

        // 按天折算：剩余价值 = 套餐价格 * (剩余天数 / 总天数)
        var dailyValue = subscription.Plan.Price / totalDays;
        var remainingValue = dailyValue * (decimal)remainingDays;

        return Math.Round(remainingValue, 2, MidpointRounding.AwayFromZero);
    }

    /// <summary>
    /// 获取周开始时间（周一）
    /// </summary>
    /// <param name="date"></param>
    /// <returns></returns>
    private static DateTime GetWeekStart(DateTime date)
    {
        var days = (int)date.DayOfWeek == 0 ? 6 : (int)date.DayOfWeek - 1;
        return date.Date.AddDays(-days);
    }
}

/// <summary>
/// 升级费用计算结果
/// </summary>
public class UpgradeCostCalculation
{
    /// <summary>
    /// 当前套餐
    /// </summary>
    public SubscriptionPlan CurrentPlan { get; set; } = null!;

    /// <summary>
    /// 目标套餐
    /// </summary>
    public SubscriptionPlan TargetPlan { get; set; } = null!;

    /// <summary>
    /// 当前订阅
    /// </summary>
    public UserSubscription CurrentSubscription { get; set; } = null!;

    /// <summary>
    /// 剩余天数
    /// </summary>
    public int RemainingDays { get; set; }

    /// <summary>
    /// 剩余价值
    /// </summary>
    public decimal RemainingValue { get; set; }

    /// <summary>
    /// 目标价格
    /// </summary>
    public decimal TargetPrice { get; set; }

    /// <summary>
    /// 实际需要支付的金额
    /// </summary>
    public decimal ActualPayAmount { get; set; }

    /// <summary>
    /// 优惠金额
    /// </summary>
    public decimal DiscountAmount { get; set; }

    /// <summary>
    /// 是否可以升级
    /// </summary>
    public bool CanUpgrade { get; set; }

    /// <summary>
    /// 节省百分比
    /// </summary>
    public decimal SavingsPercentage => TargetPrice > 0 ? Math.Round(DiscountAmount / TargetPrice * 100, 1) : 0;
}