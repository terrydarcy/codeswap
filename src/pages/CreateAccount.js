import "./styles/Login.css";
import React, { useState } from "react";
import firebase, { generateUserDocument } from "../config/fire";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleLogin } from "../redux/actions";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();

  const Logintoggled = useSelector((state) => state.toggleLogin);

  const toggleLoginButton = () => {
    dispatch(toggleLogin(!Logintoggled));
  };

  const signUpWithEmailAndPassword = async (event, displayName, email_, password_) => {
    event.preventDefault();
    const seed = Math.floor(Math.random() * Math.floor(5000));
    const photoURL = "https://picsum.photos/seed/" + seed + "/200";
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email_, password_);
      generateUserDocument(user, { displayName, photoURL });
    } catch (err) {
      document.getElementById("error").innerHTML = err.message;
      setError(error);
      console.log(error);
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        document.getElementById("displayName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        setEmail("");
        setPassword("");
        setDisplayName("");
        history.push("/");
      } else {
        // No user is signed in.
      }
    });
  };

  return (
    <div className="create_account_container">
      <div id="createAccount">
        <h3 style={{ textAlign: "center" }}>Create An Account</h3>
        <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
          <input className="input_login" placeholder="Username" id="displayName" type="text" onChange={(e) => setDisplayName(e.target.value)}></input>
        </div>
        <br></br>

        <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
          <input className="input_login" placeholder="Email" id="email" type="text" onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <br></br>
        <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
          <input className="input_login" placeholder="Password" id="password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </div>

        <br></br>
        <div id="error" className="error"></div>
        <br></br>

        <div style={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center", marginBottom: 50 }}>
          <Button onClick={(e) => signUpWithEmailAndPassword(e, displayName, email, password)} size="medium" variant="contained" style={{ backgroundColor: "#42C062", color: "white", marginRight: 30 }}>
            Create Account
          </Button>
          <Button variant="contained" size="small" style={{ backgroundColor: "#0079BF", color: "white", textAlign: "center" }} onClick={() => toggleLoginButton()}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
