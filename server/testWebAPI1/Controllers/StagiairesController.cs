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
using testWebAPI1.Services;

namespace testWebAPI1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StagiairesController : ControllerBase
    {
        private readonly PFFContext _context;

        public StagiairesController(PFFContext context)
        {
            _context = context;
        }

        // GET: api/Stagiaires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stagiaire>>> GetStagiaires()
        {
            var res = await stagiareServices.GetStagiaires();
            if (!res.Success)
            {
                return Conflict(res.Message);
            }
            return Ok(res.data);
        }

        // GET: api/Stagiaires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Stagiaire>> GetStagiaire(string CIN)
        {
            var res = await stagiareServices.GetStagiaire(CIN);

            if (!res.Success || res.data == null)
            {
                return NotFound(res.Message);
            }

            return Ok(res.data);
        }

        // PUT: api/Stagiaires/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStagiaire(int id, Stagiaire stagiaire)
        {

            if (id != stagiaire.StagiaireId)
            {
                return BadRequest();
            }

            var res = await stagiareServices.PutStagiaire(id, stagiaire);
            if (!res.Success)
            {
                return Conflict(res.Message);
            }

            return Ok(res.data);
        }

        // POST: api/Stagiaires
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Stagiaire>> PostStagiaire(Stagiaire stagiaire)
        {
            var res = await stagiareServices.PostStagiaire(stagiaire);
            if (!res.Success)
            {
                return Conflict(res.Message);
            }
            return Ok(res.data);
        }

        // DELETE: api/Stagiaires/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStagiaire(int id)
        {
            var res = await stagiareServices.DeleteStagiaire(id);
            if (!res.Success)
            {
                return Conflict(res.Message);
            }
            return Ok(res.data);
        }
        [HttpGet("GetStagiairesByGroup")]
        public async Task<ActionResult<IEnumerable<Stagiaire>>> GetStagiairesByGroup(string groupId) 
        {
            var stagiaires = await _context.Stagiaires.Where(s => s.GroupId == groupId).ToListAsync();
            return Ok(stagiaires);
        }
        private bool StagiaireExists(int id)
        {
            return _context.Stagiaires.Any(e => e.StagiaireId == id);
        }
    }
}
