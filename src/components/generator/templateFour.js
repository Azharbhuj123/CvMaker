import { EditorState } from "draft-js";
import { Editor } from "draft-js";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CourseGeneratorAccordian from "./courseGeneratorAccordian";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  languageData,
  profileRichTextData,
  getAdditionalAccordian,
  propertiesData,
  referenceData,
  sliderData,
  getInternships,
  getHobbies,
} from "../../Redux/reducers/CvGeneratorReducer";
import {
  addCourse,
  addEducationData,
  addLanguage,
  addProperty,
  addSlider,
  cvGenerator,
  editLanguage,
  addReference,
  saveDataAction,
  editAdditonalAccordian,
  editInternship,
  addToInternship,
  addToHobby,
} from "../../Redux/actions/CvGeneratorAction";
import moment from "moment";
import ReactToPrint from "react-to-print";
import EndreMaalButton from "../endreMaalButton/EndreMaalButton";
import { sendFileToBackend } from "../../helper/helperFunctions";
import html2canvas from "html2canvas";

const TemplateFour = () => {
  let [editorState, setEditorState] = useOutletContext();
  const accordiansEnabled = useSelector(getAdditionalAccordian);
  let [displayTemplate, setDisplayTemplate] = useOutletContext();
  console.log(editorState, "++++++++++++++++++++++++++++++");
  console.log(setEditorState, "++++++++++++++++++++++++++++++");
  const hobbies = useSelector(getHobbies);
  const additionalAccordians = useSelector(getAdditionalAccordian);
  const dispatch = useDispatch();

  let pdfComponent = useRef();
  let printButtonRef = useRef();
  const cvData = useSelector(CV_DATA);
  const educationData = useSelector(Education_DATA);
  const refrence = useSelector(referenceData);
  const experianceData = useSelector(Experiance_Data);
  const progressData = useSelector(sliderData);
  const courses = useSelector(coursesData);
  const profileData = useSelector(profileRichTextData);
  const properties = useSelector(propertiesData);
  const languages = useSelector(languageData);
  const startDate = moment(educationData?.startDate).format("YYYY");
  const internships = useSelector(getInternships);

  if (displayTemplate && displayTemplate === true) {
    console.log(
      "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
    );
    console.log("wow");
    printButtonRef.current.click();
  }

  const sendPrintedDocument = async () => {
    const input = document.getElementsByClassName("template-five-container");
    html2canvas(input[0]).then(async (canvas) => {
      const imgData = canvas.toDataURL("image/png");
      await sendFileToBackend(imgData, cvData.email);
    });
  };

  return (
    <div
      onClick={() => console.log(accordiansEnabled)}
      style={{
        display: displayTemplate === true ? "none" : "flex",
        width: "100%",
        alignItems: "center",
        overflowWrap: "break-word",
        flexDirection: "column",
        paddingTop: "0px",
        paddingLeft: "10px",
      }}
    >
      <div
        ref={(el) => (pdfComponent = el)}
        style={{
          width: displayTemplate === true ? "100%" : "100%",
          margin: displayTemplate === true ? "0px" : "10px",
          padding: displayTemplate === true ? "0px" : "10px",
        }}
        className="template-four-container"
      >
        <title>{cvData.saveAs}</title>
        <div className="template-four-container-wrapper">
          <div className="template-four-container-wrapper-divOne">
            {/* <div className="template-four-container-wrapper-divOne-circle">
            <h2>KN</h2>
          </div> */}
          </div>
          <div className="template-four-container-wrapper-divTwo">
            <h2>{cvData?.firstName + " " + cvData?.lastName}</h2>
          </div>
        </div>

        <div className="template-four-container-body">
          <div className="template-four-container-body-divOne">
            <h1>DETALJER </h1>
            {cvData?.physicalAddress === "" ? null : (
              <div className="template-four-container-body-divOne-info">
                <span>Address:</span>
                <h3>{cvData?.physicalAddress}</h3>
              </div>
            )}
            <div className="template-four-container-body-divOne-info">
              <span>Telefon:</span>
              <h3>{cvData?.phone}</h3>
            </div>
            <div className="template-four-container-body-divOne-info">
              <span>E-post:</span>
              <h3>{cvData?.email}</h3>
            </div>
            {cvData?.country === "" ? null : (
              <div className="template-four-container-body-divOne-info">
                <span>Land:</span>
                <h3>{cvData?.country}</h3>
              </div>
            )}
            {cvData?.drivingLicense === "" ? null : (
              <div className="template-four-container-body-divOne-info">
                <span>Førerkort:</span>
                <h3>{cvData?.drivingLicense}</h3>
              </div>
            )}
            {cvData?.zipCode === "" ? null : (
              <div className="template-four-container-body-divOne-info">
                <span>PostNummer:</span>
                <h3>{cvData?.zipCode}</h3>
              </div>
            )}
          </div>
          <div className="template-four-container-body-divTwo">
            <h1>Profil</h1>
            <Editor
              editorState={
                Object.keys(editorState).length === 0 ? EditorState.createEmpty() : editorState
              }
              readOnly={true}
            ></Editor>
          </div>
        </div>

        <div className="template-four-container-content">
          <div className="template-four-container-content-education">
            <h1>UTDANNING </h1>
            {educationData?.map((item, index) => (
              <div key={index} className="template-four-container-content-education-uni">
                <span>{item?.study}</span>
                <span>
                  {item?.school +
                    " — " +
                    moment(item?.startDate).format("YYYY") +
                    " til " +
                    moment(item?.endDate).format("YYYY")}{" "}
                </span>
                <p>{item?.additionalInformation}</p>
              </div>
            ))}

            <div className="template-four-container-content-education-skills">
              <h1
                onClick={() => {
                  console.log(progressData);
                }}
              >
                FERDIGHETER
              </h1>

              {progressData?.map((item, index) => (
                <div
                  key={index}
                  className="template-four-container-content-education-skills-percentage"
                >
                  <h2>{item?.name}</h2>
                  <h2>{item?.value + "%"}</h2>
                </div>
              ))}
            </div>

            {accordiansEnabled.Kurs === true ? (
              <div className="template-four-container-content-education-skills">
                <h1
                  onClick={() => {
                    console.log(courses, "course hain bhaai shana mat ban");
                  }}
                >
                  {" "}
                  KURS
                </h1>

                {courses?.map((item, index) => (
                  <div
                    key={index}
                    className="template-four-container-content-education-skills-percentage"
                  >
                    <h2>
                      {item?.name +
                        " — " +
                        moment(item?.startDate).format("MM/YYYY") +
                        " til " +
                        moment(item?.endDate).format("MM/YYYY")}
                    </h2>
                  </div>
                ))}
              </div>
            ) : null}
            {accordiansEnabled.Hobbyer === true ? (
              <div className="template-four-container-content-education-skills">
                <h1>HOBBYER</h1>

                {hobbies?.map((item, index) => (
                  <div
                    key={index}
                    className="template-four-container-content-education-skills-percentage"
                  >
                    {item?.name}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="template-four-container-content-parentdiv">
            <div className="template-four-container-content-parentdiv-workexp">
              <h1>ARBEIDSERFARING</h1>
              {experianceData?.map((item, index) => (
                <div
                  key={index}
                  className="template-four-container-content-parentdiv-workexp-head"
                >
                  <div className="template-four-container-content-parentdiv-workexp-head-heading">
                    <h1>Stilling</h1>
                    <h2>
                      {moment(item?.startDate).format("YYYY") +
                        " - " +
                        moment(item?.endDate).format("YYYY")}
                    </h2>
                  </div>
                  <div className="template-four-container-content-parentdiv-workexp-head-info">
                    <h2>Firmanavn</h2>
                    <h3>{item?.jobTitle}</h3>
                    <ul>
                      <li>{item?.additionalInformation}</li>
                      {/* <li>Maecenas porttitor congue massa.</li> */}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {accordiansEnabled.Praksisplasser === true ? (
              <div className="template-four-container-content-parentdiv-workexp">
                <h1>Praksisplasser</h1>
                {internships?.map((item, index) => (
                  <div
                    key={index}
                    className="template-four-container-content-parentdiv-workexp-head"
                  >
                    <div className="template-four-container-content-parentdiv-workexp-head-heading">
                      <h1>{item.jobTitle}</h1>
                      <h2>
                        {moment(item?.startDate).format("MM/YYYY") +
                          " - " +
                          moment(item?.endDate).format("MM/YYYY")}
                      </h2>
                    </div>
                    <div className="template-four-container-content-parentdiv-workexp-head-info">
                      <h2>{item.employer}</h2>
                      {/* <h3>{internships?.location}</h3> */}
                      <ul>
                        <li>{item?.additionalInformation}</li>

                        {/* <li>Maecenas porttitor congue massa.</li> */}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="template-four-container-content-parentdiv-workexp">
              <div className="template-four-container-content-parentdiv-workexp-head">
                <div className="template-four-container-content-parentdiv-workexp-head-heading">
                  {/* <h1>Stilling</h1>
                  <h2>{moment(item?.startDate).format("YYYY")+" - "+moment(item?.endDate).format("YYYY")}</h2>
                 */}
                </div>
                {accordiansEnabled.Referanser === true ? (
                  <div className="template-four-container-content-parentdiv-workexp-head-info">
                    <h2>REFERANSER</h2>

                    {refrence?.map((item, index) => (
                      <div key={index}>
                        <h3>{item?.name}</h3>
                        <h3>{item?.companyName}</h3>
                        <h3>{item?.email}</h3>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
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
        <EndreMaalButton />
        <div className="gdpr-image">
          <span>
            Ved å trykke på "laste ned", vil du laste ned CVen du har laget forplikte deg til å
            akseptere våre{" "}
            <Link to="/gdpr">
              <span>vilkår og betingelser</span>
            </Link>{" "}
            og{" "}
            <Link to="/gdpr">
              <span>personvernregler</span>
            </Link>
            <span style={{ color: 'red' }}>
              {' '}
              Husk å trykke på 'Oppdater tekst' før du laster ned CV-en din
            </span>
          </span>
        </div>
        {/* <button
          ref={printButtonRef}
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "180px",
            borderRadius: "5px",
            gap: "5px",
            background: "#eeb856",
            padding: "10px",
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "16px",
            border: "1px solid #F6F3F1",
            backgroundColor: "#eeb856",
            margin: "10px",
          }}
        >
          {" "}
          Las ned PDF
        </button>
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
                background: "#eeb856",
                padding: "10px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                border: "1px solid #F6F3F1",
                backgroundColor: "#eeb856",
                margin: "10px",
              }}
            >
              Las ned PDF
            </button>
          )}
          content={() => pdfComponent}
          onAfterPrint={() => {
            setDisplayTemplate(false);
          }}
        /> */}
        
      </div>
    </div>
  );
};

export default TemplateFour;
