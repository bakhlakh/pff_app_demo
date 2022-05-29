#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using testWebAPI1.Models;

namespace testWebAPI1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GroupesController : ControllerBase
    {
        private readonly PFFContext _context;

        public GroupesController(PFFContext context)
        {
            _context = context;
        }

        // GET: api/Groupes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Groupe>>> GetGroupes()
        {
            return await _context.Groupes.Include(gr=>gr.Stagiaires).Include(gr=>gr.Filiere).OrderByDescending(gr=>gr.AnneScolaire).ToListAsync();
        }

        // GET: api/Groupes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Groupe>> GetGroupe(string id)
        {
            var groupe = await _context.Groupes.FindAsync(id);

            if (groupe == null)
            {
                return NotFound();
            }

            return groupe;
        }

        // PUT: api/Groupes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroupe(string id, Groupe groupe)
        {
            if (id != groupe.AnneScolaire)
            {
                return BadRequest();
            }

            _context.Entry(groupe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Groupes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Groupe>> PostGroupe(Groupe groupe)
        {
            _context.Groupes.Add(groupe);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GroupeExists(groupe.AnneScolaire))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGroupe", new { id = groupe.AnneScolaire }, groupe);
        }

        // DELETE: api/Groupes/5
        [HttpDelete("{groupId}/{anneScolaire}")]
        public async Task<IActionResult> DeleteGroupe(string groupId,string anneScolaire)
        {
            var groupe = await _context.Groupes.FindAsync(groupId,anneScolaire);
            if (groupe == null)
            {
                return NotFound();
            }

            _context.Groupes.Remove(groupe);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("getFiliereGroupes/{filiereId}")]
        public async Task<ActionResult<IEnumerable<Groupe>>> GetFiliereGroupes(string filiereId)
        {
            var groupes = await 
                _context.Groupes.Where(gr => gr.FiliereId == filiereId).ToListAsync();
            return groupes;
        }
        [HttpGet]        
        private bool GroupeExists(string id)
        {
            return _context.Groupes.Any(e => e.AnneScolaire == id);
        }
    }
}
