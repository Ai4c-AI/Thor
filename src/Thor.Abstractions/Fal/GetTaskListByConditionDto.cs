namespace Thor.Abstractions.Fal;

public class GetTaskListByConditionDto
{
    public string id { get; set; }
    
    public string action { get; set; }
    
    public string customId { get; set; }
    
    public string botType { get; set; }
    
    public string prompt { get; set; }
    
    public string promptEn { get; set; }
    
    public string description { get; set; }
    
    public string state { get; set; }
    
    public long submitTime { get; set; }
    
    public long startTime { get; set; }
    
    public long finishTime { get; set; }
    
    public string imageUrl { get; set; }
    
    public string videoUrl { get; set; }
    
    public object videoUrls { get; set; }
    
    public string status { get; set; }
    
    public string progress { get; set; }
    
    public string failReason { get; set; }
    
    public Buttons[] buttons { get; set; }
    
    public string maskBase64 { get; set; }

    public Properties properties { get; set; }
}

public class Buttons
{
    public string customId { get; set; }
    public string emoji { get; set; }
    public string label { get; set; }
    public int type { get; set; }
    public int style { get; set; }
}

public class Properties
{
    public string finalPrompt { get; set; }
    public string finalZhPrompt { get; set; }
}

