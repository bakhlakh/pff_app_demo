using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Stagiaire
    {
        public int StagiaireId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string? AnneScolaire { get; set; }
        public string? GroupId { get; set; }
        public string Email { get; set; } = null!;
        public string Cin { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string Address { get; set; } = null!;
        public string Nationalite { get; set; } = null!;
        public string Statue { get; set; } = null!;
        public string? PhotoUri { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public virtual Groupe? Groupe { get; set; }
    }
}
