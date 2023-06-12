import React, { useState, useRef } from "react";
import UserProfile from "../../assests/images/userProfile.jpg";
import { BsTelephone } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { useOutletContext, Link } from "react-router-dom";
import Modal from "react-modal";
import { EditorState } from "draft-js";

import { FiTwitter, FiGithub } from "react-icons/fi";
import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  sliderData,
  profileRichTextData,
  coursesData,
  propertiesData,
  languageData,
  referenceData,
} from "../../Redux/reducers/CvGeneratorReducer";
import moment from "moment";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

import {
  Editor,
  getDefaultKeyBinding,
  RichUtils,
  convertFromRaw,
} from "draft-js";
import ProgressBar from "./progressBar";
import { useEffect } from "react";
const TemplateSeven = () => {
  let pdfComponent = useRef();
  let printButtonRef = useRef();
  const cvData = useSelector(CV_DATA);
  const educationData = useSelector(Education_DATA);
  const experianceData = useSelector(Experiance_Data);
  const progressData = useSelector(sliderData);
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  let [displayTemplate, setDisplayTemplate] = useOutletContext();
  const reference = useSelector(referenceData);

  const courses = useSelector(coursesData);

  const properties = useSelector(propertiesData);
  const hobbies = useSelector(getHobbies);
  const accordiansEnabled = useSelector(getAdditionalAccordian);
  const internships = useSelector(getInternships);
  const profileData = useSelector(profileRichTextData);
  const dob = moment(cvData?.DOB).format("DD,MM,YYYY");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  let [editorState, setEditorState, contexxt] = useOutletContext();
  const languages = useSelector(languageData);

  if (displayTemplate && displayTemplate === true) {
    console.log(
      "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
    );
    console.log("wow", printButtonRef);
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
        style={{
          width: displayTemplate === true ? "100%" : "95%",
          margin: displayTemplate === true ? "0px" : "10px",
          padding: displayTemplate === true ? "0px" : "10px",
        }}
        ref={(el) => (pdfComponent = el)}
        className="template-seven-container"
      >
        <div className="template-seven-container-header">
          <div className="template-seven-container-header-wrapper">
            <div className="template-seven-container-header-wrapper-image">
              <img
                src={cvData.profileImage ? cvData.profileImage : UserProfile}
              />
            </div>
            <div>
              <h1>{cvData?.firstName + " " + cvData?.lastName}</h1>
              <p>{cvData?.jobTitle}</p>
              {/* <p>
              {" "}
              <Editor
                editorState={
                  Object.keys(profileData).length === 0
                    ? EditorState.createEmpty()
                    : profileData
                }
                readOnly={true}
              ></Editor>
            </p> */}
            </div>
          </div>
        </div>
        <div className="template-seven-container-content">
          <div className="template-seven-container-content-left">
            <h1 className="template-seven-container-content-left-heading">
              DETALJER
            </h1>
            <div className="template-seven-container-content-left-content">
              {cvData && cvData.email ? (
                <>
                  <div className="template-seven-container-content-left-content-icon">
                    <AiOutlineMail size={22} color={"#CA9B51"} />
                  </div>
                  <p>{cvData?.email}</p>
                </>
              ) : null}

              {cvData && cvData.phone ? (
                <>
                  <span />
                  <div className="template-seven-container-content-left-content-icon">
                    <BsTelephone size={22} color={"#CA9B51"} />
                  </div>
                  <p>{cvData?.phone}</p>
                </>
              ) : null}
              {/* 
              {cvData && cvData.linkedin ? (
                <>
                  <span />
                  <div className="template-seven-container-content-left-content-icon">
                    <FiLinkedin size={22} color={"#CA9B51"} />
                  </div>
                  <p>{cvData?.linkedin}</p>
                </>
              ) : null}

              {cvData && cvData.github ? (
                <>
                  <span />
                  <div className="template-seven-container-content-left-content-icon">
                    <FiGithub size={22} color={"#CA9B51"} />
                  </div>
                  <p>{cvData?.github}</p>
                </>
              ) : null}
              <span />

              {cvData && cvData.twitter ? (
                <>
                  <div className="template-seven-container-content-left-content-icon">
                    <FiTwitter size={22} color={"#CA9B51"} />
                  </div>
                  <p>{cvData?.twitter}</p>
                </>
              ) : null} */}

              <span />
              <p>Andre relevante lenker</p>
              <span />
              <span />
              <h3>Talen</h3>
              <div className="template-seven-container-content-left-content-divider" />
              {languages?.map((item, index) => {
                return <p> ■ {item?.name}</p>;
              })}
            </div>
            <div className="template-seven-container-content-left-content">
              <h3>Eigenschappen</h3>
              <div className="template-seven-container-content-left-content-divider" />

              {properties?.map((item, index) => {
                return (
                  <p key={index} style={{ marginTop: 10 }}>
                    ■ {item?.name}
                  </p>
                );
              })}
            </div>
            {accordiansEnabled.Hobbyer === true ? (
              <div className="template-seven-container-content-left-content">
                <h3>Hobbyer</h3>
                <div className="template-seven-container-content-left-content-divider" />

                {hobbies?.map((item, index) => {
                  return (
                    <p key={index} style={{ marginTop: 10 }}>
                      ■ {item?.name}
                    </p>
                  );
                })}
              </div>
            ) : null}
            {accordiansEnabled.Referanser === true ? (
              <div className="template-seven-container-content-left-content">
                <h3>Referanser</h3>
                <div className="template-seven-container-content-left-content-divider" />

                {reference?.map((item, index) => {
                  return (
                    <p key={index} style={{ marginTop: 10 }}>
                      ■ {item?.name}
                    </p>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="template-seven-container-content-right">
            <h1 className="template-seven-container-content-right-heading">
              PROFIL
            </h1>
            <div className="template-seven-container-spacing" />
            <span>
              <Editor
                editorState={
                  Object.keys(editorState).length === 0
                    ? EditorState.createEmpty()
                    : editorState
                }
                readOnly={true}
              ></Editor>

              <div className="template-seven-container-spacing" />
            </span>

            <h1 className="template-seven-container-content-right-heading">
              Werkervaring
            </h1>
            {/* {experianceData?.map((item) => (
              <div>
                <span>● </span>
                <span>{item?.jobTitle + " "}</span>
                <span>
                  {item.startDate.length > 1
                    ? moment(item?.startDate).format("DD MM YYYY")
                    : "Startdato "}
                </span>
                <span>{" - till - "}</span>
                <span>
                  {item.endDate.length > 1
                    ? moment(item?.endDate).format("DD MM YYYY")
                    : "Enddato "}
                </span>
                <br />
                <p>{item?.additionalInformation}</p>
              </div>
            ))} */}
            {experianceData.map((item) => (
              <div className="template-seven-container-content-right-content">
                <h3>{item?.jobTitle}</h3>
                <div className="" style={{ display: "flex", gap: "1rem" }}>
                  <p>
                    {item.startDate.length > 1
                      ? moment(item?.startDate).format("DD MM YYYY")
                      : "Startdato "}
                  </p>
                  <p>
                    {item.endDate.length > 1
                      ? moment(item?.endDate).format("DD MM YYYY")
                      : "Enddato "}
                  </p>
                </div>
                <span />
                <p> {item?.additionalInformation}</p>
                <span />
              </div>
            ))}
            {accordiansEnabled.Praksisplasser === true ? (
              <>
                <h1 className="template-seven-container-content-right-heading">
                  Praksisplasser
                </h1>
                {internships.map((item) => (
                  <div className="template-seven-container-content-right-content">
                    <h3>{item?.jobTitle}</h3>
                    <div className="" style={{ display: "flex", gap: "1rem" }}>
                      <p>
                        {item.startDate.length > 1
                          ? moment(item?.startDate).format("DD MM YYYY")
                          : "Startdato "}
                      </p>
                      -
                      <p>
                        {item.endDate.length > 1
                          ? moment(item?.endDate).format("DD MM YYYY")
                          : "Enddato "}
                      </p>
                    </div>
                    <span />
                    <p> {item?.additionalInformation}</p>
                    <span />
                  </div>
                ))}
              </>
            ) : null}
            <h1 className="template-seven-container-content-right-heading">
              UTDANNING
            </h1>
            {educationData?.map((item) => (
              <div className="template-seven-container-content-right-content">
                <h3>{item?.study}</h3>
                <p>{item?.school}</p>
                <span />
                <p>{item?.additionalInformation}</p>
                <span />
                <span />
              </div>
            ))}
            {accordiansEnabled.Kurs === true ? (
              <>
                <h1 className="template-seven-container-content-right-heading">
                  Cursessen
                </h1>
                <div className="template-seven-container-content-right-content">
                  {courses?.map((item) => (
                    <div style={{ marginTop: 10 }}>
                      <span>
                        {" ● " +
                          item?.name +
                          " " +
                          moment(item?.startDate).format("DD MM YYYY") +
                          " til " +
                          moment(item?.endDate).format("DD MM YYYY")}
                      </span>
                    </div>
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
          width: "90%",
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
            margin: "10px",
          }}
        >
          Endre mal
        </button>
        

        <div className="gdpr-image">
        <input
                type="checkbox"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
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
              }}
              disabled={!isChecked}
            >
              Last ned CV
            </button>
          )}
          content={() => pdfComponent}
          onAfterPrint={() => setDisplayTemplate(false)}
        />
        {/* <button
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
          onClick={openModal}
        >
          {" "}
          Las ned
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Policy Agreement"
        >
          <div>
            <div
              style={{
                display: "flex",
                fontFamily: " Montserrat",
                fontSize: "12px",
                fontWeight: "400",
                color: "#0a1b28",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
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
            <div
              style={{ display: "flex", justifyContent: "center", gap: "15px" }}
            >
              <input
                type="checkbox"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label
                for="coding"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                Jeg godtar vilkårene ovenfor
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
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
                    // onClick={closeModal}
                    disabled={isChecked === false}
                  >
                    Sende inn
                  </button>
                )}
                content={() => pdfComponent}
                onAfterPrint={() => setDisplayTemplate(false)}
              />
            </div>
          </div>
        </Modal> */}
      </div>
    </div>
  );
};

export default TemplateSeven;
