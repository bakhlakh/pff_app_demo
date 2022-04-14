import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
function ProtectedRoute({ isAuth }) {
  return isAuth ? <Outlet /> : <LoginPage />;
}

export default ProtectedRoute;
