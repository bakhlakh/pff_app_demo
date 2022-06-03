#nullable disable
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using testWebAPI1.Models;
using testWebAPI1.Models.WSModels;

namespace testWebAPI1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeancesController : ControllerBase
    {
        private readonly PFFContext _context;

        public SeancesController(PFFContext context)
        {
            _context = context;
        }

        // GET: api/Seances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seance>>> GetSeances()
        {
            return await _context.Seances.Include(sr=>sr.Formateur).Include(sr=>sr.Room).ToListAsync();
        }

        // GET: api/Seances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Seance>> GetSeance(int id)
        {
            var seance = await _context.Seances.FindAsync(id);

            if (seance == null)
            {
                return NotFound();
            }

            return seance;
        }

        // PUT: api/Seances/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeance(int id, Seance seance)
        {
            if (id != seance.SeanceId)
            {
                return BadRequest();
            }

            _context.Entry(seance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeanceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(seance);
        }

        // POST: api/Seances
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Seance>> PostSeance(Seance seance)
        {
            _context.Seances.Add(seance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSeance", new { id = seance.SeanceId }, seance);
        }

        // DELETE: api/Seances/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSeance(int id)
        {
            var seance = await _context.Seances.FindAsync(id);
            if (seance == null)
            {
                return NotFound();
            }

            _context.Seances.Remove(seance);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SeanceExists(int id)
        {
            return _context.Seances.Any(e => e.SeanceId == id);
        }
        [HttpGet("getWeekSeances")]
        public async Task<ActionResult<IEnumerable<WSModel>>> GetSeancesByDate(DateTime date,string groupId)
        {
            Calendar calendar = CultureInfo.InvariantCulture.Calendar;
            DateTime start = DateTimeExtensions.GetStartOfWeek(date, DayOfWeek.Sunday);
            var InfoQuery = await _context.Groupes.Where(gr => gr.GroupId == groupId).Select(gr => new { 
            gr,
            gr.Filiere
            }).FirstOrDefaultAsync();
            if (InfoQuery == null) return NotFound("Groupe n'existe pas");
            var emploiQuery = await _context.Seances.Where(s => s.DateSeance >=start && s.DateSeance <= start.AddDays(6) && s.GroupId==groupId)
                .Include(s => s.Formateur).Include(s => s.Room)
                .Select(s => 
                      new WSSeanceModel()
                      {
                          SeanceId = s.SeanceId,
                          DateSeance = s.DateSeance,
                          StartTime = s.StartTime,
                          Groupe = s.Groupe,
                          GroupId = s.GroupId,
                          Module = s.Module,
                          Room = s.Room,
                          RoomId = s.RoomId,
                          Formateur = s.Formateur,
                          FormateurId = s.FormateurId,
                          Day = s.DateSeance.DayOfWeek.ToString(),
                          Title = s.Title,
                          AnneScolaire = s.AnneScolaire,
                          Commentaires = s.Commentaires,
                          CreatedAt = s.CreatedAt,
                          DeletedAt = s.DeletedAt,
                          UpdatedAt = s.UpdatedAt,
                          ModuleId = s.ModuleId,
                          Objectives = s.Objectives
                      }
                  ).ToListAsync();
            string mh = emploiQuery.Count % 2 == 1 ? $"{Math.Floor(emploiQuery.Count * 2.5)}H30MIN" : $"{Math.Floor(emploiQuery.Count * 2.5)}H00MIN";
            WSModel res = new WSModel(new WSInfoModel(InfoQuery.gr, InfoQuery.Filiere),mh,emploiQuery, DateOnly.FromDateTime(start));
            return Ok(res);
        }
        [HttpGet("getFreeSeances")]
        public async Task<ActionResult<IEnumerable<object>>> GetFreeSeances(string date, string groupId)
        {
            var freeTime = new string []{ "08:30", "11:00", "13:30", "16:00" };
            DateTime dateParsed =  DateTime.Parse(date);
            var query =await _context.Seances.Where(sc => sc.DateSeance == dateParsed && sc.GroupId == groupId).ToListAsync();
            foreach (Seance item in query)
            {
                if (freeTime.Contains(item.StartTime))
                {
                    freeTime = freeTime.Where(s => s != item.StartTime).ToArray();
                }
            }
            return freeTime;
        }
        [HttpGet("GWSForAll")]
        public async Task<ActionResult<IEnumerable<object>>> GWSForAll(DateTime date) 
        {
            Calendar calendar = CultureInfo.InvariantCulture.Calendar;
            DateTime start = DateTimeExtensions.GetStartOfWeek(date, DayOfWeek.Sunday);
            List<WSModel> res = new List<WSModel>();
            var groupes = await _context.Groupes.Include(gr=>gr.Filiere).OrderBy(gr=>gr.Niveau).ToListAsync();
            for (int i = 0; i < groupes.Count-1; i++)
            {
                var InfoQuery = await _context.Groupes.Where(gr => gr.GroupId == groupes[i].GroupId).Select(gr => new {
                    gr,
                    gr.Filiere
                }).FirstOrDefaultAsync();
                var emploiQuery = await _context.Seances.Where(s => s.DateSeance >= start && s.DateSeance <= start.AddDays(6) && s.GroupId == InfoQuery.gr.GroupId)
               .Include(s => s.Formateur).Include(s => s.Room)
               .Select(s =>
                     new WSSeanceModel()
                     {
                         SeanceId = s.SeanceId,
                         DateSeance = s.DateSeance,
                         StartTime = s.StartTime,
                         Groupe = s.Groupe,
                         GroupId = s.GroupId,
                         Module = s.Module,
                         Room = s.Room,
                         RoomId = s.RoomId,
                         Formateur = s.Formateur,
                         FormateurId = s.FormateurId,
                         Day = s.DateSeance.DayOfWeek.ToString(),
                         Title = s.Title,
                         AnneScolaire = s.AnneScolaire,
                         Commentaires = s.Commentaires,
                         CreatedAt = s.CreatedAt,
                         DeletedAt = s.DeletedAt,
                         UpdatedAt = s.UpdatedAt,
                         ModuleId = s.ModuleId,
                         Objectives = s.Objectives
                     }
                 ).ToListAsync();
                string mh = emploiQuery.Count % 2 == 1 ? $"{Math.Floor(emploiQuery.Count * 2.5)}H30MIN" : $"{Math.Floor(emploiQuery.Count * 2.5)}H00MIN";
                WSModel SeanceModel = new WSModel(new WSInfoModel(InfoQuery.gr, InfoQuery.Filiere), mh, emploiQuery, DateOnly.FromDateTime(start));
                res.Add(SeanceModel);
            }
            return Ok(res);
        }
    }
}
