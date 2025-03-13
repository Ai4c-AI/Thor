namespace Thor.Service.Dto;

public class UpdateUserInput
{
    public string Id { get; set ;}

    public string Email { get; set; } = null!;

    /// <summary>
    /// Groups
    /// </summary>
    public string[] Groups { get; set; } = [];
}