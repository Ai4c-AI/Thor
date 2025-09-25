using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Thor.Abstractions.Dtos;

namespace Thor.Abstractions.Extensions;

public static class HttpClientExtensions
{
    private static readonly MediaTypeHeaderValue JsonMediaType =
        new("application/json") { CharSet = "utf-8" };

    private static async ValueTask<HttpContent> CreateJsonContentAsync(object value)
    {
        var ms = new MemoryStream(16 * 1024); // 预分配减少扩容
        await JsonSerializer.SerializeAsync(ms, value, value.GetType(), ThorJsonSerializer.DefaultOptions)
            .ConfigureAwait(false);
        ms.Position = 0;

        var content = new StreamContent(ms);
        content.Headers.ContentType = JsonMediaType;
        return content;
    }

    public static async Task<HttpResponseMessage> HttpRequestRaw<T>(this HttpClient httpClient, string url,
        T? postData,
        string token) where T : class
    {
        var req = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = await CreateJsonContentAsync(postData).ConfigureAwait(false)
        };

        if (!string.IsNullOrEmpty(token))
        {
            req.Headers.Add("Authorization", $"Bearer {token}");
        }

        var response = await httpClient.SendAsync(req, HttpCompletionOption.ResponseHeadersRead);

        return response;
    }

    public static async Task<HttpResponseMessage> HttpRequestRaw<T>(this HttpClient httpClient, string url,
        T? postData,
        string token, string tokenKey) where T : class
    {
        var req = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = await CreateJsonContentAsync(postData).ConfigureAwait(false)
        };

        if (!string.IsNullOrEmpty(token))
        {
            req.Headers.Add(tokenKey, token);
        }


        var response = await httpClient.SendAsync(req, HttpCompletionOption.ResponseHeadersRead);

        return response;
    }

    public static async Task<HttpResponseMessage> HttpRequestRaw<T>(this HttpClient httpClient, string url,
        T? postData,
        string token, Dictionary<string, string> headers) where T : class
    {
        var req = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = await CreateJsonContentAsync(postData).ConfigureAwait(false)
        };

        if (!string.IsNullOrEmpty(token))
        {
            req.Headers.Add("Authorization", $"Bearer {token}");
        }

        foreach (var header in headers)
        {
            req.Headers.Add(header.Key, header.Value);
        }


        var response = await httpClient.SendAsync(req, HttpCompletionOption.ResponseHeadersRead);

        return response;
    }

    public static async Task<HttpResponseMessage> PostJsonAsync<T>(this HttpClient httpClient, string url,
        T? postData,
        string token) where T : class
    {
        var req = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = await CreateJsonContentAsync(postData).ConfigureAwait(false)
        };

        if (!string.IsNullOrEmpty(token))
        {
            req.Headers.Add("Authorization", $"Bearer {token}");
        }

        return await httpClient.SendAsync(req);
    }

    public static async Task<HttpResponseMessage> PostJsonAsync<T>(this HttpClient httpClient, string url,
        T? postData,
        string token, Dictionary<string, string> headers) where T : class
    {
        HttpRequestMessage req = new(HttpMethod.Post, url);

        if (postData != null)
        {
            if (postData is HttpContent data)
            {
                req.Content = data;
            }
            else
            {
                string jsonContent = JsonSerializer.Serialize(postData, ThorJsonSerializer.DefaultOptions);
                var stringContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                req.Content = stringContent;
            }
        }

        if (!string.IsNullOrEmpty(token))
        {
            req.Headers.Add("Authorization", $"Bearer {token}");
        }

        foreach (var header in headers)
        {
            req.Headers.Add(header.Key, header.Value);
        }

        return await httpClient.SendAsync(req);
    }

    public static Task<HttpResponseMessage> PostJsonAsync<T>(this HttpClient httpClient, string url, T? postData,
        string token, string tokenKey) where T : class
    {
        HttpRequestMessage req = new(HttpMethod.Post, url);

        if (postData != null)
        {
            if (postData is HttpContent data)
            {
                req.Content = data;
            }
            else
            {
                string jsonContent = JsonSerializer.Serialize(postData, ThorJsonSerializer.DefaultOptions);
                var stringContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                req.Content = stringContent;
            }
        }

        if (!string.IsNullOrEmpty(token))
        {
            req.Headers.Add(tokenKey, token);
        }

        return httpClient.SendAsync(req);
    }


    public static async Task<TResponse> PostFileAndReadAsAsync<TResponse>(this HttpClient client, string uri,
        HttpContent content, CancellationToken cancellationToken = default) where TResponse : ThorBaseResponse, new()
    {
        var response = await client.PostAsync(uri, content, cancellationToken);
        return await HandleResponseContent<TResponse>(response, cancellationToken);
    }

    private static async Task<TResponse> HandleResponseContent<TResponse>(this HttpResponseMessage response,
        CancellationToken cancellationToken) where TResponse : ThorBaseResponse, new()
    {
        TResponse result;

        if (!response.Content.Headers.ContentType?.MediaType?.Equals("application/json",
                StringComparison.OrdinalIgnoreCase) ?? true)
        {
            result = new()
            {
                Error = new()
                {
                    MessageObject = await response.Content.ReadAsStringAsync(cancellationToken)
                }
            };
        }
        else
        {
            result = await response.Content.ReadFromJsonAsync<TResponse>(cancellationToken: cancellationToken) ??
                     throw new InvalidOperationException();
        }

        return result;
    }
}