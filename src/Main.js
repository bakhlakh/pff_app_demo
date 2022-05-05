import React, { useEffect, useState } from "react";
import "./main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GestionFilieres from "./pages/GestionFilieres.jsx";
import GestionModules from "./pages/GestionModules.jsx";
import STManagement from "./pages/STManagement.jsx";
import GPManagement from "./pages/GPManagement.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useStoreActions, useStoreState } from "easy-peasy";
import GestionSeances from "./pages/GestionSeances.jsx";
import GestionSalles from "./pages/GestionSalles.jsx";

function Main() {
  const user = JSON.parse(localStorage.getItem("user"));
  const setUser = useStoreActions((actions) => actions.setUser);
  const verifyClient = useStoreActions((actions) => actions.verifyClient);
  const userAuthentificated = useStoreState(
    (state) => state.userAuthentificated
  );
  useEffect(() => {
    setUser(user);
    verifyClient();
  }, []);
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
