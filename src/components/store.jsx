import { createStore, action, thunk } from "easy-peasy";
import axios from "axios";
const api = axios.create({ baseURL: "https://localhost:7161/" });
const store = createStore({
  //states
  api: axios.create({ baseURL: "https://localhost:7161/" }),
  modules: [],
  filieres: [],
  //Thunks
  getModules: thunk(async (actions) => {
    console.log("first");
    const res = await api.get("/api/Modules").then(({ data }) => data);
    actions.setModules(res);
  }),
  getFilieres: thunk(async (actions) => {
    const res = await api.get("/api/Filieres").then(({ data }) => data);
    actions.setFilieres(res);
  }),
  //actions
  setModules: action((state, res) => {
    state.modules = res;
  }),
  setFilieres: action((state, res) => {
    state.filieres = res;
  }),
});
export default store;
