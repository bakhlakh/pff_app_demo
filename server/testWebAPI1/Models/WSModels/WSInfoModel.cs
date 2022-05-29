namespace testWebAPI1.Models.WSModels
{
    public class WSInfoModel
    {
        public Groupe _Groupe { get; set; }
        public Filiere _Filiere { get; set; }
        public WSInfoModel(Groupe groupe, Filiere filiere)
        {
            _Groupe = groupe;
            _Filiere = filiere;
        }

    }
}
