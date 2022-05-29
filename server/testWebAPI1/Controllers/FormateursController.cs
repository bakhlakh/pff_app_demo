#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using testWebAPI1.Models;

namespace testWebAPI1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormateursController : ControllerBase
    {
        private readonly PFFContext _context;

        public FormateursController(PFFContext context)
        {
            _context = context;
        }

        // GET: api/Formateurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Formateur>>> GetFormateurs()
        {
            return await _context.Formateurs.ToListAsync();
        }

        // GET: api/Formateurs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Formateur>> GetFormateur(int id)
        {
            var formateur = await _context.Formateurs.FindAsync(id);

            if (formateur == null)
            {
                return NotFound();
            }

            return formateur;
        }

        // PUT: api/Formateurs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormateur(int id, Formateur formateur)
        {
            if (id != formateur.FormateurId)
            {
                return BadRequest();
            }

            _context.Entry(formateur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormateurExists(id))
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

        // POST: api/Formateurs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Formateur>> PostFormateur(Formateur formateur)
        {
            _context.Formateurs.Add(formateur);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FormateurExists(formateur.FormateurId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFormateur", new { id = formateur.FormateurId }, formateur);
        }

        // DELETE: api/Formateurs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormateur(int id)
        {
            var formateur = await _context.Formateurs.FindAsync(id);
            if (formateur == null)
            {
                return NotFound();
            }

            _context.Formateurs.Remove(formateur);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FormateurExists(int id)
        {
            return _context.Formateurs.Any(e => e.FormateurId == id);
        }
    }
}
