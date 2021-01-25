import "./styles/Login.css";
import React, { useState } from "react";
import firebase from "../config/fire";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleLogin } from "../redux/actions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const Logintoggled = useSelector((state) => state.toggleLogin);
  const dispatch = useDispatch();

  const toggleLoginButton = () => {
    dispatch(toggleLogin(!Logintoggled));
  };

  const logInWithEmailAndPassword = (event, email_, password_) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email_, password_)
      .catch((err) => {
        document.getElementById("error").innerHTML = err.message;
        console.error("Error signing in with password and email", err);
      });

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        setEmail("");
        setPassword("");
        history.push("/");
      } else {
        // No user is signed in.
      }
    });
  };

  return (
    <div className="login">
      <div className="login_container">
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <br />
        <input className="input_login" placeholder="Email" type="text" id="email" onChange={(e) => setEmail(e.target.value)}></input>
        <br></br>
        <input className="input_login" id="password" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
        <br></br>
        <div id="error" className="error"></div>
        <br></br>
        <div style={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
          <Button className="login_buttons" onClick={(e) => logInWithEmailAndPassword(e, email, password)} variant="contained" size="small" style={{ fontFamily: "Consolas", backgroundColor: "#42C062", color: "#e6e6e6", padding: 5, height: 30 }}>
            Log In
          </Button>
        </div>{" "}
        <br />
        <h4>or</h4>
        <br />
        <Button variant="contained" size="small" style={{ fontFamily: "Consolas", textAlign: "center", padding: 5, backgroundColor: "#0079BF", color: "#e6e6e6", height: 30 }} onClick={() => history.push("/Createaccount")}>
          Create New Account
        </Button>
      </div>
    </div>
  );
}

export default Login;
