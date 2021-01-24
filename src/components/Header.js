import React, { useState, useContext, useEffect } from "react";
import "./styles/Header.css";
import { makeStyles, Button, IconButton } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import firebase from "../config/fire";
import { UserContext } from "../providers/UserProvider";
import HeaderProfileWidget from "./HeaderProfileWidget";
import { useHistory } from "react-router";

function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState();
  const [popoverAvatar, setPopoverAvatar] = React.useState(false);
  let history = useHistory();

  const user = useContext(UserContext);
  const [email_, setEmail] = useState("");
  const [displayName_, setDisplayName] = useState("");
  const [photoURL_, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setEmail(email);
      setDisplayName(displayName);
      setPhotoURL(photoURL);
      console.log(user);
    }
  }, [user]);

  const closePopoverAvatar = () => setPopoverAvatar(false);

  const openPopoverAvatar = (e) => {
    e.preventDefault();

    setPopoverAvatar(true);
    setAnchorEl(e.currentTarget);
  };

  const handleLogout = () => {
    setPopoverAvatar(false);
    firebase.auth().signOut();
    history.push("/");
  };

  return (
    <div>
      <AppBar position="static">
        <div className="headerContainer">
          <div className="header_logo_container">
            <a href="/" className="homelink">
              <h1 style={{ margin: 0 }} className="header_logo">
                code<span className="header_text_color_mod">swap</span>
              </h1>
            </a>
          </div>
          <div className="header_search_container">
            <div className="search_bar">
              <div style={{ flex: 1 }} className="searchIconContainer">
                <i className="fas fa-search  fa-lg" style={{ color: "#e6e6e6" }}></i>
              </div>
              <input placeholder="Start typing to search for code"></input>
              {/* <Button variant="outlined" className={classes.headerButton} style={{ backgroundColor: "#161b22", color: "e6e6e6", padding: 3, margin: 10, height: 25 }}>
                Search
              </Button> */}
            </div>
          </div>
          <div className="header_nav_container">
            <Button variant="outlined" className={classes.headerButton} style={{ borderRadius: 10, backgroundColor: "#0d1117", color: "e6e6e6", padding: 3, margin: 10, height: 40 }} onClick={() => history.push("/Addjob")}>
              Post Task
            </Button>
            <Button variant="outlined" className={classes.headerButton} style={{ borderRadius: 10, backgroundColor: "#0d1117", color: "e6e6e6", padding: 3, margin: 10, height: 40 }}>
              Balance: $0
            </Button>
            {user ? (
              <IconButton aria-controls="fade-menu-liked" aria-haspopup="true" onClick={openPopoverAvatar}>
                <HeaderProfileWidget user={user} />{" "}
              </IconButton>
            ) : (
              <IconButton id="header_profile_button" className=" far fa-user fa-5x" size="medium" onClick={openPopoverAvatar} aria-owns="simple-menu" aria-controls="simple-menu" aria-haspopup="true" />
            )}
          </div>
        </div>
      </AppBar>
      {user ? (
        <Menu id="simple-menu" anchorEl={anchorEl} onClose={closePopoverAvatar} open={popoverAvatar}>
          <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
          <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
        </Menu>
      ) : (
        <Menu id="simple-menu" anchorEl={anchorEl} onClose={closePopoverAvatar} open={popoverAvatar}>
          <MenuItem onClick={() => history.push("/login")}>Login</MenuItem>
          <MenuItem onClick={() => history.push("/Createaccount")}>Create Account</MenuItem>
        </Menu>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  headerButton: {
    fontFamily: "Consolas",
    color: "#e6e6e6",
    minWidth: 90,
    fontSize: 12,
  },
}));

export default Header;
