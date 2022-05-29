using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Filiere
    {
        public Filiere()
        {
            FiliereModules = new HashSet<FiliereModule>();
            Groupes = new HashSet<Groupe>();
        }

        public string FiliereId { get; set; } = null!;
        public string? NomFiliere { get; set; }
        public string? Description { get; set; }
        public string? TypeDiplome { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public virtual ICollection<FiliereModule> FiliereModules { get; set; }
        public virtual ICollection<Groupe> Groupes { get; set; }
    }
}
