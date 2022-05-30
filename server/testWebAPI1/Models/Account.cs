using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Account
    {
        public Account()
        {
            Users = new HashSet<User>();
        }

        public int AccountId { get; set; }
        public string AccountName { get; set; } = null!;
        public int Level { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? LastAccessed { get; set; }
        public string? AccountState { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
