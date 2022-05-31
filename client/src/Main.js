import React from "react";
import "./main.css";
import { Route, Routes } from "react-router-dom";
import GestionFilieres from "./pages/GestionFilieres.jsx";
import GestionModules from "./pages/GestionModules.jsx";
import STManagement from "./pages/STManagement.jsx";
import GPManagement from "./pages/GPManagement.jsx";
import Home from "./pages/Home.jsx";
import GestionSeances from "./pages/GestionSeances.jsx";
import GestionSalles from "./pages/GestionSalles.jsx";
import Layout from "./layouts/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function Main() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[1, 2]} />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/Gestion-Seances" element={<GestionSeances />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[1]} />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/Gestion-Filieres" element={<GestionFilieres />} />
              <Route path="/Gestion-Modules" element={<GestionModules />} />
              <Route path="/Gestion-Stagiaires" element={<STManagement />} />
              <Route path="/Gestion-Groupes" element={<GPManagement />} />
              <Route path="/Gestion-Seances" element={<GestionSeances />} />
              <Route path="/Gestion-Salles" element={<GestionSalles />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default Main;
