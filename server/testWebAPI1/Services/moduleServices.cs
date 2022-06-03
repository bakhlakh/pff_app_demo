using Microsoft.AspNetCore.Mvc;

namespace testWebAPI1.Services
{
    public static class moduleServices
    {
        private static PFFContext? context;

        public static async Task<DBResponseModel> GetModules(PFFContext _context)
        {
            context = _context;
            var items = await context.Modules.Select(md => new { md.ModuleId, md.Intitule, md.Description }).ToListAsync();
            return new DBResponseModel{ data = items, Message = "", Success = true, statusCode = 200 };
        }
        public static async Task<DBResponseModel> GetModule(string id, PFFContext _context)
        {
            context = _context;

            var @module = await context.Modules.FindAsync(id);
            if (module==null)
            {
                return new DBResponseModel(true,"module not found",null,200);
            }
            return new DBResponseModel(true, "module found", module, 200);
        }
        public static async Task<DBResponseModel> GetXModulesFiliere(string id, PFFContext _context)
        {
            context = _context;

            var query =  from md in context.Modules
                        join fm in context.FiliereModules on md.ModuleId equals fm.ModuleId
                        where fm.FiliereId == id
                        select  md.ModuleId;

            var @module = await context.Modules
                .Where(md => !query.ToArray().Contains(md.ModuleId)).ToListAsync();

            return new DBResponseModel(true, "modules found", module, 200);
        }
        public static async Task<DBResponseModel> GetModulesInFiliere(string id, PFFContext _context)
        {
            context = _context;

            var query = await context.FiliereModules.Where(fm => fm.FiliereId == id)
                 .Include(fm => fm.Module)
                 .Select(fm => new { fm.Module,fm.MassHorraire }).ToListAsync();
            return new DBResponseModel(true, "modules found", query, 200);
        }

        public static async Task<DBResponseModel> PostModule(Module @module, PFFContext _context)
        {
            context = _context;
            
            context.Modules.Add(module);
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ModuleExists(module.ModuleId,context).Result)
                {
                    return new DBResponseModel(false, "Module already exists.");
                }
                else
                {
                    return new DBResponseModel(false, "An error occurred saving the module.");
                }
            }

            return new DBResponseModel(true, "Module saved successfully.",module,200);
        }
        public static async Task<DBResponseModel> PutModule(string id,Module @module, PFFContext _context)
        {
            context = _context;

            if (id != @module.ModuleId)
            {
                return new DBResponseModel(false, "Module ID does not match.");
            }
            module.UpdatedAt = DateTime.Now;
            context.Entry(module).State = EntityState.Modified;
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModuleExists(id,context).Result)
                {
                    return new DBResponseModel(false, "Module does not exist.");
                }
                else
                {
                    return new DBResponseModel(false, "An error occurred updating the module.");
                }
            }

            return new DBResponseModel(true, "Module updated successfully.", module, 200);
        }
        public static async Task<DBResponseModel> DeleteModule(string id, PFFContext _context)
        {
            context = _context;

            var @module = await context.Modules.FindAsync(id);
            if (@module == null)
            {
                return new DBResponseModel(false, "Module does not exist.");
            }

            context.Modules.Remove(@module);
            await context.SaveChangesAsync();
            var query =await context.Modules.ToListAsync();
            return new DBResponseModel(true, "Module deleted successfully.", query, 200);
        }
        public static async Task<DBResponseModel> ForceDeleteModule(string moduleId, PFFContext _context)
        {
            context = _context;

            var @module = await context.Modules.FindAsync(moduleId);
            if (@module == null)
            {
                return new DBResponseModel(false, "Module does not exist.");
            }

            try
            {
                var queryFiliereModule = await context.FiliereModules.Where(fd => fd.Module == @module).ToListAsync();
            foreach (var item in queryFiliereModule)
            {
                context.FiliereModules.Remove(item);
            }
            var querySeances = await context.Seances.Where(fd => fd.Module == @module).ToListAsync();
            foreach (var item in querySeances)
            {
                context.Seances.Remove(item);
            }
            var queryTeaching = await context.Teachings.Where(fd => fd.Module == @module).ToListAsync();
            foreach (var item in queryTeaching)
            {
                context.Teachings.Remove(item);
            }
                context.Modules.Remove(@module);
                context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return new DBResponseModel(false, "An error occurred deleting the module.",null,500);
            }
            var queryModules = await context.Modules.ToListAsync();
            return new DBResponseModel(true, "Module deleted successfully.",queryModules,200);
        }
        private  static  async Task<bool> ModuleExists(string id, PFFContext _context)
        {
            context = _context;

            return await context.Modules.AnyAsync(e => e.ModuleId == id);
        }
    }
}