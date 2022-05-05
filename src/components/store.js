import { createStore, action, thunk } from "easy-peasy";
import axios from "axios";
import authHeader from "../services/auth-header";
import modulesServices from "../services/modulesServices";
import filiereServices from "../services/filiereServices";
import groupeServices from "../services/groupeServices";
import stagiaireServices from "../services/stagiaireServices";
import seanceServices from "../services/seanceServices";
import roomServices from "../services/roomServices";
import formateurServices from "../services/formateurServices";
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
    const res = await modulesServices.getModules();
    actions.setModules(res);
  }),
  getFilieres: thunk(async (actions) => {
    const res = await filiereServices.getFilieres();
    actions.setFilieres(res);
  }),
  getFiliereGroupes: thunk(async (actions, id) => {
    const res = await groupeServices.getFiliereGroupes(id);
    actions.setFilteredGroupes(res);
  }),
  getFiliereModules: thunk(async (actions, filiereId) => {
    const res = await modulesServices.getFiliereModules(filiereId);
    actions.setFilteredModules(res);
  }),
  getAvailableStartTime: thunk(async (actions, obj) => {
    const res = await seanceServices.getAvailableStartTime(obj);
    actions.setAvailableStartTime(res);
  }),
  getGroupes: thunk(async (actions) => {
    const res = await groupeServices.getGroupes();
    actions.setGroupes(res);
  }),
  getStagiaires: thunk(async (actions) => {
    const res = await stagiaireServices.getStagiaires();
    actions.setStagiaires(res);
  }),
  getSeances: thunk(async (actions) => {
    const res = seanceServices.getSeances();
    actions.setSeances(res);
  }),
  postSeance: thunk(async (_, seance) => {
    const res = await seanceServices.postSeances(seance);
    return res;
  }),
  getRooms: thunk(async (actions) => {
    const res = await roomServices.getRooms();
    actions.setRooms(res);
  }),
  postRoom: thunk(async (actions, room) => {
    const res = await roomServices.postRoom(room);
    actions.setRooms(res);
  }),
  deleteRoom: thunk(async (actions, id) => {
    const res = await roomServices.deleteRoom(id);
    actions.setRooms(res);
  }),
  getFormateurs: thunk(async (actions) => {
    const res = await formateurServices.getFormateurs();
    actions.setFormateurs(res);
  }),
  getWeekSeances: thunk(async (actions, obj) => {
    const res = await seanceServices.getWeekSeances(obj);
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
