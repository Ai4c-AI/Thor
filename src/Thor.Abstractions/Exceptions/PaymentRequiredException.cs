namespace Thor.Abstractions.Exceptions;

public sealed class PaymentRequiredException : Exception
{
    public PaymentRequiredException() : base("Payment required")
    {
    }

    public PaymentRequiredException(string message) : base(message)
    {
    }

    public PaymentRequiredException(string message, Exception innerException) : base(message, innerException)
    {
    }
}