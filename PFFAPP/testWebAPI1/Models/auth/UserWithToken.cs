namespace testWebAPI1.Models
{
    public class UserWithToken
    {
        public string Token { get; set; } = null!;
        public User user { get; set; } = null!;
    }
}
