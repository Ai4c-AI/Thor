namespace Thor.Abstractions.Fal;

public class CreateFalResultDto
{
    public string status { get; set; }
    
    public string request_id { get; set; }
    
    public string response_url { get; set; }
    
    public string status_url { get; set; }
    
    public string cancel_url { get; set; }
    
    public object logs { get; set; }
 
    public object metrics { get; set; }
    
    public int queue_position { get; set; }
}