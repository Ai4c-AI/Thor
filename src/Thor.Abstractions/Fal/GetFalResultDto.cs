namespace Thor.Abstractions.Fal;

public class GetFalResultDto
{
    public Images[]? images { get; set; }
    
    public string description { get; set; }
    
    public string? status { get; set; }
    
    public string? request_id { get; set; }
    
    public object? submit_time { get; set; }
    
    public string? response_url { get; set; }
}



public class Images
{
    public string url { get; set; }
    
    public string file_name { get; set; }
    
    public object file_size { get; set; }
    
    public string content_type { get; set; }
}

