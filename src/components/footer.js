import React from "react";
import { Link } from "react-router-dom";
import logo from "../assests/icons/logo-light.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-container-wrapper">
        <div className="footer-container-wrapper-logodiv">
          <img src={logo} alt="logo" />
        </div>

        <div className="footer-container-wrapper-headinglinks">
          <h1>Utforsk</h1>
          {/* <div className="footer-container-wrapper-headinglinks-link">
            {[1, 2, 3, 4].map((item, index) => (
              <span key={index}>Link</span>
            ))}
          </div> */}
          <div className="footer-container-wrapper-headinglinks-link">
            <Link style={{ textDecoration: "none", color: "black" }} to="/maler">
              <span>Maler</span>
            </Link>
          </div>
          <div className="footer-container-wrapper-headinglinks-link">
            <a style={{ textDecoration: "none", color: "black" }} href="https://karrieresenteret.recman.no/" target="_blank">
              <span>Ledige stillinger</span>
            </a>
          </div>
          <div className="footer-container-wrapper-headinglinks-link">
            <a style={{ textDecoration: "none", color: "black" }} href="https://www.cvhjelperen-blogg.no/" target="_blank">
              <span>Blogg</span>
            </a>
          </div>
        </div>

        <div className="footer-container-wrapper-headinglinks">
          <h1>Annet</h1>
          <div className="footer-container-wrapper-headinglinks-link">
            <Link style={{ textDecoration: "none", color: "black" }} to="/gdpr">
              <span>GDPR</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-container-cc">
        <h2>© 2022 CV hjelperen - Org nr 929 345 304</h2>
      </div>
    </div>
  );
};

export default Footer;
