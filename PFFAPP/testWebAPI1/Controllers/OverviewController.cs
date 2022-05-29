using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace testWebAPI1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OverviewController : ControllerBase
    {
    private readonly PFFContext _context;

        public OverviewController(PFFContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Filiere>>> GetFilieres()
        {
            var filieres = await _context.Filieres.ToListAsync();
            var modules = await _context.Modules.ToListAsync();
            var stagiaires = await _context.Stagiaires.ToListAsync();
            var groupes = await _context.Groupes.ToListAsync();

            return Ok(
                new
                {
                    filieres=filieres.Count,
                    modules = modules.Count,
                    stagiaires = stagiaires.Count,
                    groupes = groupes.Count
                }
                    );
            
        }
    }
}
