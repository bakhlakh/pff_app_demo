using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Groupe
    {
        public Groupe()
        {
            Seances = new HashSet<Seance>();
            Stagiaires = new HashSet<Stagiaire>();
            Teachings = new HashSet<Teaching>();
        }

        public string AnneScolaire { get; set; } = null!;
        public string GroupId { get; set; } = null!;
        public string? FiliereId { get; set; }
        public int? Niveau { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public virtual Filiere? Filiere { get; set; }
        public virtual ICollection<Seance> Seances { get; set; }
        public virtual ICollection<Stagiaire> Stagiaires { get; set; }
        public virtual ICollection<Teaching> Teachings { get; set; }
    }
}
