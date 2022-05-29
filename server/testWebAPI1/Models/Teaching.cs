using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Teaching
    {
        public string GroupId { get; set; } = null!;
        public string AnneScolaire { get; set; } = null!;
        public int FormateurId { get; set; }
        public string ModuleId { get; set; } = null!;

        public virtual Formateur Formateur { get; set; } = null!;
        public virtual Groupe Groupe { get; set; } = null!;
        public virtual Module Module { get; set; } = null!;
    }
}
