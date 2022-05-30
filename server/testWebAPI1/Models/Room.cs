using System;
using System.Collections.Generic;

namespace testWebAPI1.Models
{
    public partial class Room
    {
        public Room()
        {
            Seances = new HashSet<Seance>();
        }

        public int RoomId { get; set; }
        public string? Intitule { get; set; }
        public int? FloorId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public virtual ICollection<Seance> Seances { get; set; }
    }
}
