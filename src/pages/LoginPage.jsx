import React, { useState } from "react";
import "./css/LoginPage.css";
import logo from "../Resources/ofppt_logo.png";
import { FaUser, FaLock } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useStoreState } from "easy-peasy";
function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const jwtToken = useStoreState((state) => state.jwtToken);
  const api = useStoreState((state) => state.api);
  function loginHandler() {
    api
      .post("/api/login", {
        email: userEmail,
        password: userPassword,
      })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          localStorage.setItem("jwtToken", res.data.token);
          window.location.href = "/";
        }
      });
  }
  return (
    <>
      <div id="container">
        <div id="iconDiv">
          <img src={logo} alt="Logo Ofppt" />
        </div>
        <form action="" id="loginForm">
          <div id="userIcon">
            <FaUser color="white" size={40}></FaUser>
          </div>
          <div className="inputDiv">
            <TextField
              id="Email"
              label="Email"
              name="Email"
              className="form-control mb-2"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
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
        </form>
      </div>
    </>
  );
}

export default LoginPage;
