using System.Text.Json.Serialization;

namespace Thor.Abstractions.Midjourney;

public class SubmitImagineInput
{
    [JsonPropertyName("base64Array")] public string[] Base64Array { get; set; } = [];

    [JsonPropertyName("notifyHook")] public string? NotifyHook { get; set; }

    [JsonPropertyName("prompt")] public string? Prompt { get; set; }

    [JsonPropertyName("state")] public string? State { get; set; }

    [JsonPropertyName("botType")] public string? BotType { get; set; }
}