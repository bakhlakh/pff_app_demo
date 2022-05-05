import authAxios from "./authAxios";

export default class filiereServices {
  static async getFilieres() {
    return authAxios.get("/api/Filieres/");
  }
  static async postFiliere(data) {
    return authAxios.post("/api/Filieres/", data);
  }
}
