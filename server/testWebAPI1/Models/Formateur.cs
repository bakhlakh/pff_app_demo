using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Formateur
    {
        public Formateur()
        {
            Seances = new HashSet<Seance>();
            Teachings = new HashSet<Teaching>();
        }

        public int FormateurId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string Cin { get; set; } = null!;
        public string Nationalite { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public virtual ICollection<Seance> Seances { get; set; }
        public virtual ICollection<Teaching> Teachings { get; set; }
    }
}
