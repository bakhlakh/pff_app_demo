using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Absence
    {
        public int AbsenceId { get; set; }
        public int SeanceId { get; set; }
        public int StagiaireId { get; set; }
        public string Justified { get; set; } = null!;
        public string? AdditionalInfo { get; set; }

        public virtual Seance Seance { get; set; } = null!;
        public virtual Stagiaire Stagiaire { get; set; } = null!;
    }
}
