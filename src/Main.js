import React from "react";
import "./main.css";
import Side from "./components/Side";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GestionFilieres from "./pages/GestionFilieres";
import GestionModules from "./pages/GestionModules";
import STManagement from "./pages/STManagement";
import GPManagement from "./pages/GPManagement";
import Home from "./pages/Home";
function Main() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/GestionFilieres" element={<GestionFilieres />} />
          <Route path="/GestionModules" element={<GestionModules />} />
          <Route path="/GestionStagiaires" element={<STManagement />} />
          <Route path="/Groupes" element={<GPManagement />} />
        </Routes>
        <Side />
      </Router>
    </>
  );
}
export default Main;
