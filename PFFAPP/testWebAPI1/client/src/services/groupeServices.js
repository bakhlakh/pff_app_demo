import authAxios from "./authAxios";

export default class groupeServices {
  static async getGroupes() {
    return authAxios.get("/api/Groupes/");
  }
  static async postGroupe(data) {
    return authAxios.post("/api/Groupes/", data);
  }
  static async deleteGroupe(obj) {
    return authAxios.delete(`/api/Groupes/${obj.groupId}/${obj.anneScolaire}`);
  }
  static async getFiliereGroupes(id) {
    return authAxios.get(`/api/Groupes/GetFiliereGroupes/${id}`);
  }
}
