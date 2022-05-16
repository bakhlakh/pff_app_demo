import React, { useEffect, useState } from "react";
import "./main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GestionFilieres from "./pages/GestionFilieres.jsx";
import GestionModules from "./pages/GestionModules.jsx";
import STManagement from "./pages/STManagement.jsx";
import GPManagement from "./pages/GPManagement.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useStoreActions } from "easy-peasy";
import GestionSeances from "./pages/GestionSeances.jsx";
import GestionSalles from "./pages/GestionSalles.jsx";

function Main() {
  //const user = JSON.parse(localStorage.getItem("user"));
  const verifyClient = useStoreActions((actions) => actions.verifyClient);
  const [userAuth, setUserAuth] = useState(false);

  const getC = async () => {
    const res = await verifyClient();
    if (res.status >= 200 && res.status < 300) {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
  };
  useEffect(() => {
    getC();
  });
  return (
    <>
      <Router>
        <Routes>
          {userAuth ? (
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
