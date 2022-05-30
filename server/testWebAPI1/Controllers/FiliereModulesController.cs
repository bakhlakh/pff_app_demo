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
    [Route("/api/[Controller]")]
    [ApiController]
    public class FiliereModulesController : ControllerBase
    {
        private readonly PFFContext _context;

        public FiliereModulesController(PFFContext context)
        {
            _context = context;
        }

        // GET: api/FiliereModules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FiliereModule>>> GetFiliereModules()
        {
            return await _context.FiliereModules.ToListAsync();
        }

        // GET: api/FiliereModules/5
        [HttpGet("{FiliereId}/{ModuleId}")]
        public async Task<ActionResult<FiliereModule>> GetFiliereModule(string FiliereId,string ModuleId)
        {
            var filiereModule = await _context.FiliereModules.FindAsync(ModuleId,FiliereId);

            if (filiereModule == null)
            {
                return NotFound();
            }

            return filiereModule;
        }

        // PUT: api/FiliereModules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{FiliereId}/{ModuleId}")]
        public async Task<IActionResult> PutFiliereModule(string FiliereId, string ModuleId,editedFMIN filiereModule)
        {
            if (ModuleId != filiereModule._ModuleId || FiliereId !=filiereModule._FiliereId)
            {
                return BadRequest(filiereModule);
            }

            FiliereModule nf = await _context.FiliereModules
            .Where(fd=>fd.FiliereId==FiliereId && fd.ModuleId==ModuleId).FirstOrDefaultAsync();
            nf.MassHorraire = filiereModule._MassHorraire;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FiliereModuleExists(FiliereId,ModuleId))
                {
                    return Ok(filiereModule);
                }
                else
                {
                    throw;
                }
            }

            return  Ok(filiereModule);
        }

        // POST: api/FiliereModules
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FiliereModule>> PostFiliereModule(editedFMIN filiereModule)
        {
            FiliereModule nf = new FiliereModule();
            nf.ModuleId = filiereModule._ModuleId;
            nf.FiliereId = filiereModule._FiliereId;
            nf.MassHorraire = filiereModule._MassHorraire;
            _context.FiliereModules.Add(nf);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FiliereModuleExists(filiereModule._FiliereId,filiereModule._ModuleId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFiliereModule", routeValues: new { ModuleId = filiereModule._ModuleId,FiliereId=filiereModule._FiliereId }, value: filiereModule);
        }

        // DELETE: api/FiliereModules/5
        [HttpDelete("{FiliereId}/{ModuleId}")]
        public async Task<IActionResult> DeleteFiliereModule(string FiliereId, string ModuleId)
        {
            var filiereModule = await _context.FiliereModules.FindAsync(ModuleId,FiliereId);
            if (filiereModule == null)
            {
                return NotFound();
            }

            _context.FiliereModules.Remove(filiereModule);
            await _context.SaveChangesAsync();
            var newModules = await _context.FiliereModules.Where(fm=>fm.FiliereId==FiliereId).Include(fm=>fm.Module).Select(fm=>new {fm.Module}).ToListAsync();
            return Ok(newModules);
        }

        private bool FiliereModuleExists(string FiliereId, string ModuleId)
        {
            return _context.FiliereModules.Any(e => (e.ModuleId == ModuleId)&&(e.FiliereId==FiliereId));
        }
    }
}
