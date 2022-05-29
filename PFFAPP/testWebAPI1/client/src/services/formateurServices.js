import authAxios from "./authAxios";

export default class formateurServices {
  static async getFormateurs() {
    return authAxios.get("/api/Formateurs/");
  }
  static async postFormateur(data) {
    return authAxios.post("/api/Formateurs/", data);
  }
}
