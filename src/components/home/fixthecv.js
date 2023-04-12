import React from "react";
import divImg from "../../assests/icons/divset.png";
import abc from "../../assests/icons/abc.png";
import imgdiv2 from "../../assests/icons/divimg2.png";
import boy1 from "../../assests/images/boy1.png";
import boy2 from "../../assests/images/boy2.png";
import girl1 from "../../assests/images/girl1.png";
import girl2 from "../../assests/images/girl2.png";

const FixTheCv = () => {
  return (
    <div className="fxc-container">
      <div className="fxc-container-wrapper">
        <div className="fxc-container-wrapper-heading">
          <h1>
            Flere hundre personer stoler på CV hjelperen til å lage profesjonell
            Cv
          </h1>
        </div>

        <div className="fxc-container-wrapper-quote">
          <div className="fxc-container-wrapper-quote-commaOne">
            <span>“</span>
          </div>
          <div className="fxc-container-wrapper-quote-para">
            <p>
              Det var helt utrolig enkelt å lage en CV hos CV hjelperen. Fikk
              min første jobb etter jeg søkte jobb med den. Anbefaler alle å
              prøve!
            </p>
          </div>
          <div className="fxc-container-wrapper-quote-commaTwo">
            <span>“</span>
          </div>
        </div>

        <div className="fxc-container-wrapper-divset">
          <img alt="divImg" src={divImg} />
        </div>
        <div className="fxc-container-wrapper-profileimages">
          <div className="fxc-container-wrapper-profileimages-pfone">
            <img src={girl1} alt="abc" />
            <div className="fxc-container-wrapper-profileimages-pfone-heading">
              <span>Kari</span>
              <h6>Johnsen</h6>
            </div>
          </div>

          <div className="fxc-container-wrapper-profileimages-quotesdiv">
            <div className="fxc-container-wrapper-profileimages-quotesdiv-divone">
              <div className="fxc-container-wrapper-profileimages-quotesdiv-divone-imgset">
                <p>
                  “Har alltid syntes at det har vært vanskelig å lage CV.
                  Blogginnleggene og Cv generatoren gjorde det veldig lett å
                  lage en fin cv!”
                </p>
              </div>
              <img
                className="fxc-container-wrapper-profileimages-quotesdiv-divone-imgmargin"
                src={imgdiv2}
                alt="imgdiv2"
              />
              <div className="fxc-container-wrapper-profileimages-quotesdiv-divone-proset">
                <img src={boy1} alt="abc" />
                <div className="fxc-container-wrapper-profileimages-pfone-heading">
                  <span>Erling</span>
                  <h6>Paulsen</h6>
                </div>
              </div>
            </div>

            <div className="fxc-container-wrapper-profileimages-quotesdiv-divone">
              <div className="fxc-container-wrapper-profileimages-quotesdiv-divone-imgset">
                <p>
                  “Jeg valgte å bruke cv hjelperen til å lage cv når jeg søkte
                  jobb. De var de eneste som ikke tok betalt for det. Er veldig
                  fornøyd med resultatet og ble innkalt til mange intervjuer”
                </p>
              </div>
              <img
                className="fxc-container-wrapper-profileimages-quotesdiv-divone-imgmargin"
                src={imgdiv2}
                alt="imgdiv2"
              />
              <div className="fxc-container-wrapper-profileimages-quotesdiv-divone-proset">
                <img src={girl2} alt="abc" />
                <div className="fxc-container-wrapper-profileimages-pfone-heading">
                  <span>Stine</span>
                  <h6>Eliassen</h6>
                </div>
              </div>
            </div>

            <div className="fxc-container-wrapper-profileimages-quotesdiv-divone">
              <div className="fxc-container-wrapper-profileimages-quotesdiv-divone-imgset">
                <p>
                  “En veldig fin nettside for å lage cv på. De gjør det veldig
                  enkelt å lage en profesjonell cv. Fikk jobb hos DNB”
                </p>
              </div>
              <img
                className="fxc-container-wrapper-profileimages-quotesdiv-divone-imgmargin"
                src={imgdiv2}
                alt="imgdiv2"
              />
              <div className="fxc-container-wrapper-profileimages-quotesdiv-divone-proset">
                <img src={boy2} alt="abc" />
                <div className="fxc-container-wrapper-profileimages-pfone-heading">
                  <span>Stian</span>
                  <h6>Brym</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="fxc-container-wrapper-btn">
          <button>Lag gratis CV</button>
        </div> */}
      </div>
    </div>
  );
};

export default FixTheCv;
