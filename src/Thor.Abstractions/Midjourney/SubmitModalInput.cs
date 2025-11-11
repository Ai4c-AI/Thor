using System.Text.Json.Serialization;

namespace Thor.Abstractions.Midjourney;

public class SubmitModalInput
{
    [JsonPropertyName("maskBase64")]
    public string? MaskBase64 { get; set; }
    
    [JsonPropertyName("prompt")]
    public string? Prompt { get; set; }
    
    [JsonPropertyName("taskId")]
    public string? TaskId { get; set; }
}

