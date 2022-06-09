import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import modulesServices from "../services/modulesServices";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await modulesServices.getModules();
        if (localStorage.getItem("user") !== null) {
          setAuth(JSON.parse(localStorage.getItem("user")));
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          setAuth(false);
          localStorage.removeItem("user");
        }
      } finally {
        setIsLoading(false);
      }
    };
    !auth.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};

export default PersistLogin;
