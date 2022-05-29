import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const verifyRefreshToken = () => {
      try {
        if (localStorage.getItem("user") !== null) {
          setAuth(JSON.parse(localStorage.getItem("user")));
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};

export default PersistLogin;
