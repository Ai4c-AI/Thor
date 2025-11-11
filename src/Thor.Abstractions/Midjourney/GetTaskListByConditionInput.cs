using System.Text.Json.Serialization;

namespace Thor.Abstractions.Midjourney;

public class GetTaskListByConditionInput
{
    [JsonPropertyName("ids")]
    public string[] Ids { get; set; } = [];
}