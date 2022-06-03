#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using testWebAPI1.Models;
using testWebAPI1.Services;

namespace testWebAPI1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FilieresController : ControllerBase
    {
        private readonly PFFContext _context;
        private readonly JWTSettings _JWTSettings;

        public FilieresController(PFFContext context, IOptions<JWTSettings> JWTSettings)
        {
            _context = context;
            _JWTSettings = JWTSettings.Value;
        }


        // GET: api/Filieres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Filiere>>> GetFilieres()
        {
            return await filiereServices.GetFilieres(_context);
        }
        
        // GET: api/Filieres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Filiere>> GetFiliere(string id)
        {
            var filiere = await filiereServices.GetFiliere(id, _context);

            if (filiere == null)
            {
                return NotFound();
            }

            return filiere;
        }
        [HttpGet("GetModulesFiliere/{id}")]
        public async Task<ActionResult<Filiere>> GetModulesFiliere(string id)
        {
            var filiere = await filiereServices.GetModulesFiliere(id, _context);

            if (filiere == null)
            {
                return NotFound();
            }

            return filiere;
        }
        [HttpGet("GetNonIncludedModules/{id}")]
        public async Task<ActionResult<IEnumerable<Module>>> GetNonIncludedModules(string id)
        {
            var res = await filiereServices.GetNonIncludedModules(id, _context);
            

            return Ok(res.data);
        }
        // PUT: api/Filieres/5
        // To protect from overposting attacks
        [HttpPut("{id}")]
        public async Task<ActionResult> PutFiliere(string id, Filiere filiere)
        {
            if (id != filiere.FiliereId)
            {
                return BadRequest();
            }

            var res = await filiereServices.PutFiliere(id, filiere, _context);
            
            if (!res.Success)
            {
                return Conflict(res.Message);
            }

            return Ok(res.data);
        }

        // POST: api/Filieres
        // To protect from overposting attacks
        [HttpPost]
        public async Task<ActionResult<Filiere>> PostFiliere(Filiere filiere)
        {
            var response = await filiereServices.PostFiliere(filiere, _context);
            if (response==null)
            {
                return Conflict();
            }

            return CreatedAtAction("GetFiliere", new { id = filiere.FiliereId }, filiere);
        }

        // DELETE: api/Filieres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFiliere(string id)
        {
            var filiere = await filiereServices.DeleteFiliere(id, _context);
            if (filiere == null) return NotFound();
            return NoContent();
        }
        [HttpDelete("ForceDeleteFiliere/{id}")]
        public async Task<ActionResult<IEnumerable<Filiere>>> ForceDeleteFiliere(string id)
        {
            var filiere = await filiereServices.ForceDeleteFiliere(id, _context);
            if (filiere == null) return NotFound();
            return await filiereServices.GetFilieres(_context);
        }
    }
}
