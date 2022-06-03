using Microsoft.AspNetCore.Mvc;

namespace testWebAPI1.Services
{
    public class filiereServices
    {
        public filiereServices()
        {
        }

        public static async Task<ActionResult<IEnumerable<Filiere>>> GetFilieres(PFFContext _context)
        {
            PFFContext context = _context;
            return await context.Filieres.Include(fl => fl.FiliereModules).ThenInclude(fl => fl.Module).ToListAsync();
        }
        public static async Task<ActionResult<Filiere?>> GetFiliere(string id, PFFContext _context)
        {
                  PFFContext context = _context;

        var filiere = await context.Filieres.FindAsync(id);
            return filiere;
        }
        public static async Task<ActionResult<Filiere?>> GetModulesFiliere(string id, PFFContext _context)
        {
                  PFFContext context = _context;

                var filiere = await context.Filieres
                .Include(fl => fl.FiliereModules)
                .ThenInclude(fm => fm.Module)
                .Where(fl => fl.FiliereId == id)
                .ToListAsync();

            return filiere.FirstOrDefault();
        }
        public static async Task<DBResponseModel> PutFiliere(string id, Filiere filiere, PFFContext _context)
        {
                  PFFContext context = _context;

if (id != filiere.FiliereId)
            {
                return new DBResponseModel(false, "Bad Request");
            }
            filiere.UpdatedAt = DateTime.Now;
            context.Entry(filiere).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FiliereExists(id, _context))
                {
                    return new DBResponseModel(false, "Conflict");
                }
                else
                {
                    throw;
                }
            }
            var filieres = await context.Filieres.ToListAsync();
            return new DBResponseModel(true, "Sucess",filieres,200);
        }
        public static async Task<ActionResult<object>?> PostFiliere(Filiere filiere, PFFContext _context)
        {
                  PFFContext context = _context;

            context.Filieres.Add(filiere);
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FiliereExists(filiere.FiliereId,_context))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return filiere;
        }
        public static async Task<ActionResult<Filiere?>> DeleteFiliere(string id, PFFContext _context)
        {
                  PFFContext context = _context;

var filiere = await context.Filieres.FindAsync(id);
            if (filiere != null)
            {
                context.Filieres.Remove(filiere);
                await context.SaveChangesAsync();
            }
            return filiere;
        }
        public static async Task<ActionResult<Filiere?>> ForceDeleteFiliere(string id, PFFContext _context)
        {
            PFFContext context = _context;

            var filiere = await context.Filieres.FindAsync(id);
            if (filiere != null)
            {
                var groupes =await context.Groupes.Where(g => g.FiliereId == id).ToListAsync();
                for (int i = 0; i < groupes.Count; i++)
                {
                    var stagiaires = await context.Stagiaires.Where(st => st.GroupId == groupes[i].GroupId).ToListAsync();
                    for (int j = 0; j < stagiaires.Count; j++)
                    {
                        stagiaires[j].Groupe = null;
                        stagiaires[j].GroupId = null;
                    }
                    var seances = await context.Seances.Where(s => s.GroupId == groupes[i].GroupId).ToListAsync();
                    for (int j = 0; j < seances.Count; j++)
                    {
                        context.Seances.Remove(seances[j]);
                    }
                    context.Groupes.Remove(groupes[i]);
                }
                context.FiliereModules.Where(fm => fm.FiliereId == id).ToList().ForEach(fm => context.FiliereModules.Remove(fm));
                context.Filieres.Remove(filiere);

                await context.SaveChangesAsync();
            }
            return filiere;
        }
        public static async Task<DBResponseModel> GetNonIncludedModules(string filiereId, PFFContext _context) 
        {
            PFFContext context = _context;
            var modules = await context.Modules.Where(m => !context.FiliereModules.Any(fm => fm.FiliereId == filiereId && fm.ModuleId == m.ModuleId)).ToListAsync();
            return new DBResponseModel(true, "Sucess", modules, 200);
        }
        public static bool FiliereExists(string id, PFFContext _context)
        {
                  PFFContext context = _context;

return context.Filieres.Any(e => e.FiliereId == id);
        }
    }
}
