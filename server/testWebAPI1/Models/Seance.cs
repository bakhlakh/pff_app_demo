using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Seance
    {
        public Seance()
        {
            Absences = new HashSet<Absence>();
        }

        public int SeanceId { get; set; }
        public string Title { get; set; } = null!;
        public int? RoomId { get; set; }
        public string? ModuleId { get; set; }
        public string? Objectives { get; set; }
        public DateTime DateSeance { get; set; }
        public string StartTime { get; set; } = null!;
        public int? FormateurId { get; set; }
        public string? Commentaires { get; set; }
        public string? GroupId { get; set; }
        public string? AnneScolaire { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public virtual Formateur? Formateur { get; set; }
        public virtual Groupe? Groupe { get; set; }
        public virtual Module? Module { get; set; }
        public virtual Room? Room { get; set; }
        public virtual ICollection<Absence> Absences { get; set; }
    }
}
