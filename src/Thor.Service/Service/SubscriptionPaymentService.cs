using Aop.Api;
using Aop.Api.Request;
using Newtonsoft.Json;
using Thor.Infrastructure;
using Thor.Service.Domain.Core;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Thor.Service.Service;

/// <summary>
/// 套餐支付服务
/// </summary>
public class SubscriptionPaymentService(
    IServiceProvider serviceProvider,
    SubscriptionService subscriptionService,
    LoggerService loggerService)
    : ApplicationService(serviceProvider)
{
    /// <summary>
    /// 发起套餐支付
    /// </summary>
    /// <param name="purchaseRecordId">购买记录ID</param>
    /// <returns></returns>
    public async Task<StartPayPayloadResult> StartSubscriptionPaymentAsync(string purchaseRecordId)
    {
        var record = await DbContext.SubscriptionPurchaseRecords
            .Include(x => x.Plan)
            .FirstOrDefaultAsync(x => x.Id == purchaseRecordId);

        if (record?.Plan == null)
            throw new Exception("Purchase record does not exist");

        if (record.PaymentStatus != PaymentStatus.Pending)
            throw new Exception("Payment record is not in pending status");

#if DEBUG
        // 开发环境返回测试数据
        return new StartPayPayloadResult
        {
            Qr = "https://img.alicdn.com/imgextra/i3/2200751952050/O1CN01v2xX4R1j5c6k7a8gG_!!2200751952050-0-lubanu-s.jpg",
            Id = record.Id
        };
#endif

        // 获取支付宝回调地址
        var alipayNotifyUrl = SettingService.GetSetting(SettingExtensions.GeneralSetting.AlipayNotifyUrl);

        // 调用支付宝支付
        AlipayTradePrecreateRequest request = new();
        request.SetNotifyUrl(alipayNotifyUrl.TrimEnd('/') + "/api/v1/subscription/payment-callback");

        Dictionary<string, object> bizContent = new()
        {
            { "out_trade_no", record.Id },
            { "total_amount", record.Amount },
            { "subject", $"套餐购买 - {record.Plan.Name}" },
            { "body", $"用户购买套餐：{record.Plan.Name}，套餐类型：{GetSubscriptionTypeText(record.Plan.Type)}" }
        };

        var client = GetAopClient();
        request.BizContent = JsonConvert.SerializeObject(bizContent);
        var response = client.CertificateExecute(request);

        var body = JsonSerializer.Deserialize<AliPayResponseDto>(response.Body);

        return new StartPayPayloadResult
        {
            Qr = body?.alipay_trade_precreate_response.qr_code ?? "",
            Id = record.Id
        };
    }

    /// <summary>
    /// 发起套餐升级支付
    /// </summary>
    /// <param name="upgradeId">升级记录ID</param>
    /// <returns></returns>
    public async Task<StartPayPayloadResult> StartUpgradePaymentAsync(string upgradeId)
    {
        var upgradeRecord = await DbContext.SubscriptionUpgrades
            .Include(x => x.ToPlan)
            .FirstOrDefaultAsync(x => x.Id == upgradeId);

        if (upgradeRecord?.ToPlan == null)
            throw new Exception("Upgrade record does not exist");

        if (upgradeRecord.Status != UpgradeStatus.Pending)
            throw new Exception("Upgrade record is not in pending status");

        if (upgradeRecord.ActualPayAmount <= 0)
            throw new Exception("No payment required for this upgrade");

        // 创建支付记录
        var paymentRecord = SubscriptionPurchaseRecord.Create(
            upgradeRecord.UserId,
            upgradeRecord.ToPlanId,
            upgradeRecord.ActualPayAmount,
            "alipay");

        paymentRecord.Remarks = $"套餐升级支付，升级记录ID：{upgradeId}";

        DbContext.SubscriptionPurchaseRecords.Add(paymentRecord);
        await DbContext.SaveChangesAsync();

#if DEBUG
        // 开发环境返回测试数据
        return new StartPayPayloadResult
        {
            Qr = "https://img.alicdn.com/imgextra/i3/2200751952050/O1CN01v2xX4R1j5c6k7a8gG_!!2200751952050-0-lubanu-s.jpg",
            Id = paymentRecord.Id
        };
#endif

        // 获取支付宝回调地址
        var alipayNotifyUrl = SettingService.GetSetting(SettingExtensions.GeneralSetting.AlipayNotifyUrl);

        // 调用支付宝支付
        AlipayTradePrecreateRequest request = new();
        request.SetNotifyUrl(alipayNotifyUrl.TrimEnd('/') + "/api/v1/subscription/upgrade-payment-callback");

        Dictionary<string, object> bizContent = new()
        {
            { "out_trade_no", paymentRecord.Id },
            { "total_amount", upgradeRecord.ActualPayAmount },
            { "subject", $"套餐升级 - {upgradeRecord.ToPlan.Name}" },
            { "body", $"套餐升级支付，原价：${upgradeRecord.TargetPrice:F2}，优惠：${upgradeRecord.RemainingValue:F2}，实付：${upgradeRecord.ActualPayAmount:F2}" }
        };

        var client = GetAopClient();
        request.BizContent = JsonConvert.SerializeObject(bizContent);
        var response = client.CertificateExecute(request);

        var body = JsonSerializer.Deserialize<AliPayResponseDto>(response.Body);

        return new StartPayPayloadResult
        {
            Qr = body?.alipay_trade_precreate_response.qr_code ?? "",
            Id = paymentRecord.Id
        };
    }

    /// <summary>
    /// 处理套餐升级支付成功回调
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public async Task HandleUpgradePaymentCallbackAsync(HttpContext context)
    {
        var form = context.Request.Form;
        Dictionary<string, string> dictionary = new();
        var keys = form.Keys;

        if (keys != null)
        {
            foreach (var key in keys)
                dictionary.Add(key, form[key]);
        }

        var logger = GetService<ILogger<SubscriptionPaymentService>>();
        logger.LogWarning("套餐升级支付成功回调：{Data}", JsonSerializer.Serialize(dictionary));

        if (keys.Count == 0)
        {
            logger.LogWarning("套餐升级支付成功回调参数为空");
            return;
        }

        if (dictionary.TryGetValue("trade_status", out var tradeStatus) && tradeStatus == "TRADE_SUCCESS")
        {
            var outTradeNo = dictionary["out_trade_no"];
            var tradeNo = dictionary.GetValueOrDefault("trade_no", "");

            var paymentRecord = await DbContext.SubscriptionPurchaseRecords
                .FirstOrDefaultAsync(x => x.Id == outTradeNo && x.PaymentStatus == PaymentStatus.Pending);

            if (paymentRecord == null)
            {
                logger.LogWarning("套餐升级支付成功回调订单不存在或已处理：{Data}", JsonSerializer.Serialize(dictionary));
                return;
            }

            try
            {
                // 查找对应的升级记录
                var upgradeRecord = await DbContext.SubscriptionUpgrades
                    .FirstOrDefaultAsync(x => x.UserId == paymentRecord.UserId
                                            && x.ToPlanId == paymentRecord.PlanId
                                            && x.Status == UpgradeStatus.Pending
                                            && x.ActualPayAmount == paymentRecord.Amount);

                if (upgradeRecord == null)
                {
                    logger.LogError("找不到对应的升级记录，支付记录ID：{PaymentId}", paymentRecord.Id);
                    return;
                }

                // 标记支付记录为已支付
                paymentRecord.MarkPaid(tradeNo, DateTime.UtcNow, DateTime.UtcNow.AddDays(30)); // 临时的有效期
                DbContext.SubscriptionPurchaseRecords.Update(paymentRecord);

                // 执行升级
                var upgradeService = GetService<SubscriptionUpgradeService>();
                var success = await upgradeService.ExecuteUpgradeAsync(upgradeRecord.Id, paymentRecord.Id);

                if (success)
                {
                    logger.LogInformation("套餐升级支付成功，用户：{UserId}，升级记录：{UpgradeId}，支付记录：{PaymentId}",
                        paymentRecord.UserId, upgradeRecord.Id, paymentRecord.Id);
                }
                else
                {
                    logger.LogError("套餐升级执行失败，升级记录：{UpgradeId}", upgradeRecord.Id);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "处理套餐升级支付回调时发生错误，支付记录：{PaymentId}", paymentRecord.Id);
            }
        }
        else
        {
            logger.LogWarning("套餐升级支付回调交易状态不是TRADE_SUCCESS：{Data}", JsonSerializer.Serialize(dictionary));
        }
    }

    /// <summary>
    /// 处理套餐支付成功回调
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public async Task HandleSubscriptionPaymentCallbackAsync(HttpContext context)
    {
        var form = context.Request.Form;
        Dictionary<string, string> dictionary = new();
        var keys = form.Keys;

        if (keys != null)
        {
            foreach (var key in keys)
                dictionary.Add(key, form[key]);
        }

        var logger = GetService<ILogger<SubscriptionPaymentService>>();
        logger.LogWarning("套餐支付成功回调：{Data}", JsonSerializer.Serialize(dictionary));

        if (keys.Count == 0)
        {
            logger.LogWarning("套餐支付成功回调参数为空");
            return;
        }

        if (dictionary.TryGetValue("trade_status", out var tradeStatus) && tradeStatus == "TRADE_SUCCESS")
        {
            var outTradeNo = dictionary["out_trade_no"];
            var tradeNo = dictionary.GetValueOrDefault("trade_no", "");

            var record = await DbContext.SubscriptionPurchaseRecords
                .Include(x => x.Plan)
                .FirstOrDefaultAsync(x => x.Id == outTradeNo && x.PaymentStatus == PaymentStatus.Pending);

            if (record?.Plan == null)
            {
                logger.LogWarning("套餐支付成功回调订单不存在或已处理：{Data}", JsonSerializer.Serialize(dictionary));
                return;
            }

            try
            {
                // 激活套餐订阅
                var success = await subscriptionService.ActivateSubscriptionAsync(record.Id, tradeNo);

                if (success)
                {
                    logger.LogInformation("套餐支付成功，用户：{UserId}，套餐：{PlanName}，订单：{OrderId}",
                        record.UserId, record.Plan.Name, record.Id);
                }
                else
                {
                    logger.LogError("套餐激活失败，订单：{OrderId}", record.Id);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "处理套餐支付回调时发生错误，订单：{OrderId}", record.Id);
            }
        }
        else
        {
            logger.LogWarning("套餐支付回调交易状态不是TRADE_SUCCESS：{Data}", JsonSerializer.Serialize(dictionary));
        }
    }

    /// <summary>
    /// 查询支付状态
    /// </summary>
    /// <param name="purchaseRecordId"></param>
    /// <returns></returns>
    public async Task<PaymentQueryResult> QueryPaymentStatusAsync(string purchaseRecordId)
    {
        var record = await DbContext.SubscriptionPurchaseRecords
            .Include(x => x.Plan)
            .FirstOrDefaultAsync(x => x.Id == purchaseRecordId);

        if (record == null)
        {
            return new PaymentQueryResult
            {
                Status = PaymentStatus.Failed,
                Message = "购买记录不存在"
            };
        }

        return new PaymentQueryResult
        {
            Status = record.PaymentStatus,
            Message = GetPaymentStatusMessage(record.PaymentStatus),
            PurchaseRecord = record
        };
    }

    /// <summary>
    /// 取消支付
    /// </summary>
    /// <param name="purchaseRecordId"></param>
    /// <param name="reason"></param>
    /// <returns></returns>
    public async Task<bool> CancelPaymentAsync(string purchaseRecordId, string? reason = null)
    {
        var record = await DbContext.SubscriptionPurchaseRecords
            .FirstOrDefaultAsync(x => x.Id == purchaseRecordId);

        if (record == null || record.PaymentStatus != PaymentStatus.Pending)
            return false;

        record.MarkCancelled(reason);
        DbContext.SubscriptionPurchaseRecords.Update(record);
        await DbContext.SaveChangesAsync();

        return true;
    }

    /// <summary>
    /// 获取支付宝客户端
    /// </summary>
    /// <returns></returns>
    private IAopClient GetAopClient()
    {
        var appid = SettingService.GetSetting(SettingExtensions.GeneralSetting.AlipayAppId);
        var privateKey = SettingService.GetSetting(SettingExtensions.GeneralSetting.AlipayPrivateKey);
        var publicKey = SettingService.GetSetting(SettingExtensions.GeneralSetting.AlipayPublicKey);
        var appCertPath = SettingService.GetSetting(SettingExtensions.GeneralSetting.AlipayAppCertPath);
        var rootCertPath = SettingService.GetSetting(SettingExtensions.GeneralSetting.AlipayRootCertPath);
        var alipayPublicCertPath = SettingService.GetSetting(SettingExtensions.GeneralSetting.AlipayPublicCertPath);

        var config = new AlipayConfig
        {
            ServerUrl = "https://openapi.alipay.com/gateway.do",
            AppId = appid,
            PrivateKey = privateKey,
            Format = "json",
            Charset = "utf-8",
            AlipayPublicKey = publicKey,
            SignType = "RSA2",
            AppCertPath = appCertPath,
            RootCertPath = rootCertPath,
            AlipayPublicCertPath = alipayPublicCertPath
        };

        return new DefaultAopClient(config);
    }

    /// <summary>
    /// 获取套餐类型文本
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
    private static string GetSubscriptionTypeText(SubscriptionType type)
    {
        return type switch
        {
            SubscriptionType.Monthly => "包月",
            SubscriptionType.Yearly => "包年",
            _ => "未知"
        };
    }

    /// <summary>
    /// 获取支付状态消息
    /// </summary>
    /// <param name="status"></param>
    /// <returns></returns>
    private static string GetPaymentStatusMessage(PaymentStatus status)
    {
        return status switch
        {
            PaymentStatus.Pending => "等待支付",
            PaymentStatus.Paid => "支付成功",
            PaymentStatus.Failed => "支付失败",
            PaymentStatus.Cancelled => "支付已取消",
            PaymentStatus.Refunded => "已退款",
            _ => "未知状态"
        };
    }
}

/// <summary>
/// 支付查询结果
/// </summary>
public class PaymentQueryResult
{
    public PaymentStatus Status { get; set; }
    public string Message { get; set; } = null!;
    public SubscriptionPurchaseRecord? PurchaseRecord { get; set; }
}

/// <summary>
/// 支付宝响应DTO（从ProductService复制）
/// </summary>
public class AliPayResponseDto
{
    public AlipayTradePrecreateResponseData alipay_trade_precreate_response { get; set; } = null!;
}

public class AlipayTradePrecreateResponseData
{
    public string qr_code { get; set; } = null!;
    public string out_trade_no { get; set; } = null!;
}

/// <summary>
/// 开始支付结果（从ProductService复制）
/// </summary>
public class StartPayPayloadResult
{
    public string Qr { get; set; } = null!;
    public string Id { get; set; } = null!;
}