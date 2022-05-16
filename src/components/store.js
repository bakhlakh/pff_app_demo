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
  updatedSeance: {},
  currentUpdatedGroupId: "",
  user: JSON.parse(localStorage.getItem("user")),
  isPost: false,
  weekSeances: [],
  apiError: null,
  //Thunks
  verifyClient: thunk(async (actions) => {
    let res = await api
      .get("/api/Modules", { headers: authHeader() })
      .catch((err) => {
        return err.response.status;
      });
    return res;
  }),
  getModules: thunk(async (actions) => {
    try {
      const res = await modulesServices.getModules();
      actions.setModules(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  deleteModule: thunk(async (actions, moduleId) => {
    try {
      await modulesServices.deleteModule(moduleId);
      actions.getModules();
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  putModule: thunk(async (actions, moduleId, data) => {
    try {
      await modulesServices.putModule(moduleId, data);
      actions.getModules();
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  getFilieres: thunk(async (actions) => {
    try {
      const res = await filiereServices.getFilieres();
      actions.setFilieres(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  postFiliere: thunk(async (actions, data) => {
    try {
      await filiereServices.postFiliere(data);
      actions.getFilieres();
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  putFiliere: thunk(async (actions, data) => {
    try {
      const res = await filiereServices.putFiliere(data.FiliereId, data);
      actions.getFilieres();
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  deleteFiliere: thunk(async (actions, id) => {
    try {
      const res = await filiereServices.deleteFiliere(id);
      actions.setFilieres(res);
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
  }),

  getFiliereModules: thunk(async (actions, filiereId) => {
    try {
      const res = await modulesServices.getFiliereModules(filiereId);
      actions.setFilteredModules(res);
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  getAvailableStartTime: thunk(async (actions, obj) => {
    try {
      const res = await seanceServices.getAvailableStartTime(obj);
      actions.setAvailableStartTime(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  getGroupes: thunk(async (actions) => {
    try {
      const res = await groupeServices.getGroupes();
      actions.setGroupes(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  postGroupe: thunk(async (actions, data) => {
    try {
      const res = await groupeServices.postGroupe(data);
      actions.setGroupes(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  deleteGroupe: thunk(async (actions, obj) => {
    try {
      const res = await groupeServices.deleteGroupe(obj);
      actions.setGroupes(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  getFiliereGroupes: thunk(async (actions, id) => {
    try {
      const res = await groupeServices.getFiliereGroupes(id);
      actions.setFilteredGroupes(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  getStagiaires: thunk(async (actions) => {
    try {
      const res = await stagiaireServices.getStagiaires();
      actions.setStagiaires(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  postStagiaire: thunk(async (actions, data) => {
    try {
      const res = await stagiaireServices.postStagiaire(data);
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  deleteStagiaire: thunk(async (actions, id) => {
    try {
      const res = await stagiaireServices.deleteStagiaire(id);
      actions.setStagiaires(res);
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  putStagiaire: thunk(async (actions, stgObj) => {
    try {
      const res = await stagiaireServices.putStagiaire(
        stgObj.stagiaireId,
        stgObj
      );
      actions.setStagiaires(res);
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  getSeances: thunk(async (actions) => {
    try {
      const res = seanceServices.getSeances();
      actions.setSeances(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  postSeance: thunk(async (actions, seance) => {
    try {
      const res = await seanceServices.postSeances(seance);
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  deleteSeance: thunk(async (actions, id) => {
    try {
      const res = await seanceServices.deleteSeance(id);
      actions.setSeances(res);
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  putSeance: thunk(async (actions, seance) => {
    try {
      const res = await seanceServices.putSeance(seance.seanceId, seance);
      actions.setSeances(res);
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  getRooms: thunk(async (actions) => {
    try {
      const res = await roomServices.getRooms();
      actions.setRooms(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  postRoom: thunk(async (actions, room) => {
    try {
      const res = await roomServices.postRoom(room);
      actions.setRooms(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  deleteRoom: thunk(async (actions, id) => {
    try {
      const res = await roomServices.deleteRoom(id);
      actions.setRooms(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  getFormateurs: thunk(async (actions) => {
    try {
      const res = await formateurServices.getFormateurs();
      actions.setFormateurs(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  getWeekSeances: thunk(async (actions, obj) => {
    try {
      const res = await seanceServices.getWeekSeances(obj);
      actions.setWeekSeances(res);
    } catch (error) {
      actions.setApiError(error);
    }
  }),
  GWSForAll: thunk(async (actions, obj) => {
    try {
      const res = await seanceServices.GWSForAll(obj);
      return res;
    } catch (error) {
      actions.setApiError(error);
    }
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
  setApiError: action((state, res) => {
    state.apiError = res;
  }),
  setUpdatedSeance: action((state, res) => {
    state.updatedSeance = res;
  }),
});
export default store;
