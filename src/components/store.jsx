import { createStore, action, thunk } from "easy-peasy";
import axios from "axios";
const api = axios.create({ baseURL: "https://localhost:7161/" });
const store = createStore({
  api: axios.create({ baseURL: "https://localhost:7161/" }),
  modules: [],
  //Thunks
  getModules: thunk(async (actions) => {
    const res = await api.get("/api/Modules").then(({ data }) => data);
    actions.setModules(res);
  }),
  //actions
  setModules: action((state, res) => {
    state.modules = res;
  }),
});
export default store;
