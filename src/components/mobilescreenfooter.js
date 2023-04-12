import React from "react";
import logo from "../assests/icons/footerlogo.png";

const MobileScreenFooter = () => {
  return (
    <div className="mobilescreenfooter-container">
      <div className="mobilescreenfooter-container-imgdiv">
        <img src={logo} alt="logo" />
      </div>
      <div className="mobilescreenfooter-container-navlinks">
        <div className="mobilescreenfooter-container-navlinks-headone">
          <h2>Utforsk</h2>
          {[1, 2, 3, 4].map((item, index) => (
            <span key={index}>Link</span>
          ))}
        </div>

        <div className="mobilescreenfooter-container-navlinks-headtwo">
          <h2>Annet</h2>
          {[1, 2, 3, 4].map((item, index) => (
            <span key={index}>Link</span>
          ))}
        </div>

        <div className="mobilescreenfooter-container-navlinks-headthree">
          <h2>Annet</h2>
          {[1, 2, 3, 4].map((item, index) => (
            <span key={index}>Link</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileScreenFooter;
