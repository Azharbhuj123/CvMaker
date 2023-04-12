import React from "react";
import { Link } from "react-router-dom";
import tick from "../../assests/icons/tick.png";
import SS from "../../assests/images/section.jpg";

const JobWiningResume = () => {
  return (
    <div className="jobwiningresume-container">
      <div className="jobwiningresume-container-wrapper">
        <div className="jobwiningresume-container-wrapper-heading">
          <h1>Aldri før har det vært enklere å lage en jobbvinnende CV</h1>
        </div>
        <div className="jobwiningresume-container-wrapper-content">
          <div className="jobwiningresume-container-wrapper-content-heading">
            <span>Funksjoner</span>
            <h1>Rediger online i vår enkle generator</h1>
            <p>
              Vår generator har en rekke funksjoner som gjør det enklere for deg å lage en
              profesjonell CV
            </p>

            <div className="jobwiningresume-container-wrapper-content-heading-tickdiv">
              <img src={tick} alt="tick" />
              <h6>
                Online:{" "}
                <strong id="strongfont">Generatoren vår fungerer utmerket online</strong>
              </h6>
            </div>
            <div className="jobwiningresume-container-wrapper-content-heading-tickdiv">
              <img src={tick} alt="tick" />
              <h6>
              Flere maler:{" "}
                <strong id="strongfont">Vi har flere godkjente maler du kan velge mellom</strong>
              </h6>
            </div>
            <div className="jobwiningresume-container-wrapper-content-heading-tickdiv">
              <img src={tick} alt="tick" />
              <h6>
              Helt gratis: <strong id="strongfont">Det er helt kostnadsfritt å lage CV hos oss</strong>
              </h6>
            </div>

            <div className="jobwiningresume-container-wrapper-content-heading-tickdiv">
              <img src={tick} alt="tick" />
              <h6>
                Lagre som PDF: <strong id="strongfont">Last ned CVen når du er ferdig</strong>
              </h6>
            </div>

            <div className="jobwiningresume-container-wrapper-content-heading-btn">
              <Link to="/maler">
                <button>Lag gratis CV</button>
              </Link>
            </div>
          </div>

          <div className="jobwiningresume-container-wrapper-content-imgdiv">
            {/* <div className="jobwiningresume-container-wrapper-content-imgdiv-bg"></div> */}
            <img
              className="jobwiningresume-container-wrapper-content-imgdiv-bg"
              src={SS}
              alt="generator"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWiningResume;
