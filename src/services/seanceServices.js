import authAxios from "./authAxios";

export default class seanceServices {
  static async getSeances() {
    return authAxios.get("/api/Seances/");
  }
  static async postSeances(data) {
    return authAxios.post("/api/Seances/", data);
  }
  static async getAvailableStartTime(obj) {
    const date = new Date(obj.dateSeance);
    return authAxios.get(
      `/api/Seances/getFreeSeances?date=${
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      }&groupId=${obj.groupId}`
    );
  }
  static async getWeekSeances(obj) {
    console.log("obj", obj);
    const date = new Date(obj.selectedDate);
    return authAxios.get(
      `/api/Seances/getWeekSeances?date=${
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      }&groupId=${obj.selectedGroupe}`
    );
  }
}
