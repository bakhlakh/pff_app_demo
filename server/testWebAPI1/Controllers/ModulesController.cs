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
    public class ModulesController : ControllerBase
    {

        // GET: api/Modules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Module>>> GetModules()
        {
            DBResponseModel res = await moduleServices.GetModules();
            if (res.Success)
            {
                return Ok(res.data);
            }
            else
            {
                return BadRequest(res.Message);
            }
        }

        // GET: api/Modules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Module>> GetModule(string id)
        {
            var res = await moduleServices.GetModule(id);

            if (!res.Success)
            {
                return NotFound(res.Message);
            }

            return Ok(res.data);
        }
        [HttpGet("GetXModulesFiliere/{id}")]
        public async Task<ActionResult<IEnumerable<Module>>> GetXModulesFiliere(string id)
        {
            var res = await moduleServices.GetXModulesFiliere(id);
            if (!res.Success)
            {
                return NotFound();
            }

            return Ok(res.data);
        }
        [HttpGet("GetModulesInFiliere/{id}")]
        public async Task<ActionResult<IEnumerable<object>>> GetModulesInFiliere(string id)
        {
            var res = await moduleServices.GetModulesInFiliere(id);
            if (!res.Success)
            {
                return BadRequest(res.Message);
            }
            return Ok(res.data);
        }
        // PUT: api/Modules/5
        // To protect from overposting attacks
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModule(string id, Module @module)
        {
            var res = await moduleServices.PutModule(id, @module);
            if (!res.Success)
            {
                return BadRequest(res.Message);
            }
            return Ok(res.data);
        }

        // POST: api/Modules
        // To protect from overposting attacks
        [HttpPost]
        public async Task<ActionResult<Module>> PostModule(Module @module)
        {
            var res = await moduleServices.PostModule(@module);
            if (!res.Success)
            {
                return Conflict(res.Message);
            }
            return CreatedAtAction("GetModule", new { id = @module.ModuleId }, @module);
        }

        // DELETE: api/Modules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModule(string id)
        {
            var res = await moduleServices.DeleteModule(id);
            if (!res.Success)
            {
                return NotFound(res.Message);
            }

            return Ok(res.data);
        }
        [HttpDelete("FD/{id}")]
        public async Task<IActionResult> ForceDeleteModule(string id)
        {
            var res = await moduleServices.ForceDeleteModule(id);
            if (!res.Success)
            {
                if (res.statusCode == 500) return Conflict(res.Message);
                else return BadRequest(res.Message); 
            }
            return Ok(res.data);
        }
    }
}
