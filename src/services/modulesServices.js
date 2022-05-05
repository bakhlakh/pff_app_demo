import authAxios from "./authAxios";

export default class modulesServices {
  static async getModules() {
    return authAxios.get("/api/Modules/");
  }
  static async postModule(module) {
    return authAxios.post("/api/Modules/", module);
  }
  static async getFiliereModules(filiereId) {
    return authAxios.get(`/api/Modules/GetModulesInFiliere/${filiereId}`);
  }
}
