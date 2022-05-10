import authAxios from "./authAxios";

export default class stagiaireServices {
  static async getStagiaires() {
    return await authAxios.get("/api/Stagiaires/");
  }
  static async postStagiaire(data) {
    return await authAxios.post("/api/Stagiaires/", data);
  }
  static async deleteStagiaire(stagiaireId) {
    return await authAxios.delete(`/api/Stagiaires/${stagiaireId}`);
  }
  static async putStagiaire(id, obj) {
    return await authAxios.put(`/api/Stagiaires/${id}`, obj);
  }
}
