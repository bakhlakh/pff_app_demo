import axios from "axios";
const API_URL = "https://localhost:7161/";

const login = (email, password) => {
  const res = axios.post(API_URL + "/Login", {
    email,
    password,
  });
  return res;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
