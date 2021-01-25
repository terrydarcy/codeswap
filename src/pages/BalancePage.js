import React, { useContext, useState, useEffect } from "react";
import "./styles/BalancePage.css";
import { Button, Card } from "@material-ui/core";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router";
import firebase from "firebase";

function BalancePage() {
  const user = useContext(UserContext);
  let history = useHistory();

  const [email_, setEmail] = useState("");
  const [displayName_, setDisplayName] = useState("");
  const [photoURL_, setPhotoURL] = useState("");
  const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setEmail(email);
      setDisplayName(displayName);
      setPhotoURL(photoURL);
    }
  }, [user]);

  return (
    <div className="balance">
      <Card className=" balance_card" style={{ borderRadius: 30, color: "#e6e6e6", backgroundColor: "#161b22" }}>
        <div className="balance_info_container">
          <h2>Balance</h2>
        </div>
        <div className="balance_num_container">
          <h2 style={{ color: "#42c062" }}>${balance}</h2>
        </div>
        <div className="balance_buttons_container">
          <Button className="login_buttons" variant="contained" style={{ fontFamily: "Consolas", backgroundColor: "#42C062", color: "#e6e6e6", padding: 5, marginRight: 10, height: 30 }}>
            Add funds
          </Button>
          <Button variant="contained" size="small" style={{ fontFamily: "Consolas", textAlign: "center", padding: 5, backgroundColor: "#0079BF", color: "#e6e6e6", height: 30 }}>
            withdraw
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default BalancePage;
