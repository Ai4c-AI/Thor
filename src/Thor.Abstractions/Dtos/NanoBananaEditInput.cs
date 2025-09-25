using System.Text.Json.Serialization;

namespace Thor.Abstractions.Dtos;

public class NanoBananaEditInput
{
    [JsonPropertyName("prompt")] public string Prompt { get; set; }

    [JsonPropertyName("image_urls")] public string[] ImageUrls { get; set; }

    [JsonPropertyName("num_images")] public int NumImages { get; set; }
}