import authAxios from "./authAxios";

export default class stagiaireServices {
  static async getStagiaires() {
    return authAxios.get("/api/Stagiaires/");
  }
  static async postStagiaire(data) {
    return authAxios.post("/api/Stagiaires/", data);
  }
}
