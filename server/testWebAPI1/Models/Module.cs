using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Module
    {
        public Module()
        {
            FiliereModules = new HashSet<FiliereModule>();
            Seances = new HashSet<Seance>();
            Teachings = new HashSet<Teaching>();
        }

        public string ModuleId { get; set; } = null!;
        public string? Intitule { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public virtual ICollection<FiliereModule> FiliereModules { get; set; }
        public virtual ICollection<Seance> Seances { get; set; }
        public virtual ICollection<Teaching> Teachings { get; set; }
    }
}
