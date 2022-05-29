namespace testWebAPI1.Services
{
    public static class stagiareServices

    {
        private static PFFContext context;
        public static async Task<DBResponseModel> GetStagiaires()
        {
            context = new PFFContext();

            var items = await context.Stagiaires.ToListAsync();
            return new DBResponseModel { data = items, Message = "", Success = true, statusCode = 200 };
        }
        public static async Task<DBResponseModel> GetStagiaire(string CNE)
        {
            context = new PFFContext();

            var stagiaire = await context.Stagiaires.Where(st => st.Cin == CNE).FirstOrDefaultAsync();
            if (stagiaire == null)
            {
                return new DBResponseModel(true, "stagiaire not found", null, 200);
            }
            return new DBResponseModel(true, "stagiaire found", stagiaire, 200);
        }
        public static async Task<DBResponseModel> PutStagiaire(int id,Stagiaire stagiaire)
        {
            context = new PFFContext();
            try
            {
                stagiaire.UpdatedAt = DateTime.Now;
                context.Entry(stagiaire).State = EntityState.Modified;
            
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StagiaireExists(stagiaire.StagiaireId).Result)
                {
                    return new DBResponseModel(false, "stagiaire does not exist.");
                }
                else
                {
                    return new DBResponseModel(false, "An error occurred updating the stagiaire.");
                }
            }
            var stagiaires = await context.Stagiaires.ToListAsync();
            return new DBResponseModel(true, "stagiaire updated successfully.", stagiaires, 200);
        }
        public static async Task<DBResponseModel> PostStagiaire(Stagiaire stagiaire)
        {
            context = new PFFContext();

            context.Stagiaires.Add(stagiaire);
            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StagiaireExists(stagiaire.StagiaireId).Result)
                {
                    return new DBResponseModel(false, "stagiaire already exists.");
                }
                else
                {
                    return new DBResponseModel(false, "An error occurred saving the stagiaire.");
                }
            }
            var stagiaires = await context.Stagiaires.ToListAsync();
            return new DBResponseModel(true, "Module saved successfully.", stagiaires, 200);
        }
        public static async Task<DBResponseModel> DeleteStagiaire(int id)
        {
            context = new PFFContext();

            var stagiaire = await context.Stagiaires.FindAsync(id);
            if (stagiaire == null)
            {
                return new DBResponseModel(true, "stagiaire not found.", null, 200);
            }
            try
            {
                context.Stagiaires.Remove(stagiaire);
                await context.SaveChangesAsync();
                var stagiaires = await context.Stagiaires.ToListAsync();
            return new DBResponseModel(true, "stagiaire deleted successfully.", stagiaires, 200);
            }
            catch (DbUpdateException)
            {
                return new DBResponseModel(false, "An error occurred in the database.");
            }
        }
        public static async Task<bool> StagiaireExists(int id)
        {
            context = new PFFContext();

            return await context.Stagiaires.AnyAsync(e => e.StagiaireId == id);
        }
    }
}
