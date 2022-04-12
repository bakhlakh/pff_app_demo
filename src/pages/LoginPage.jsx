import React, { useState } from "react";
import "./css/LoginPage.css";
import logo from "../Resources/ofppt_logo.png";
import { FaUser, FaLock } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useStoreState, useStoreActions } from "easy-peasy";
function LoginPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const api = useStoreState((state) => state.api);
  const currentUser = useStoreState((state) => state.currentUser);
  const setUserAuthentificated = useStoreActions(
    (actions) => actions.setUserAuthentificated
  );
  const setUser = useStoreActions((actions) => actions.setUser);
  function loginHandler() {
    api
      .post("/api/Login", {
        UserName: userName,
        UserPassword: userPassword,
      })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          localStorage.setItem("jwtToken", res.data.token);
          localStorage.setItem("userName", res.data.user.UserName);
          setUser(res.data.user);
          setUserAuthentificated(true);
        }
      });
  }
  return (
    <>
      <div id="container">
        <div id="iconDiv">
          <img src={logo} alt="Logo Ofppt" />
        </div>
        <div className="loginForm">
          <div id="userIcon">
            <FaUser color="white" size={40}></FaUser>
          </div>
          <div className="inputDiv">
            <TextField
              id="Name"
              label="Name"
              name="Name"
              className="form-control mb-2"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </div>
          <div className="inputDiv">
            <TextField
              id="password"
              label="Password"
              name="password"
              type="password"
              className="form-control mb-2"
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </div>

          <button
            id="loginBtn"
            className="btn btn-primary"
            onClick={() => {
              loginHandler();
            }}
          >
            Login
          </button>
          <a id="forgotPassword" href="/">
            forgot password?
          </a>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
