namespace Thor.Abstractions.Midjourney;

public class CreateMidjourneyResultDto
{
    public int code { get; set; }
    public string description { get; set; }
    public object properties { get; set; }
    public string result { get; set; }
}

