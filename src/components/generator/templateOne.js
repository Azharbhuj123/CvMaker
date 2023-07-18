import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import { EditorState } from "draft-js";
import { Link } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { AiTwotonePhone } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import ProgressBar from "./progressBar";

import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  sliderData,
  languageData,
  propertiesData,
  coursesData,
  profileRichTextData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
} from "../../Redux/reducers/CvGeneratorReducer";
import moment from "moment";
import {
  Editor,
  // EditorState,
  // getDefaultKeyBinding,
  // RichUtils,
  // convertFromRaw,
} from "draft-js";
import ReactToPrint from "react-to-print";

const TemplateOne = () => {
  let [editorState] = useOutletContext();
  let [displayTemplate, setDisplayTemplate] = useOutletContext();
  let pdfComponent = useRef();
  const cvData = useSelector(CV_DATA);
  const educationData = useSelector(Education_DATA);
  const experianceData = useSelector(Experiance_Data);
  const hobbies = useSelector(getHobbies);
  const accordiansEnabled = useSelector(getAdditionalAccordian);
  const internships = useSelector(getInternships);
  const progressData = useSelector(sliderData);
  const courses = useSelector(coursesData);
  const profileData = useSelector(profileRichTextData);
  const properties = useSelector(propertiesData);
  const languages = useSelector(languageData);
  let printButtonRef = useRef(null);

  const dob = moment(cvData?.DOB).format("LL");
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
        width: "100%",
        alignItems: "center",
        overflowWrap: "break-word",
        flexDirection: "column",
      }}
    >
      <div
        ref={(el) => (pdfComponent = el)}
        style={{
          width: displayTemplate === true ? "100%" : "95%",
          margin: displayTemplate === true ? "0px" : "10px",
          padding: displayTemplate === true ? "0px" : "10px",
        }}
        className="generator-container-right-template"
      >
        <div className="generator-container-right-template-header">
          <img src={cvData?.profileImage} alt="profile" />
          <div className="generator-container-right-template-header-headings">
            <h1>{cvData?.firstName + " " + cvData?.lastName}</h1>
            <div className="generator-container-right-template-header-headings-logodata">
              <div>
                <MdEmail style={{ color: "#fff" }} />
                <h2>{cvData?.email}</h2>
              </div>
              <div>
                <AiTwotonePhone style={{ color: "#fff" }} />
                <h2>{cvData?.phone}</h2>
              </div>
              <div>
                <MdLocationPin style={{ color: "#fff" }} />
                <h2>{cvData?.physicalAddress}</h2>
                {cvData?.zipCode === "" ? null : <h2>,{cvData?.zipCode}</h2>}
                {cvData?.country === "" ? null : <h2>,{cvData?.country}</h2>}
              </div>
            </div>
          </div>
        </div>
        <div className="generator-container-right-template-content">
          <div className="generator-container-right-template-content-wrapper">
            <div className="generator-container-right-template-content-wrapper-left">
              <h1
                onClick={() => {
                  console.log(profileData);
                }}
              >
                Profiel
              </h1>
              <div>
                <Editor
                  editorState={
                    Object.keys(editorState).length === 0
                      ? EditorState.createEmpty()
                      : editorState
                  }
                  readOnly={true}
                ></Editor>
              </div>
              <div className="generator-container-right-template-divider" />
              <div className="generator-spacing" />
              <div className="generator-spacing" />
              <h1>Opleidingen</h1>
              {educationData?.map((item, index) => (
                <div key={index}>
                  <div className="generator-spread-apartText">
                    <p>{item?.study}</p>
                    <p>{item?.startDate + " - " + item?.endDate}</p>
                  </div>
                  <h4>{item?.school}</h4>
                  <p>{item?.additionalInformation}</p>
                </div>
              ))}
              {accordiansEnabled.Praksisplasser === true ? (
                <>
                  <div className="generator-container-right-template-divider" />
                  <div className="generator-spacing" />
                  <div className="generator-spacing" />

                  <h1>Praksisplasser</h1>
                  {internships?.map((item, index) => {
                    return (
                      <div className="generator-spread-apartText">
                        <h4>{item?.jobTitle}</h4>
                        <p>
                          {" "}
                          {moment(item?.startDate).format("MM/YYYY") +
                            " - " +
                            moment(item?.endDate).format("MM/YYYY")}
                        </p>
                      </div>
                    );
                  })}
                </>
              ) : null}
              {accordiansEnabled.Kurs === true ? (
                <>
                  <div className="generator-container-right-template-divider" />
                  <div className="generator-spacing" />
                  <div className="generator-spacing" />

                  <h1>Cursessen</h1>
                  {courses?.map((item, index) => {
                    return (
                      <div key={index} className="generator-spread-apartText">
                        <p>{item?.name}</p>
                        <p>
                          {item?.startDate} -- {item?.endDate}
                        </p>
                      </div>
                    );
                  })}
                </>
              ) : null}
              <div className="generator-container-right-template-divider" />
              <div className="generator-spacing" />
              <div className="generator-spacing" />
              <h1>Werkervaring</h1>
              {experianceData?.map((item, index) => (
                <div style={{ width: "20rem" }} key={index}>
                  <div className="generator-spread-apartText">
                    <p>{item?.jobTitle}</p>
                    <p>{item?.startDate + " - " + item?.endDate}</p>
                  </div>
                  <h4 className="generator-spread-extraDetail">
                    {item?.employer + "," + item?.location}
                  </h4>
                  <p className="generator-spread-extraDetail">
                    {item?.additionalInformation}
                  </p>
                </div>
              ))}
              {/* <div className="generator-spread-apartText">
              <p>Junior projectmanager techniek</p>
              <p>jul. 2016. sep. 2018</p>
            </div>
            <h4>Casia, Utrecht</h4>
            <p>
              Als junior projectmanager begeleidde ik een projectteam van 6
              personen bij de uitvoering van complexe projecten voor
              lichtinstallaties voor de zakelijke markt. Mijn taken waren onder
              andere:
            </p> */}

              {accordiansEnabled.Hobbyer === true ? (
                <>
                  <div className="generator-container-right-template-divider" />
                  <div className="generator-spacing" />
                  <div className="generator-spacing" />

                  <h1>Hobbyer</h1>
                  {hobbies?.map((item, index) => {
                    return (
                      <div className="generator-spread-apartText">
                        <h4>{item?.name}</h4>
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>
            <div className="generator-container-right-template-content-wrapper-divider"></div>
            <div className="generator-container-right-template-content-wrapper-right">
              <h1>Personalia</h1>
              <h4>Geboortedatum</h4>
              <p>{dob}</p>
              {/* <h4>Rejbewjis</h4>
            <p>1 october 1996</p> */}
              {/* <h4>LinkedIn</h4>
              <p>{cvData?.linkedin}</p>
              <h4>Twitter</h4>
              <p>{cvData?.twitter}</p>
              <h4>Github</h4>
              <p>{cvData?.github}</p>
              <h4>StackOverflow</h4>
              <p>{cvData?.stackOverflow}</p>
              <h4>Website</h4>
              <p>{cvData?.website}</p> */}
              {/* <h4>LinkedIn</h4>
            <p>{cvData?.linkedin}</p>

            <h4>LinkedIn</h4>
            <p>{cvData?.linkedin}</p>

            <h4>LinkedIn</h4>
            <p>{cvData?.linkedin}</p> */}
              <div className="generator-container-right-template-divider" />
              <div style={{ marginTop: 15 }} />
              <h1>Vardighdein</h1>
              <div className="generator-spacing" />
              <div className="generator-spacing" />
              {progressData?.map((item) => (
                <>
                  <ProgressBar title={item?.name} percentage={item?.value} />
                  <div className="generator-spacing" />
                  <div className="generator-spacing" />
                </>
              ))}
              {/* 
            <ProgressBar title="Communcatives asdad" percentage="80" />
            <div className="generator-spacing" />
            <div className="generator-spacing" />

            <ProgressBar title="Scrum" percentage="80" />
            <div className="generator-spacing" />

            <ProgressBar title="IPMA" percentage="80" /> */}
              <div className="generator-container-right-template-divider" />
              <div style={{ marginTop: 15 }} />
              <h1>Eigenschappen</h1>
              {properties?.map((item, index) => {
                return (
                  <p key={index} style={{ marginTop: 10 }}>
                    ■ {item?.name}
                  </p>
                );
              })}
              <div className="generator-spacing" />
              <div className="generator-container-right-template-divider" />
              <div className="generator-spacing" />
              <div style={{ marginTop: 15 }} />
              <h1>Talen</h1>
              {languages?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="generator-spacing" />
                    <div className="generator-spacing" />
                    <ProgressBar title={item?.name} percentage={item?.value} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
        }}
      >
        <button
          style={{
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
            cursor: 'pointer'
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
                cursor: 'pointer',
                cursor: 'pointer',
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

export default TemplateOne;
