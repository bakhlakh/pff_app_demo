namespace testWebAPI1.Models
{
    public class UserDTO
    {
        public string UserName { get; set; } = null!;
        public string EmailAddress { get; set; } = null!;
        public string UserPassword { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public int Level { get; set; }
    }
}
