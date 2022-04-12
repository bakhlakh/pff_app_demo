import { createStore, action, thunk } from "easy-peasy";
import axios from "axios";
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
  currentUser: {},
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
    const res = await api.get("/api/Stagiaires").then(({ data }) => data);
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
    state.currentUser = user;
  }),
  setUserAuthentificated: action((state, userAuthentificated) => {
    state.userAuthentificated = userAuthentificated;
  }),
  setJwtToken: action((state, jwtToken) => {
    state.jwtToken = jwtToken;
  }),
});
export default store;
