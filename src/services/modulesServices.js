import authAxios from "./authAxios";

export default class modulesServices {
  static async getModules() {
    return await authAxios.get("/api/Modules/");
  }
  static async postModule(module) {
    return await authAxios.post("/api/Modules/", module);
  }
  static async deleteModule(moduleId) {
    return await authAxios.delete("/api/Modules/FD/" + moduleId);
  }
  static async putModule(moduleId, data) {
    return await authAxios.put("/api/Modules/" + moduleId, data);
  }
  static async getFiliereModules(filiereId) {
    return await authAxios.get(`/api/Modules/GetModulesInFiliere/${filiereId}`);
  }
}
