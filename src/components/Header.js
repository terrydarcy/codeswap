import React, { useState, useContext } from "react";
import "./styles/Header.css";
import { AppBar } from "@material-ui/core";

function Header() {
  return (
    <AppBar position="static">
      <div className="headerContainer">
        <div className="header_logo_container">
          <a href="/" className="homelink">
            <h1 style={{ margin: 0 }}>
              code<span className="header_text_color_mod">swap</span>
            </h1>
          </a>
        </div>
        <div className="header_nav_container"></div>
      </div>
    </AppBar>
  );
}

export default Header;
