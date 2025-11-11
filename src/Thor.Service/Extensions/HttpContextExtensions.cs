using Azure;
using System.Text;
using System.Text.Json;
using Thor.Abstractions.Chats.Dtos;
using Thor.Abstractions.Dtos;
using Thor.Service.Infrastructure;
using Thor.Service.Infrastructure.Middlewares;

namespace Thor.Service.Extensions;

public static class HttpContextExtensions
{
    /// <summary>
    /// 设置响应为 text/event-stream 相关的头
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public static void SetEventStreamHeaders(this HttpContext context)
    {
        context.Response.ContentType = "text/event-stream;charset=utf-8;";
        context.Response.Headers.TryAdd("Cache-Control", "no-cache");
        context.Response.Headers.TryAdd("Connection", "keep-alive");
    }

    public static string GetContentType(string extension)
    {
        return extension switch
        {
            ".html" => "text/html",
            ".htm" => "text/html",
            ".css" => "text/css",
            ".js" => "application/javascript",
            ".json" => "application/json",
            ".png" => "image/png",
            ".jpg" => "image/jpeg",
            ".jpeg" => "image/jpeg",
            ".gif" => "image/gif",
            ".svg" => "image/svg+xml",
            ".ico" => "image/x-icon",
            ".mp4" => "video/mp4",
            ".webm" => "video/webm",
            ".ogg" => "video/ogg",
            ".mp3" => "audio/mp3",
            ".wav" => "audio/wav",
            ".webp" => "image/webp",
            ".woff" => "font/woff",
            ".woff2" => "font/woff2",
            ".ttf" => "font/ttf",
            ".eot" => "font/eot",
            ".otf" => "font/otf",
            ".pdf" => "application/pdf",
            ".zip" => "application/zip",
            ".rar" => "application/x-rar-compressed",
            ".7z" => "application/x-7z-compressed",
            ".txt" => "text/plain",
            ".csv" => "text/csv",
            ".xml" => "text/xml",
            ".doc" => "application/msword",
            ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".xls" => "application/vnd.ms-excel",
            ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ".ppt" => "application/vnd.ms-powerpoint",
            ".pptx" => "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            _ => "application/octet-stream"
        };
    }

    private static readonly byte[] EventPrefix = "event: "u8.ToArray();
    private static readonly byte[] DataPrefix = "data: "u8.ToArray();
    private static readonly byte[] NewLine = "\n"u8.ToArray();
    private static readonly byte[] DoubleNewLine = "\n\n"u8.ToArray();

    /// <summary>
    ///     使用 JsonSerializer.SerializeAsync 直接序列化到响应流
    /// </summary>
    public static async ValueTask WriteAsEventStreamDataAsync<T>(
        this HttpContext context,
        string @event,
        T value,
        CancellationToken cancellationToken = default)
        where T : class
    {
        var response = context.Response;
        var bodyStream = response.Body;
        // 确保 SSE Header 已经设置好
        // e.g. Content-Type: text/event-stream; charset=utf-8
        await response.StartAsync(cancellationToken).ConfigureAwait(false);
        // 写事件类型
        await bodyStream.WriteAsync(EventPrefix, cancellationToken).ConfigureAwait(false);
        await WriteUtf8StringAsync(bodyStream, @event.Trim(), cancellationToken).ConfigureAwait(false);
        await bodyStream.WriteAsync(NewLine, cancellationToken).ConfigureAwait(false);
        // 写 data: + JSON
        await bodyStream.WriteAsync(DataPrefix, cancellationToken).ConfigureAwait(false);
        await JsonSerializer.SerializeAsync(
            bodyStream,
            value,
            ThorJsonSerializer.DefaultOptions,
            cancellationToken
        ).ConfigureAwait(false);
        // 事件结束 \n\n
        await bodyStream.WriteAsync(DoubleNewLine, cancellationToken).ConfigureAwait(false);
        // 及时把数据发送给客户端
        await bodyStream.FlushAsync(cancellationToken).ConfigureAwait(false);
    }

    private static async ValueTask WriteUtf8StringAsync(Stream stream, string value, CancellationToken token)
    {
        if (string.IsNullOrEmpty(value))
            return;
        var buffer = Encoding.UTF8.GetBytes(value);
        await stream.WriteAsync(buffer, token).ConfigureAwait(false);
    }

    /// <summary>
    /// 往响应内容写入事件流数据,调用前需要先调用 <see cref="SetEventStreamHeaders"/>
    /// </summary>
    /// <param name="context"></param>
    /// <param name="value"></param>
    /// <returns></returns>
    public static async ValueTask WriteAsEventStreamDataAsync<T>(this HttpContext context, T value)
    {
        var response = context.Response;
        var bodyStream = response.Body;
        await response.StartAsync().ConfigureAwait(false);
        // 写 data: + JSON
        await bodyStream.WriteAsync(DataPrefix).ConfigureAwait(false);
        await JsonSerializer.SerializeAsync(
            bodyStream,
            value,
            ThorJsonSerializer.DefaultOptions
        ).ConfigureAwait(false);
        // 事件结束 \n\n
        await bodyStream.WriteAsync(DoubleNewLine).ConfigureAwait(false);
        // 及时把数据发送给客户端
        await bodyStream.FlushAsync().ConfigureAwait(false);
    }

    /// <summary>
    /// 往响应内容写入事件流结束数据
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public static async ValueTask WriteAsEventStreamEndAsync(this HttpContext context)
    {
        var endData = "data: [DONE]\n\n";

        await context.Response.WriteAsync(endData);
        await context.Response.Body.FlushAsync();
    }

    public static async ValueTask WriteErrorAsync(this HttpContext context, string message)
    {
        var assistantMessage = ThorChatMessage.CreateAssistantMessage(message);
        var error = new ThorChatCompletionsResponse
        {
            Choices = new List<ThorChatChoiceResponse>()
            {
                new()
                {
                    Message = assistantMessage,
                    Delta = assistantMessage,
                    FinishReason = "error",
                    FinishDetails = new()
                    {
                        Type = "error",
                        Stop = "error",
                    },
                    Index = 0
                }
            }
        };

        await context.Response.WriteAsJsonAsync(error);
    }

    public static async ValueTask WriteOpenAIErrorAsync(this HttpContext context, string message, string code = "500")
    {
        var error = new ThorChatCompletionsResponse
        {
            Error = new ThorError()
            {
                Type = "error",
                Code = "openai_error " + code,
                MessageObject = message
            }
        };

        await context.Response.WriteAsJsonAsync(error);
    }


    public static async ValueTask WriteErrorAsync(this HttpContext context, string message, string code)
    {
        var error = new ThorChatCompletionsResponse
        {
            Error = new ThorError()
            {
                MessageObject = message,
                Code = code
            }
        };
        await context.Response.WriteAsJsonAsync(error, ThorJsonSerializer.DefaultOptions);
    }

    /// <summary>
    /// 获取IP地址
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public static string GetIpAddress(this HttpContext context)
    {
        var address = context.Connection.RemoteIpAddress;
        // 获取具体IP地址，不包括:ffff:，可能是IPv6
        if (address?.IsIPv4MappedToIPv6 == true)
        {
            address = address.MapToIPv4();
        }
        else if (address?.IsIPv6SiteLocal == true)
        {
            address = address.MapToIPv4();
        }
        else if (address?.IsIPv6Teredo == true)
        {
            address = address.MapToIPv4();
        }
        else if (address?.IsIPv6Multicast == true)
        {
            address = address.MapToIPv6();
        }
        else if (address?.IsIPv6UniqueLocal == true)
        {
            address = address.MapToIPv6();
        }
        else if (address?.IsIPv6LinkLocal == true)
        {
            address = address.MapToIPv6();
        }
        else
        {
            address = address?.MapToIPv4();
        }

        var ip = address?.ToString();

        if (context.Request.Headers.TryGetValue("X-Forwarded-For", out var ips) && !string.IsNullOrWhiteSpace(ips))
        {
            ip = ips.ToString();
        }

        return ip;
    }

    /// <summary>
    /// 获取userAgent
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public static string GetUserAgent(this HttpContext context)
    {
        // 获取UserAgent，提取有用信息
        var userAgent = context.Request.Headers.UserAgent.FirstOrDefault();

        // 提取有用信息
        if (userAgent != null)
        {
            var index = userAgent.IndexOf('(');
            if (index > 0)
            {
                userAgent = userAgent[..index];
            }
            else
            {
                userAgent = userAgent switch
                {
                    not null when userAgent.Contains("Windows") => "Windows",
                    not null when userAgent.Contains("Mac") => "Mac",
                    not null when userAgent.Contains("Linux") => "Linux",
                    not null when userAgent.Contains("Android") => "Android",
                    not null when userAgent.Contains("iPhone") => "iPhone",
                    not null when userAgent.Contains("iPad") => "iPad",
                    not null when userAgent.Contains("Semantic-Kernel") => "Semantic-Kernel",
                    not null when userAgent.Contains("OpenAI") => "OpenAI",
                    not null when userAgent.Contains("MakingPlatform") => "MakingPlatform",
                    _ => userAgent
                };
            }
        }

        return userAgent ?? "未知";
    }
}