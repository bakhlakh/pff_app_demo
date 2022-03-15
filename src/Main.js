import React from "react";
import "./main.css";
import Side from "./components/Side";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GestionFilieres from "./pages/GestionFilieres";
import GestionModules from "./pages/GestionModules";
import Home from "./pages/Home";
import { createStore } from "easy-peasy";
function Main() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/GestionFilieres" element={<GestionFilieres />} />
          <Route path="/GestionModules" element={<GestionModules />} />
        </Routes>
        <Side />
      </Router>
    </>
  );
}
export default Main;
