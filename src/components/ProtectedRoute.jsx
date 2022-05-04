import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useStoreState } from "easy-peasy";
function ProtectedRoute() {
  const userAuthentificated = useStoreState(
    (state) => state.userAuthentificated
  );
  return userAuthentificated ? <Outlet /> : <LoginPage />;
}

export default ProtectedRoute;
