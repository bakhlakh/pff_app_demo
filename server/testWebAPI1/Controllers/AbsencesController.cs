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
    public class AbsencesController : ControllerBase
    {
        private readonly PFFContext _context;
        private readonly JWTSettings _JWTSettings;

        public AbsencesController(PFFContext context, IOptions<JWTSettings> JWTSettings)
        {
            _context = context;
            _JWTSettings = JWTSettings.Value;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Filiere>>> GetAbsencesPerSeance(int seanceId)
        {
            var res = await AbsenceServices.GetAbsencesPerSeance(seanceId, _context);
            return Ok(res.data);
        }
        [HttpPost]
        public async Task<IActionResult> PostAbsencesPerSeance(int seanceId, List<int> stagiaireIds)
        {
            var res = await AbsenceServices.PostAbsencesPerSeance(seanceId,stagiaireIds, _context);
            if (res.Success)
            {
                return NoContent();
            }
            return BadRequest(res.Message);
        }
    }
}
