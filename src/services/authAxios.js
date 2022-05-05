import axios from "axios";
import authHeader from "./auth-header";
const api = axios.create({ baseURL: "https://localhost:7161/" });
export default class authAxios {
  static async get(url) {
    const { data } = await api.get(url, { headers: authHeader() });
    return data;
  }
  static async post(url, data) {
    const { dt } = await api.post(url, data, { headers: authHeader() });
    return dt;
  }
  static async delete(url) {
    const { data } = await api.delete(url, { headers: authHeader() });
    return data;
  }
}
