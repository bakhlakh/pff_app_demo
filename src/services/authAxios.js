import axios from "axios";
import authHeader from "./auth-header";
const api = axios.create({ baseURL: "https://localhost:7161/" });
export default class authAxios {
  static async get(url) {
    return api
      .get(url, { headers: authHeader() })
      .then(({ data }) => data)
      .catch((err) => err.response.status);
  }

  static async post(url, data) {
    return api
      .post(url, data, { headers: authHeader() })
      .then(({ data }) => data)
      .catch((err) => err.response.status);
  }
  static async delete(url) {
    return api
      .delete(url, { headers: authHeader() })
      .then(({ data }) => data)
      .catch((err) => err.response.status);
  }
}
