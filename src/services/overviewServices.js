import authAxios from "./authAxios";

export default class overviewServices {
  static async getOverview() {
    return authAxios.get("/api/Overview/");
  }
}
