namespace testWebAPI1.Services
{
    public class AbsenceServices
    {
        private static PFFContext? context;
        public static async Task<DBResponseModel> GetAbsencesPerSeance(int seanceId, PFFContext _context)
        {
            context = _context;
            var items = await context.Absences.Where(ab => ab.SeanceId == seanceId).Select(ab=>ab.StagiaireId).ToListAsync();
            return new DBResponseModel { data = items, Message = "", Success = true, statusCode = 200 };
        }
        public static async Task<DBResponseModel> PostAbsencesPerSeance(int seanceId, List<int> stagiaireIds, PFFContext _context)
        {
            context = _context;
            var abs = await context.Absences.Where(ab => ab.SeanceId == seanceId).ToListAsync();
            for (int i = 0; i < abs.Count; i++)
            {
                context.Absences.Remove(abs[i]);
            }
            try
            {
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return (new DBResponseModel(false, "Failed to save to database, check your inputs"));
            }
            for (int i = 0; i < stagiaireIds.Count; i++)
            { 
                context.Absences.Add(
                    new Absence { SeanceId = seanceId, StagiaireId = stagiaireIds[i] }
                    );
            }
            try
            {
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return (new DBResponseModel(false, "Failed to save to database, check your inputs"));
            }
            return (new DBResponseModel(true, "changes saved"));
        }
    }
}
