import React, { useRef } from "react";
import { useOutletContext, Link } from "react-router-dom";
import ProgressBar from "./progressBar";
import { useSelector } from "react-redux";
import userprofile from "../../assests/images/pr.png";
import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  profileRichTextData,
  sliderData,
  coursesData,
  referenceData,
  languageData,
  propertiesData,
  getAdditionalAccordian,
  getHobbies,
  getInternships,
} from "../../Redux/reducers/CvGeneratorReducer";
import moment from "moment";
import ReactToPrint from "react-to-print";

import { Editor, EditorState } from "draft-js";
const TemplateThirteen = () => {
  const cvData = useSelector(CV_DATA);
  const educationData = useSelector(Education_DATA);
  const experianceData = useSelector(Experiance_Data);
  const courses = useSelector(coursesData);
  const refrence = useSelector(referenceData);
  let printButtonRef = useRef();
  let [displayTemplate, setDisplayTemplate] = useOutletContext();
  let [editorState, setEditorState, contexxt] = useOutletContext();
  const languages = useSelector(languageData);
  const properties = useSelector(propertiesData);
  const skills = useSelector(propertiesData);
  const enabledAccordians = useSelector(getAdditionalAccordian);
  const hobbies = useSelector(getHobbies);
  const internships = useSelector(getInternships);

  let pdfComponent = useRef();
  if (displayTemplate && displayTemplate === true) {
    console.log(
      "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
    );
    console.log("wow");
    printButtonRef.current.click();
  }
  return (
    <div
      style={{
        display: displayTemplate === true ? "none" : "flex",
        width: "95%",
        alignItems: "center",
        overflowWrap: "break-word",
        flexDirection: "column",
        marginTop: "10px",
      }}
      onClick={() => console.log(enabledAccordians, "<------- maal khulla")}
    >
      <div
        ref={(el) => (pdfComponent = el)}
        style={{ width: "100%", margin: "0px", padding: "0px" }}
        className="template-thirteen-container"
      >
        <div className="template-thirteen-container-wrapper">
          <div className="template-thirteen-container-wrapper-left">
            <div className="template-thirteen-container-wrapper-left-section"></div>
            <div className="template-thirteen-container-wrapper-left-profile">
              <img
                alt="profiel"
                src={cvData.profileImage ? cvData.profileImage : userprofile}
              />
            </div>
            <div className="template-thirteen-container-wrapper-left-heading">
              <h1>
                {cvData.firstName ? cvData?.firstName : "Your Name"}
                {cvData.lastName ? cvData?.lastName : " "}
              </h1>
              <h3> {cvData?.jobTitle}</h3>
              <h4> PROFIL</h4>
              <br />
              <span>
                <Editor
                  editorState={
                    Object.keys(editorState).length === 0
                      ? EditorState.createEmpty()
                      : editorState
                  }
                  readOnly={true}
                ></Editor>
              </span>
              <h4>PERSONALIG INFORMASJON</h4>
              <br />
              <span>
                Telefon: {cvData.phone ? cvData.phone : "din telefon"}
              </span>
              <br />
              <span>
                {" "}
                Adresse:{" "}
                {cvData.physicalAddress
                  ? cvData.physicalAddress
                  : "adressen din"}
              </span>
              <br />
              {cvData.DOB === "Invalid Date" || cvData.DOB === "" ? null : (
                <>
                  <br />
                  <span>Fødselsdato: {cvData?.DOB.format("DD,MM,YYYY")}</span>
                </>
              )}
              {cvData?.drivingLicense === "" ? null : (
                <>
                  <br />
                  <span>Førerkort: {cvData?.drivingLicense}</span>
                </>
              )}

              {enabledAccordians.Referanser ? (
                <>
                  <h4>REFERANSER</h4>
                  {refrence?.map((item) => (
                    <>
                      <p>{item?.name}</p>
                      <span>{item?.companyName}</span>
                      <br />
                      <span>{item?.email}</span>
                    </>
                  ))}
                </>
              ) : null}
              {enabledAccordians.Hobbyer ? (
                <>
                  <h4>Hobbyer</h4>
                  {hobbies?.map((item, index) => (
                    <p key={index}>{item?.name}</p>
                  ))}
                </>
              ) : null}
            </div>
          </div>
          <div className="template-thirteen-container-wrapper-right">
            <div className="template-thirteen-container-wrapper-right-head">
              <div className="template-thirteen-container-wrapper-right-head-wrapper">
                <h1>FERDIGHETER</h1>
              </div>
              <div className="template-thirteen-container-wrapper-right-head-bullet"></div>
            </div>
            <div className="template-thirteen-container-wrapper-right-content">
              {skills.map((item) => (
                <div className="template-thirteen-container-progress">
                  <p>{item?.name}</p>
                  <div>
                    <div></div>
                    <div>
                      <div
                        style={{ width: `${item?.value}%`, height: "auto" }}
                      ></div>
                    </div>
                  </div>
                  <span>{item?.value}</span>
                </div>
              ))}
            </div>
            <div className="template-thirteen-container-spacing" />

            <div className="template-thirteen-container-spacing" />

            <div className="template-thirteen-container-spacing" />
            <div className="template-thirteen-container-wrapper-right-head">
              <div className="template-thirteen-container-wrapper-right-head-wrapper">
                <h1>ARBEIDSERFARING</h1>
              </div>
              <div className="template-thirteen-container-wrapper-right-head-bullet"></div>
            </div>
            <div className="template-thirteen-container-wrapper-right-content">
              {/* {experianceData} */}
              {experianceData?.map((item) => (
                <>
                  <div className="template-thirteen-container-wrapper-right-content-heading">
                    <h4>● {item?.jobTitle},</h4>
                    <h3>{item?.location}</h3>
                  </div>
                  <p>
                    {moment(item?.startDate).format("DD MM YYYY") +
                      " til " +
                      moment(item?.endDate).format("DD MM YYYY")}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                </>
              ))}
            </div>
            {enabledAccordians.Praksisplasser === true ? (
              <>
                <div className="template-thirteen-container-spacing" />
                <div className="template-thirteen-container-wrapper-right-head">
                  <div className="template-thirteen-container-wrapper-right-head-wrapper">
                    <h1>Praksisplasser</h1>
                  </div>
                  <div className="template-thirteen-container-wrapper-right-head-bullet"></div>
                </div>
                <div className="template-thirteen-container-wrapper-right-content">
                  {/* {experianceData} */}
                  {internships?.map((item) => (
                    <>
                      <div className="template-thirteen-container-wrapper-right-content-heading">
                        <h4>● {item?.jobTitle},</h4>
                        {/* <h3>{item?.location}</h3> */}
                      </div>
                      <p>
                        {moment(item?.startDate).format("DD MM YYYY") +
                          " til " +
                          moment(item?.endDate).format("DD MM YYYY")}
                      </p>
                      <span>{item?.additionalInformation}</span>
                    </>
                  ))}
                </div>
              </>
            ) : null}
            <div className="template-thirteen-container-spacing" />
            <div className="template-thirteen-container-spacing" />

            <div className="template-thirteen-container-wrapper-right-head">
              <div className="template-thirteen-container-wrapper-right-head-wrapper">
                <h1>Utdanning</h1>
              </div>
              <div className="template-thirteen-container-wrapper-right-head-bullet"></div>
            </div>
            <div className="template-thirteen-container-wrapper-right-content">
              {/* {courses} */}
              {educationData?.map((item) => (
                <>
                  <div className="template-thirteen-container-wrapper-right-content-heading">
                    <h4>● {item?.school},</h4>
                    <h3>{item?.study}</h3>
                  </div>
                  <p>
                    {moment(item?.startDate).format("YYYY") +
                      " til " +
                      moment(item?.endDate).format("YYYY")}
                  </p>
                   <div
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                </>
              ))}
            </div>
            {enabledAccordians.Kurs === true ? (
              <>
                <div className="template-thirteen-container-spacing" />
                <div className="template-thirteen-container-spacing" />
                <div className="template-thirteen-container-wrapper-right-head">
                  <div className="template-thirteen-container-wrapper-right-head-wrapper">
                    <h1>Currsen</h1>
                  </div>
                  <div className="template-thirteen-container-wrapper-right-head-bullet"></div>
                </div>
                <div className="template-thirteen-container-wrapper-right-content">
                  {/* {courses} */}
                  {courses?.map((item) => (
                    <>
                      <div className="template-thirteen-container-wrapper-right-content-heading">
                        <h4>● {item?.name}</h4>
                        <h3>Arbeidssted</h3>
                      </div>
                      <p>
                        {" "}
                        {moment(item?.startDate).format("DD MM YYYY") +
                          " til " +
                          moment(item?.endDate).format("DD MM YYYY")}
                      </p>
                    </>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button
          style={{
            margin: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "180px",
            borderRadius: "5px",
            gap: "5px",
            background: "#F6F3F1",
            padding: "10px",
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "16px",
            border: "1px solid #F6F3F1",
            backgroundColor: "#eeb856",
          }}
        >
          Endre mal
        </button>
        <div className="gdpr-image">
          <span>
            Ved å trykke på "laste ned", vil du laste ned CVen du har laget
            forplikte deg til å akseptere våre{" "}
            <Link to="/gdpr">
              <span>vilkår og betingelser</span>
            </Link>{" "}
            og{" "}
            <Link to="/gdpr">
              <span>personvernregler</span>
            </Link>
          </span>
        </div>
        <ReactToPrint
          trigger={() => (
            <button
              ref={printButtonRef}
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "180px",
                borderRadius: "5px",
                gap: "5px",
                background: "#F6F3F1",
                padding: "10px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                border: "1px solid #F6F3F1",
                backgroundColor: "#eeb856",
                margin: "10px",
              }}
            >
              Last ned CV
            </button>
          )}
          content={() => pdfComponent}
          onAfterPrint={() => setDisplayTemplate(false)}
        />
      </div>
    </div>
  );
};

export default TemplateThirteen;
