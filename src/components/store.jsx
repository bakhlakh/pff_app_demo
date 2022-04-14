import { createStore, action, thunk } from "easy-peasy";
import axios from "axios";
import authHeader from "../services/auth-header";
const api = axios.create({ baseURL: "https://localhost:7161/" });
const store = createStore({
  //states
  api: axios.create({ baseURL: "https://localhost:7161/" }),
  modules: [],
  filieres: [],
  stagiaires: [],
  groupes: [],
  currentUpdatedGroupId: "",
  userAuthentificated: false,
  user: null,
  isPost: false,
  //Thunks
  getModules: thunk(async (actions) => {
    const res = await api.get("/api/Modules").then(({ data }) => data);
    actions.setModules(res);
  }),
  getFilieres: thunk(async (actions) => {
    const res = await api.get("/api/Filieres").then(({ data }) => data);
    actions.setFilieres(res);
  }),
  getGroupes: thunk(async (actions) => {
    const res = await api.get("/api/Groupes").then(({ data }) => data);
    actions.setGroupes(res);
  }),
  getStagiaires: thunk(async (actions) => {
    const res = await api
      .get("/api/Stagiaires", { headers: authHeader() })
      .then(({ data }) => data);
    actions.setStagiaires(res);
  }),
  //actions
  setModules: action((state, res) => {
    state.modules = res;
  }),
  setFilieres: action((state, res) => {
    state.filieres = res;
  }),
  setGroupes: action((state, res) => {
    state.groupes = res;
  }),
  setStagiaires: action((state, res) => {
    state.stagiaires = res;
  }),
  setUser: action((state, user) => {
    state.user = user;
  }),
});
export default store;
