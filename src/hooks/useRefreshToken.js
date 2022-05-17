import useAuth from "./useAuth";
const useRefreshToken = () => {
  const { setAuth } = useAuth();
  if (localStorage.getItem("user") !== null) {
    setAuth(JSON.parse(localStorage.getItem("user")));
    return true;
  } else {
    setAuth(null);
    return false;
  }
};
export default useRefreshToken;
