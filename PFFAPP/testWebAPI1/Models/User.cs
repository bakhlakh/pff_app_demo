using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class User
    {
        public string UserName { get; set; } = null!;
        public string EmailAddress { get; set; } = null!;
        public byte[] UserPasswordHash { get; set; } = null!;
        public byte[] UserPasswordSalt { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime CreationDate { get; set; }
        public int Level { get; set; }
        public DateTime LastAccessed { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }
    }
}
