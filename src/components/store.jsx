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
  seances: [],
  rooms: [],
  currentUpdatedGroupId: "",
  userAuthentificated: false,
  user: null,
  isPost: false,
  //Thunks
  getModules: thunk(async (actions) => {
    const res = await api
      .get("/api/Modules", { headers: authHeader() })
      .then(({ data }) => data);
    actions.setModules(res);
  }),
  getFilieres: thunk(async (actions) => {
    const res = await api
      .get("/api/Filieres", { headers: authHeader() })
      .then(({ data }) => data);
    actions.setFilieres(res);
  }),
  getGroupes: thunk(async (actions) => {
    const res = await api
      .get("/api/Groupes", { headers: authHeader() })
      .then(({ data }) => data);
    actions.setGroupes(res);
  }),
  getStagiaires: thunk(async (actions) => {
    const res = await api
      .get("/api/Stagiaires", { headers: authHeader() })
      .then(({ data }) => data);
    actions.setStagiaires(res);
  }),
  getSeances: thunk(async (actions) => {
    const res = await api
      .get("/api/Seances", { headers: authHeader() })
      .then(({ data }) => data);
    actions.setSeances(res);
  }),
  getRooms: thunk(async (actions) => {
    const res = await api
      .get("/api/Rooms", { headers: authHeader() })
      .then(({ data }) => data);
    actions.setRooms(res);
  }),
  postRoom: thunk(async (actions, room) => {
    const res = await api
      .post("/api/Rooms", room, { headers: authHeader() })
      .then(({ data }) => data);
    actions.setRooms(res);
  }),
  deleteRoom: thunk(async (actions, id) => {
    console.log("first", `/api/Rooms/${id}`);
    const res = await api
      .delete(`/api/Rooms/${parseInt(id)}`, { headers: authHeader() })
      .then(({ data }) => data);
    actions.setRooms(res);
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
  setSeances: action((state, res) => {
    state.seances = res;
  }),
  setRooms: action((state, res) => {
    state.rooms = res;
  }),
});
export default store;
