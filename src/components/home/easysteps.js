import React, { useEffect, useState } from "react";
import cvstepone from "../../assests/images/cvstepone.png";
import mainPicture from "../../assests/images/mainpicture.png";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import { step1Content, step2Content, step3Content } from "./stepperSteps";
import { Link } from "react-router-dom";
const EasySteps = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  let resizeWindow = () => {
    setWindowWidth(window.screen.width);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <div className="easysteps-container">
      <div className="easysteps-container-wrapper">
        <div className="easysteps-container-wrapper-heading" id="switch">
          <h1>Tre enkle steg for å lage en jobbvinnende CV</h1>
        </div>
        {windowWidth > 980 ? (
          <>
            {" "}
            <div className="easysteps-container-wrapper-stepsdiv">
              <div className="easysteps-container-wrapper-stepsdiv-stepone">
                <div className="easysteps-container-wrapper-stepsdiv-stepone-imgdiv">
                  <div className="cirlce">
                    <span>1</span>
                  </div>
                  <div className="easysteps-container-wrapper-stepsdiv-stepone-imgdiv-head">
                    <h1>Velg mal</h1>
                    <p>Det er umulig å gjøre feil valg. Alle våre maler er godkjent.</p>
                  </div>
                </div>
                <div className="easysteps-container-wrapper-stepsdiv-stepone-sideimg">
                  <img src={mainPicture} alt="cvstepone" />
                </div>
              </div>
            </div>
            <div className="easysteps-container-wrapper-stepstwodiv">
              <div className="easysteps-container-wrapper-stepstwodiv-container">
                <div className="easysteps-container-wrapper-stepstwodiv-container-imgtwo">
                  <img src={mainPicture} alt="cvstepone" />
                </div>

                <div className="easysteps-container-wrapper-stepstwodiv-container-content">
                  <div style={{ width: "11%", zIndex: "3" }}>
                    <div className="cirlce">
                      <span>2</span>
                    </div>
                  </div>

                  <div className="easysteps-container-wrapper-stepstwodiv-container-content-heading">
                    <h1>Fyll inn riktig informasjon</h1>
                    <p>Med vår generator kan du enkelt redigere all informasjon</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="easysteps-container-wrapper-stepsthreediv">
              <div className="easysteps-container-wrapper-stepsthreediv-container">
                <div className="easysteps-container-wrapper-stepsthreediv-container-head">
                  <div style={{ width: "11%", zIndex: "3" }}>
                    <div className="cirlce">
                      <span>3</span>
                    </div>
                  </div>

                  <div className="easysteps-container-wrapper-stepstwodiv-container-content-heading">
                    <h1>Lagre CVen</h1>
                    <p>Når du er fornøyd lagrer du CVen og sender den videre</p>
                  </div>
                </div>
                <div className="easysteps-container-wrapper-stepsthreediv-container-imgDiv">
                  <img src={mainPicture} alt="cvstepone" />
                </div>
              </div>
            </div>
            <div class="easysteps-container-wrapper-btn">
              <Link to="/maler">
                <button >Lag gratis CV</button>
              </Link>
            </div>
          </>
        ) : (
          <div className="easysteps-container-wrapper-mobilescreendiv">
            <div className="easysteps-container-wrapper-mobilescreendiv-card">
              <div className="easysteps-container-wrapper-mobilescreendiv-card-imgdiv">
                <img src={mainPicture} alt="img" />
              </div>
              <div className="easysteps-container-wrapper-mobilescreendiv-card-content">
                <div className="cirlce">
                  <span>1</span>
                  <div className="line"></div>
                </div>
                <div className="easysteps-container-wrapper-mobilescreendiv-card-heading">
                  <h2>Velg mal</h2>
                  <p>Det er umulig å gjøre feil valg. Alle våre maler er godkjent.</p>
                </div>
              </div>
            </div>

            <div className="easysteps-container-wrapper-mobilescreendiv-card">
              <div className="easysteps-container-wrapper-mobilescreendiv-card-imgdiv">
                <img src={mainPicture} alt="img" />
              </div>
              <div className="easysteps-container-wrapper-mobilescreendiv-card-content">
                <div className="cirlce">
                  <span>2</span>
                </div>
                <div className="easysteps-container-wrapper-mobilescreendiv-card-heading">
                  <h2>Fyll inn riktig informasjon</h2>
                  <p>Med vår generator kan du enkelt redigere all informasjon</p>
                </div>
              </div>
            </div>

            <div className="easysteps-container-wrapper-mobilescreendiv-card">
              <div className="easysteps-container-wrapper-mobilescreendiv-card-imgdiv">
                <img src={mainPicture} alt="img" />
              </div>

              <div className="easysteps-container-wrapper-mobilescreendiv-card-content">
                <div className="cirlce-last">
                  <span>3</span>
                </div>
                <div className="easysteps-container-wrapper-mobilescreendiv-card-heading">
                  <h2>Lagre CVen</h2>
                  <p>Når du er fornøyd lagrer du CVen og sender den videre</p>
                </div>
              </div>
            </div>
            <div className="easysteps-container-wrapper-mobilescreendiv-card">
              <Link to="/maler" style={{color:"none", underline:"#000000",display:"flex", justifyContent:"center",textDecoration:"none"}}>
              <button>Lag gratis CV</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EasySteps;
