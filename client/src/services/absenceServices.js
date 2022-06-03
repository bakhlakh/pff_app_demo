import authAxios from "./authAxios";

export default class absenceServices {
  static async getAbsences(id) {
    return authAxios.get("/api/Absences?seanceId=" + id);
  }
  static async postAbsence(obj) {
    console.log(obj);
    return authAxios.post(
      "/api/Absences?seanceId=" + obj.seanceId,
      obj.stagiaires
    );
  }
}
