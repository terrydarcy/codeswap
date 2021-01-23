import React from "react";
import "./styles/Footer.css";

function Footer() {
  return (
    <div className="footerFlex">
      <div className="footer">
        <hr />
        <p>CodeSwap © 2021 Terry D'Arcy</p>
        <a href="./" className="footer_link">
          <p>Terms of service</p>
        </a>
      </div>
    </div>
  );
}

export default Footer;
