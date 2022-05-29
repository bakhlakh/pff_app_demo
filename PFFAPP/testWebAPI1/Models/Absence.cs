using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Absence
    {
        public int AbsenceId { get; set; }
        public string? SeanceId { get; set; }
        public int? StagiaireId { get; set; }
        public string Justifier { get; set; } = null!;
        public double Duration { get; set; }
        public string? AdditionalInfo { get; set; }

        public virtual Seance? Seance { get; set; }
        public virtual Stagiaire? Stagiaire { get; set; }
    }
}
