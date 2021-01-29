import React, { useContext, useState, useEffect } from "react";
import "./styles/Profile.css";
import { Button, Card, List, ListItem } from "@material-ui/core";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router";
import firebase from "firebase";

function Profile() {
  const user = useContext(UserContext);
  let history = useHistory();

  const [email_, setEmail] = useState("");
  const [displayName_, setDisplayName] = useState("");
  const [photoURL_, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setEmail(email);
      setDisplayName(displayName);
      setPhotoURL(photoURL);
    }
  }, [user]);

  const profile_logout = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  const profile_deleteAccount = () => {
    firebase
      .auth()
      .currentUser.delete()
      .then(function () {
        history.push("/");
      });
  };

  return (
    <div className="profile">
      <Card className=" profile_card" style={{ borderRadius: 10, color: "#e6e6e6", backgroundColor: "#161b22" }}>
        <div className="profile_pic_container">
          <img className="profile_pic" src={photoURL_} alt="profile" />
        </div>
        <p> </p>
        <div className="user_info">
          <List subheader="Profile ">
            <br />

            <ListItem>
              Username: &nbsp; <div style={{ color: "#42C062" }}> {displayName_}</div>
            </ListItem>
            <ListItem>
              Email: &nbsp;<div style={{ color: "#42C062" }}>{email_}</div>
            </ListItem>
            <br />
            <Button variant="outlined" color="secondary" style={{ fontFamily: "Consolas", marginRight: 20 }} onClick={() => profile_logout()}>
              Log out
            </Button>

            <Button variant="outlined" color="secondary" style={{ fontFamily: "Consolas" }} onClick={() => profile_deleteAccount()}>
              Delete Account
            </Button>
          </List>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
