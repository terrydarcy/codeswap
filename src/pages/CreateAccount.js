import "./styles/Login.css";
import React, { useState } from "react";
import firebase, { generateUserDocument } from "../config/fire";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  var Filter = require("bad-words"),
    filter = new Filter();

  const signUpWithEmailAndPassword = async (event, displayName, email_, password_) => {
    event.preventDefault();
    if (filter.isProfane(displayName) || filter.isProfane(email_)) {
      document.getElementById("error").innerHTML = "Explicit language is not allowed.";
    } else {
      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email_, password_);
        console.log("test 0", displayName);
        await generateUserDocument(user, displayName);
        document.getElementById("displayName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        setEmail("");
        setPassword("");
        setDisplayName("");
        history.push("/");
      } catch (err) {
        document.getElementById("error").innerHTML = err.message;
        setError(error);
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <h3 style={{ textAlign: "center" }}>Create An Account</h3>
        <br />
        <input className="input_login" placeholder="Username" id="displayName" type="text" onChange={(e) => setDisplayName(e.target.value)}></input>
        <br></br>

        <input className="input_login" placeholder="Email" id="email" type="text" onChange={(e) => setEmail(e.target.value)}></input>
        <br></br>
        <input className="input_login" placeholder="Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)}></input>

        <br></br>
        <div id="error" className="error"></div>
        <br></br>

        <div style={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
          <Button onClick={(e) => signUpWithEmailAndPassword(e, displayName, email, password)} size="medium" variant="contained" style={{ backgroundColor: "#42C062", color: "#e6e6e6" }}>
            Create Account
          </Button>
        </div>
        <br />

        <h4>or</h4>
        <br />

        <Button variant="contained" size="small" style={{ backgroundColor: "#0079BF", color: "#e6e6e6", textAlign: "center" }} onClick={() => history.push("/login")}>
          Log In
        </Button>
      </div>
    </div>
  );
}

export default CreateAccount;
