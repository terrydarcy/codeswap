import React from "react";
import "./styles/Footer.css";

function Footer() {
  return (
    <div className="footerFlex">
      <div className="footer">
        <p>Cash Group © 2020 Terry &amp; Elvo</p>
        <a href="./" style={{ color: "darkgrey", textDecoration: "none", cursor: "pointer" }}>
          <p>Terms of service</p>
        </a>
      </div>
    </div>
  );
}

export default Footer;
