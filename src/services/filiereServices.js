import authAxios from "./authAxios";

export default class filiereServices {
  static async getFilieres() {
    return authAxios.get("/api/Filieres/");
  }
  static async postFiliere(data) {
    return authAxios.post("/api/Filieres/", data);
  }
  static async deleteFiliere(id) {
    return authAxios.delete("/api/Filieres/ForceDeleteFiliere/" + id);
  }
  static async putFiliere(id, data) {
    return authAxios.put("/api/Filieres/" + id, data);
  }
  static async ajouterFiliereModule(obj) {
    return authAxios.post("/api/FiliereModules", obj);
  }
  static async putFiliereModules(obj) {
    return authAxios.put(
      "/api/FiliereModules/" + obj._FiliereId + "/" + obj._ModuleId,
      obj
    );
  }
}
