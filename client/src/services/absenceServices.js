import authAxios from "./authAxios";

export default class absenceServices {
  static async postAbsences(obj) {
    return authAxios.post("/api/Absences/", obj);
  }
  static async getAbsences() {
    return authAxios.get("/api/Absences/");
  }
  static async postAbsence(id) {
    return authAxios.post("/api/Absences/" + id);
  }
}
