using System.Text.Json.Serialization;

namespace Thor.Abstractions.Midjourney;

public class SubmitBlendInput
{
    [JsonPropertyName("botType")]
    public string? BotType { get; set; }
    
    [JsonPropertyName("base64Array")]
    public string[] Base64Array { get; set; } =[];
    
    [JsonPropertyName("dimensions")]
    public string? Dimensions { get; set; }

    [JsonPropertyName("quality")]
    public string? Quality { get; set; }
    
    [JsonPropertyName("notifyHook")]
    public string? NotifyHook { get; set; }
    
    [JsonPropertyName("state")]
    public string? State { get; set; }
}

