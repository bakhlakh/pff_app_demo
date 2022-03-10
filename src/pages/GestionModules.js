import React, { useState, useEffect } from "react";
import Datatable from "../components/Datatable";
import axios from "axios";
import "./css/GestionModules.css";
const api = axios.create({ baseURL: "https://localhost:7161/" });
function GestionModules() {
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState();
  const getModules = async () => {
    let dat = await api.get("/api/Modules").then(({ data }) => data);
    setModules(dat);
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <div className="GestionModules ">
      <Datatable data={modules} tbl="ModulesTable" />
    </div>
  );
}

export default GestionModules;
