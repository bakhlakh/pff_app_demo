import authAxios from "./authAxios";

export default class roomServices {
  static async getRooms() {
    return authAxios.get("/api/Rooms/");
  }
  static async postRoom(data) {
    return authAxios.post("/api/Rooms/", data);
  }
  static async deleteRoom(id) {
    return authAxios.delete("/api/Rooms/" + id);
  }
}
