import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NoPermission from "../pages/NoPermission";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  if (!auth) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  } else if (allowedRoles.includes(auth?.userLevel)) {
    return <Outlet />;
  } else {
    return <NoPermission />;
  }
};

export default RequireAuth;
