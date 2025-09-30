using Thor.Domain.Chats;
using Thor.Service.Infrastructure;

namespace Thor.Service.Service;

public abstract class AIService(IServiceProvider serviceProvider, ImageService imageService)
    : ApplicationService(serviceProvider)
{
    /// <summary>
    ///  按量计费标准模板 - Token级计费
    ///  计费公式：总费用 = (输入Token数 × 模型倍率 + 输出Token数 × 模型倍率 × 补全倍率) × 分组倍率
    /// </summary>
    protected const string ConsumerTemplate = "【Token计费】模型输入倍率：{0} | 输出补全倍率：{1} | 渠道分组倍率：{2} | 算法：(输入tokens×{0} + 输出tokens×{0}×{1})×{2}";


    /// <summary>
    ///  图像生成按量计费模板
    ///  计费公式：总费用 = 图像生成基础价格 × 尺寸倍率 × 分组倍率
    /// </summary>
    protected const string ConsumerImageTemplate = "【图像计费】模型基础倍率：{0} | 渠道分组倍率：{1} | 算法：基础价格×{0}×{1}";

    /// <summary>
    /// 按量计费缓存命中优化模板 - Prompt Caching命中场景
    /// 计费公式：总费用 = (普通输入tokens×模型倍率 + 缓存命中tokens×模型倍率×缓存折扣倍率) + 输出tokens×模型倍率×补全倍率) × 分组倍率
    /// 缓存命中折扣倍率由模型配置动态决定
    /// </summary>
    protected const string ConsumerTemplateCache = "【缓存命中优化】模型输入倍率：{0} | 输出补全倍率：{1} | 渠道分组倍率：{2} | 缓存命中tokens：{3} | 缓存折扣倍率：{4}(节省{5}%成本) | 算法：(普通输入tokens×{0} + 缓存命中{3}×{0}×{4} + 输出tokens×{0}×{1})×{2}";

    /// <summary>
    /// 按量计费缓存写入场景模板 - Prompt Caching创建和命中混合场景
    /// 计费公式：总费用 = (普通输入tokens×模型倍率 + 缓存写入tokens×模型倍率×缓存创建倍率 + 缓存命中tokens×模型倍率×缓存折扣倍率 + 输出tokens×模型倍率×补全倍率) × 分组倍率
    /// 缓存写入和命中倍率由模型配置动态决定
    /// </summary>
    protected const string ConsumerTemplateCacheWriteTokens =
        "【缓存创建+命中】模型输入倍率：{0} | 输出补全倍率：{1} | 渠道分组倍率：{2} | 缓存命中tokens：{3} | 缓存折扣倍率：{4}(节省{6}%) | 缓存写入tokens：{5} | 缓存写入倍率：{7}(创建成本+{8}%) | 算法：(普通输入×{0} + 写入缓存{5}×{0}×{7} + 命中缓存{3}×{0}×{4} + 输出×{0}×{1})×{2}";

    /// <summary>
    /// 按次计费固定费用模板 - 单次调用固定价格
    /// 适用于固定定价的API调用，不按Token量计费
    /// </summary>
    protected const string ConsumerTemplateOnDemand = "【按次计费】单次调用固定费用：{0} | 渠道分组倍率：{1} | 算法：固定费用{0}×{1}";

    /// <summary>
    /// 实时对话多模态计费模板 - Realtime API混合媒体计费
    /// 计费公式：总费用 = (文本输入tokens×文本提示倍率 + 文本输出tokens×文本完成倍率 + 音频输入tokens×音频请求倍率 + 音频输出tokens×音频完成倍率) × 分组倍率
    /// 支持文本、音频多模态同时计费
    /// </summary>
    protected const string RealtimeConsumerTemplate =
        "【实时多模态计费】文本输入倍率：{0} | 文本输出倍率：{1} | 音频输入倍率：{2} | 音频输出倍率：{3} | 渠道分组倍率：{4} | 算法：(文本输入×{0} + 文本输出×{1} + 音频输入×{2} + 音频输出×{3})×{4}";


    protected static readonly Dictionary<string, Dictionary<string, double>> ImageSizeRatios = new()
    {
        {
            "dall-e-2", new Dictionary<string, double>
            {
                { "256x256", 1 },
                { "512x512", 1.125 },
                { "1024x1024", 1.25 }
            }
        },
        {
            "dall-e-3", new Dictionary<string, double>
            {
                { "1024x1024", 1 },
                { "1024x1792", 2 },
                { "1792x1024", 2 }
            }
        },
        {
            "ali-stable-diffusion-xl", new Dictionary<string, double>
            {
                { "512x1024", 1 },
                { "1024x768", 1 },
                { "1024x1024", 1 },
                { "576x1024", 1 },
                { "1024x576", 1 }
            }
        },
        {
            "ali-stable-diffusion-v1.5", new Dictionary<string, double>
            {
                { "512x1024", 1 },
                { "1024x768", 1 },
                { "1024x1024", 1 },
                { "576x1024", 1 },
                { "1024x576", 1 }
            }
        },
        {
            "wanx-v1", new Dictionary<string, double>
            {
                { "1024x1024", 1 },
                { "720x1280", 1 },
                { "1280x720", 1 }
            }
        }
    };


    /// <summary>
    /// 权重算法
    /// </summary>
    /// <param name="channel"></param>
    /// <returns></returns>
    protected static ChatChannel? CalculateWeight(IEnumerable<ChatChannel> channel)
    {
        var chatChannels = channel.ToList();
        if (chatChannels.Count == 0)
        {
            return null;
        }

        // 所有权重值之和
        var total = chatChannels.Sum(x => x.Order);

        var value = Convert.ToInt32(Random.Shared.NextDouble() * total);

        foreach (var chatChannel in chatChannels)
        {
            value -= chatChannel.Order;
            if (value > 0) continue;

            ChannelAsyncLocal.ChannelIds.Add(chatChannel.Id);
            return chatChannel;
        }

        var v = chatChannels.Last();

        ChannelAsyncLocal.ChannelIds.Add(v.Id);

        return v;
    }

    /// <summary>
    ///     对话模型补全倍率
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    protected decimal GetCompletionRatio(string name)
    {
        if (ModelManagerService.PromptRate?.TryGetValue(name, out var ratio) == true)
            return (decimal)(ratio.CompletionRate ?? 0);

        if (name.StartsWith("gpt-3.5"))
        {
            if (name == "gpt-3.5-turbo" || name.EndsWith("0125")) return 3;

            if (name.EndsWith("1106")) return 2;

            return (decimal)(4.0 / 3.0);
        }

        if (name.StartsWith("gpt-4")) return name.StartsWith("gpt-4-turbo") ? 3 : 2;

        if (name.StartsWith("claude-")) return name.StartsWith("claude-3") ? 5 : 3;

        if (name.StartsWith("mistral-") || name.StartsWith("gemini-")) return 3;

        return name switch
        {
            "llama2-70b-4096" => new decimal(0.8 / 0.7),
            _ => 1
        };
    }


    /// <summary>
    /// 计算图片token
    /// </summary>
    /// <param name="url"></param>
    /// <param name="detail"></param>
    /// <returns></returns>
    protected Tuple<int, Exception> CountImageTokens(ReadOnlyMemory<byte> url, string detail)
    {
        var fetchSize = true;
        int width = 0, height = 0;
        var lowDetailCost = 20; // Assuming lowDetailCost is 20
        var highDetailCostPerTile = 100; // Assuming highDetailCostPerTile is 100
        var additionalCost = 50; // Assuming additionalCost is 50

        if (string.IsNullOrEmpty(detail) || detail == "auto") detail = "high";

        switch (detail)
        {
            case "low":
                return new Tuple<int, Exception>(lowDetailCost, null);
            case "high":
                if (fetchSize)
                    try
                    {
                        (width, height) = imageService.GetImageSizeFromUrlAsync(url);
                    }
                    catch (Exception e)
                    {
                        return new Tuple<int, Exception>(0, e);
                    }

                if (width > 2048 || height > 2048)
                {
                    var ratio = 2048.0 / Math.Max(width, height);
                    width = (int)(width * ratio);
                    height = (int)(height * ratio);
                }

                if (width > 768 && height > 768)
                {
                    var ratio = 768.0 / Math.Min(width, height);
                    width = (int)(width * ratio);
                    height = (int)(height * ratio);
                }

                var numSquares = (int)Math.Ceiling((double)width / 512) * (int)Math.Ceiling((double)height / 512);
                var result = numSquares * highDetailCostPerTile + additionalCost;
                return new Tuple<int, Exception>(result, null);
            default:
                return new Tuple<int, Exception>(0, new Exception("Invalid detail option"));
        }
    }

    /// <summary>
    /// 计算图片token
    /// </summary>
    /// <param name="url"></param>
    /// <param name="detail"></param>
    /// <returns></returns>
    protected async ValueTask<Tuple<int, Exception>> CountImageTokens(string url, string detail)
    {
        var fetchSize = true;
        int width = 0, height = 0;
        var lowDetailCost = 20; // Assuming lowDetailCost is 20
        var highDetailCostPerTile = 100; // Assuming highDetailCostPerTile is 100
        var additionalCost = 50; // Assuming additionalCost is 50

        if (string.IsNullOrEmpty(detail) || detail == "auto") detail = "high";

        switch (detail)
        {
            case "low":
                return new Tuple<int, Exception>(lowDetailCost, null);
            case "high":
                if (fetchSize)
                    try
                    {
                        (width, height) = await imageService.GetImageSize(url);
                    }
                    catch (Exception e)
                    {
                        return new Tuple<int, Exception>(0, e);
                    }

                if (width > 2048 || height > 2048)
                {
                    var ratio = 2048.0 / Math.Max(width, height);
                    width = (int)(width * ratio);
                    height = (int)(height * ratio);
                }

                if (width > 768 && height > 768)
                {
                    var ratio = 768.0 / Math.Min(width, height);
                    width = (int)(width * ratio);
                    height = (int)(height * ratio);
                }

                var numSquares = (int)Math.Ceiling((double)width / 512) * (int)Math.Ceiling((double)height / 512);
                var result = numSquares * highDetailCostPerTile + additionalCost;
                return new Tuple<int, Exception>(result, null);
            default:
                return new Tuple<int, Exception>(0, new Exception("Invalid detail option"));
        }
    }
}