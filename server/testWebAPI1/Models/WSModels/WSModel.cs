using testWebAPI1.Models.WSModels;

namespace testWebAPI1.Models
{
    public class WSModel:Seance
    {
        public WSModel(WSInfoModel info, string mH, IEnumerable<WSSeanceModel> emploi,DateOnly start)
        {
            Info = info;
            MH = mH;
            Emploi = emploi;
            DateEmploie = start;
        }

        public WSModels.WSInfoModel Info { get; set; }
        public string MH { get; set; }
        public IEnumerable<WSModels.WSSeanceModel> Emploi { get; set; }
        public DateOnly DateEmploie { get; set; }

    }
}
