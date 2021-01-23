import React, { useState, useContext } from "react";
import "./styles/Header.css";
import { makeStyles, Button, IconButton } from "@material-ui/core";
import { AppBar } from "@material-ui/core";

function Header() {
  const classes = useStyles();

  return (
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
          <IconButton id="header_profile_button" className="header_profile-button far fa-user fa-5x" size="medium" />
        </div>
      </div>
    </AppBar>
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
