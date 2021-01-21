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
      <h3 style={{ textAlign: "center" }}>Login</h3>

      <input className="input_login" placeholder="Email" type="text" id="email" onChange={(e) => setEmail(e.target.value)}></input>
      <br></br>
      <input className="input_login" id="password" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>

      <br></br>
      <div id="error" className="error"></div>
      <br></br>

      <div style={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center", marginBottom: 50 }}>
        <Button className="login_buttons" onClick={(e) => logInWithEmailAndPassword(e, email, password)} variant="contained" size="large" style={{ backgroundColor: "#42C062", color: "white", marginRight: 20, padding: 10 }}>
          Log In
        </Button>

        <Button variant="contained" size="small" style={{ textAlign: "center", padding: 5, backgroundColor: "#0079BF", color: "white" }} onClick={() => toggleLoginButton()}>
          Create Account
        </Button>
      </div>
    </div>
  );
}

export default Login;
