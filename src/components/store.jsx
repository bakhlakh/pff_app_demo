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
  filteredGroupes: [],
  availableStartTime: ["08:30", "11:00", "13:30", "16:00"],
  filteredModules: [],
  formateurs: [],
  currentUpdatedGroupId: "",
  userAuthentificated: false,
  user: null,
  isPost: false,
  weekSeances: [],
  //Thunks
  verifyClient: thunk(async (actions) => {
    let res = await api
      .get("/api/Modules", { headers: authHeader() })
      .catch((err) => {
        return err.response.status;
      });
    if (res === 401) {
      actions.setUserAuthentificated(false);
    } else {
      actions.setUserAuthentificated(true);
    }
  }),
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
  getFiliereGroupes: thunk(async (actions, id) => {
    const res = await api
      .get(`/api/Groupes/GetFiliereGroupes/${id}`, { headers: authHeader() })
      .then(({ data }) => data);
    actions.setFilteredGroupes(res);
  }),
  getFiliereModules: thunk(async (actions, filiereId) => {
    const res = await api
      .get(`/api/Modules/GetModulesInFiliere/${filiereId}`, {
        headers: authHeader(),
      })
      .then(({ data }) => data);
    actions.setFilteredModules(res);
  }),
  getAvailableStartTime: thunk(async (actions, obj) => {
    const bruh = new Date(obj.dateSeance);
    const res = await api
      .get(
        `/api/Seances/getFreeSeances?date=${
          bruh.getFullYear() +
          "-" +
          (bruh.getMonth() + 1) +
          "-" +
          bruh.getDate()
        }&groupId=${obj.groupId}`,
        {
          headers: authHeader(),
        }
      )
      .then(({ data }) => data);
    actions.setAvailableStartTime(res);
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
  postSeance: thunk(async (_, seance) => {
    const res = await api
      .post("/api/Seances", seance, { headers: authHeader() })
      .then((r) => {
        console.log("first", r);
        return r;
      });
    return res;
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
    const res = await api
      .delete(`/api/Rooms/${parseInt(id)}`, { headers: authHeader() })
      .then(({ data }) => data);
    actions.setRooms(res);
  }),
  getFormateurs: thunk(async (actions) => {
    const res = await api
      .get("/api/Formateurs", { headers: authHeader() })
      .then(({ data }) => data);
    actions.setFormateurs(res);
  }),
  getWeekSeances: thunk(async (actions, obj) => {
    const bruh = new Date(obj.selectedDate);
    const res = await api
      .get(
        `/api/Seances/getWeekSeances?date=${
          bruh.getFullYear() +
          "-" +
          (bruh.getMonth() + 1) +
          "-" +
          bruh.getDate()
        }&groupId=${obj.selectedGroupe}`,
        {
          headers: authHeader(),
        }
      )
      .then(({ data }) => data);
    actions.setWeekSeances(res);
  }),
  //actions
  setUserAuthentificated: action((state, userAuthentificated) => {
    state.userAuthentificated = userAuthentificated;
  }),
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
  setFormateurs: action((state, res) => {
    state.formateurs = res;
  }),
  setWeekSeances: action((state, res) => {
    state.weekSeances = res;
  }),
  setFilteredModules: action((state, res) => {
    state.filteredModules = res;
  }),
  setFilteredGroupes: action((state, res) => {
    state.filteredGroupes = res;
  }),
  setAvailableStartTime: action((state, res) => {
    state.availableStartTime = res;
  }),
});
export default store;
