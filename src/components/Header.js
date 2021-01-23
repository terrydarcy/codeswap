import React, { useState, useContext } from "react";
import "./styles/Header.css";
import { makeStyles, Button, IconButton } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import firebase from "../config/fire";

function Header() {
  const classes = useStyles();

  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    if (document.body.contains(document.getElementById("header_profile_button"))) {
      document.getElementById("header_profile_button").style.color = "#e6e6e6";
    }
  };

  const handleClick = (event) => {
    document.getElementById("header_profile_button").style.color = "#d9215a";
    setAnchorEl(event.currentTarget);
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
              <input placeholder="Start typing to search for code"></input>
            </div>
          </div>
          <div className="header_nav_container">
            <Button variant="outlined" className={classes.headerButton}>
              Add Job
            </Button>
            <Button variant="outlined" className={classes.headerButton}>
              Balance: $500
            </Button>
            <IconButton id="header_profile_button" className="header_profile-button far fa-user fa-5x" size="medium" aria-controls="fade-menu-liked" aria-haspopup="true" onClick={handleClick} />
          </div>
        </div>
      </AppBar>

      <Menu id="fade-menu-profile" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} getContentAnchorEl={null} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }} TransitionComponent={Fade}>
        <Link to="/Profile" className="header-links">
          <MenuItem className="header-links" onClick={handleClose}>
            Profile
          </MenuItem>
        </Link>

        <Link to="/" className="header-links">
          <MenuItem
            className="header-links"
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  headerButton: {
    fontFamily: "Consolas",
    color: "#e6e6e6",
    marginRight: 5,
    minWidth: 50,
  },
}));

export default Header;
