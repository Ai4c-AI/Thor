namespace Thor.Abstractions.Anthropic;

public interface IAnthropicChatCompletionsService
{
    /// <summary>
    /// 非流式对话补全
    /// </summary>
    /// <param name="request">对话补全请求参数对象</param>
    /// <param name="options">平台参数对象</param>
    /// <param name="cancellationToken">取消令牌</param>
    /// <returns></returns>
    Task<AnthropicChatCompletionDto> ChatCompletionsAsync(AnthropicInput request,
        ThorPlatformOptions? options = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// 流式对话补全
    /// </summary>
    /// <param name="request">对话补全请求参数对象</param>
    /// <param name="options">平台参数对象</param>
    /// <param name="cancellationToken">取消令牌</param>
    /// <returns></returns>
    IAsyncEnumerable<(string, AnthropicStreamDto?)> StreamChatCompletionsAsync(AnthropicInput request,
        ThorPlatformOptions? options = null,
        CancellationToken cancellationToken = default);
}