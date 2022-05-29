using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class FiliereModule
    {
        public string ModuleId { get; set; } = null!;
        public string FiliereId { get; set; } = null!;
        public int? MassHorraire { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public virtual Filiere Filiere { get; set; } = null!;
        public virtual Module Module { get; set; } = null!;
    }
}
