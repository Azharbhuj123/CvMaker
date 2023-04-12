import React from "react";
import { Link } from "react-router-dom";
import cv3 from "../../assests/images/cv13.png";

const CvMaler = () => {
  return (
    <div className="cvm-container">
      <div className="cvm-container-wrapper">
        <div className="cvm-container-wrapper-imgdiv">
          <div className="cvm-container-wrapper-imgdiv-bgSet">
            
          </div>
        </div>
        <div className="cvm-container-wrapper-heading">
          <h6>CV-MALER</h6>
          <h1>Finn riktig stil til jobben du ønsker</h1>
          <span>
            Vi har en rekke CV-maler som gjør det lett for deg å finne riktig
            stil til jobben du skal søke på.
          </span>

          <div className="cvm-container-wrapper-heading-btn">
            <Link to="/maler">
            <button>Lag gratis CV</button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvMaler;
