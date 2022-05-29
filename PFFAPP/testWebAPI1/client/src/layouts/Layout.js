import React from "react";
import { Outlet } from "react-router-dom";
import NewSide from "../components/NewSide";
const Layout = () => {
  return (
    <main className="app">
      <NewSide>
        <Outlet />
      </NewSide>
    </main>
  );
};

export default Layout;
