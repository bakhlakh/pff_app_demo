import React, { useState } from "react";
import "./css/LoginPage.css";
import logo from "../Resources/ofppt_logo.png";
import { FaUser, FaLock } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
function LoginPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const api = useStoreState((state) => state.api);
  const navigator = useNavigate();
  const [messageVisible, setMessageVisible] = useState(false);
  function loginHandler() {
    api
      .post("/api/Login", {
        UserName: userName,
        UserPassword: userPassword,
      })
      .then(
        (res) => {
          if (res.status >= 200 && res.status <= 299) {
            localStorage.setItem("user", JSON.stringify(res.data));
            navigator("/");
            window.location.reload();
          }
        },
        (error) => {
          setMessageVisible(true);
        }
      );
  }
  return (
    <>
      <div id="container">
        <div id="iconDiv">
          <img src={logo} alt="Logo Ofppt" />
        </div>
        {messageVisible && (
          <div
            className="mt-3 mb-3 d-flex justify-content-center "
            style={{ zIndex: 1 }}
          >
            <Alert
              style={{ width: "500px" }}
              severity="error"
              onClose={() => {
                setMessageVisible(false);
              }}
            >
              <AlertTitle>Username or password is invalid</AlertTitle>
            </Alert>
          </div>
        )}
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
