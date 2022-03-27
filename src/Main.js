import React from "react";
import "./main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GestionFilieres from "./pages/GestionFilieres";
import GestionModules from "./pages/GestionModules";
import STManagement from "./pages/STManagement";
import GPManagement from "./pages/GPManagement";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { useStoreState } from "easy-peasy";
function Main() {
  const userAuth = useStoreState((state) => state.userAuthentificated);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={userAuth ? <Home /> : <LoginPage />} />
          <Route path="/GestionFilieres" element={<GestionFilieres />} />
          <Route path="/GestionModules" element={<GestionModules />} />
          <Route path="/GestionStagiaires" element={<STManagement />} />
          <Route path="/Groupes" element={<GPManagement />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}
export default Main;
