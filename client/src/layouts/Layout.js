import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
const Layout = () => {
  return (
    <main className="app">
      <Dashboard>
        <Outlet />
      </Dashboard>
    </main>
  );
};

export default Layout;
