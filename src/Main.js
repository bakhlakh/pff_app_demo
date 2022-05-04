import React, { useEffect, useState } from "react";
import "./main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GestionFilieres from "./pages/GestionFilieres";
import GestionModules from "./pages/GestionModules";
import STManagement from "./pages/STManagement";
import GPManagement from "./pages/GPManagement";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { useStoreActions, useStoreState } from "easy-peasy";
import ProtectedRoute from "./components/ProtectedRoute";
import GestionSeances from "./pages/GestionSeances";
import GestionSalles from "./pages/GestionSalles";
import NewSide from "./components/NewSide";

function Main() {
  const user = JSON.parse(localStorage.getItem("user"));
  const setUser = useStoreActions((actions) => actions.setUser);
  const verifyClient = useStoreActions((actions) => actions.verifyClient);
  const userAuthentificated = useStoreState(
    (state) => state.userAuthentificated
  );
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setUser(user);
    verifyClient();
  }, []);
  useEffect(() => {
    if (user !== null && userAuthentificated) setAuth(true);
    else setAuth(false);
  }, [user, userAuthentificated]);
  return (
    <>
      <Router>
        <Routes>
          {userAuthentificated ? (
            <>
              <Route exact path="/" element={<Home />} />
              <Route path="/GestionFilieres" element={<GestionFilieres />} />
              <Route path="/GestionModules" element={<GestionModules />} />
              <Route path="/GestionStagiaires" element={<STManagement />} />
              <Route path="/Groupes" element={<GPManagement />} />
              <Route path="/GestionSeances" element={<GestionSeances />} />
              <Route path="/GestionSalles" element={<GestionSalles />} />
            </>
          ) : (
            <Route path="*" element={<LoginPage />}></Route>
          )}
        </Routes>
      </Router>
    </>
  );
}
export default Main;
