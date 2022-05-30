using testWebAPI1.Models.WSModels;

namespace testWebAPI1.Models
{
    public class WSModel:Seance
    {
        public WSModel(WSInfoModel info, string mH, IEnumerable<WSSeanceModel> emploi)
        {
            Info = info;
            MH = mH;
            Emploi = emploi;
        }

        public WSModels.WSInfoModel Info { get; set; }
        public string MH { get; set; }
        public IEnumerable<WSModels.WSSeanceModel> Emploi { get; set; }
       
        
    }
}
