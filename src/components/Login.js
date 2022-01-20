import axios from "axios";
import { useState, useContext } from "react";

import AuthContext from "../store/auth-context";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const authData = {
      username: email,
      password,
    };
    setLoading(false);
    axios
      .post("/api/login", JSON.stringify(authData), {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        authCtx.login(response.data.token);

        // localStorage.setItem("token", response.data.token);
      })
      .catch((err) => {
        alert("Invalid username or password");
        setLoading(false);
      });
    setLoading(true);
  };

  return (
    <div className="loader">
      {loading ? (
        <Box sx={{ width: "20%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="login-wrapper">
          <img className="logo" alt="" src="/assets/logo.svg"></img>
          <h1>Welcome</h1>
          <h6>Fill in the fields to continue</h6>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <div className="password">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              ></input>
              <img
                className="eye"
                alt=""
                onClick={() => setShow(!show)}
                src="/assets/EyeIcon.svg"
              ></img>
            </div>
            <div className="button">
              {!authCtx.isLoggedIn && <button type="submit">Log in</button>}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
