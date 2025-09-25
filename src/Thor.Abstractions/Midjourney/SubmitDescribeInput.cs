using System.Text.Json.Serialization;

namespace Thor.Abstractions.Midjourney;

public class SubmitDescribeInput
{
    [JsonPropertyName("botType")] public string BotType { get; set; }

    [JsonPropertyName("base64")] public string Base64 { get; set; }

    [JsonPropertyName("notifyHook")] public int NotifyHook { get; set; }

    [JsonPropertyName("state")] public string State { get; set; }
}