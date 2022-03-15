import { createStore, action, thunk } from "easy-peasy";
import axios from "axios";
const api = axios.create({ baseURL: "https://localhost:7161/" });
const store = createStore({
  api: axios.create({ baseURL: "https://localhost:7161/" }),
  modules: [],
  postStatusResult: 0,
  //Thunks
  getModules: thunk(async (actions) => {
    const res = await api.get("/api/Modules").then(({ data }) => data);
    actions.setModules(res);
  }),
  postModule: thunk(async (actions, moduleObj) => {
    await api
      .post("/api/Modules", moduleObj)
      .then((e) => {
        actions.setPostStatus(e.status);
      })
      .catch((e) => {
        console.log("catch.status", e);
        actions.setPostStatus(409);
      });
  }),
  returnStatus: action((state) => {
    return state.postStatusResult;
  }),
  //actions
  setModules: action((state, res) => {
    state.modules = res;
  }),
  setPostStatus: action((state, e) => {
    if (e) state.postStatusResult = e;
  }),
});
export default store;
