import React, { useRef, useEffect, useState } from 'react'
import ProgressBar from './progressBar'
import { FaUserAlt, FaGraduationCap } from 'react-icons/fa'
import { GiSpeaker } from 'react-icons/gi'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ButtonAdornment from '../../assests/icons/buttonAdornment.png'
import BriefCaseIcon from '../../assests/icons/briefcase.png'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { sendFileToBackend } from '../../helper/helperFunctions'

import { useSelector, useDispatch } from 'react-redux'
import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  sliderData,
  languageData,
  propertiesData,
  coursesData,
  getHobbies,
  getAdditionalAccordian,
  getInternships,
  referenceData,
  profileRichTextData,
  getRefToggle,
  getPresentDate,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import { Editor, EditorState } from 'draft-js'
import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { takeScreenShot } from '../../Redux/actions/screenShotAction'
import { cvScreenShot } from '../../Redux/reducers/screenShotReducer'
import { FiCircle } from 'react-icons/fi'
import QuillTextEditor2 from '../QuillTextEditor/QuillTextEditor2'

const TemplateFive = () => {
  const dispatch = useDispatch()
  const toggleData = useSelector(getRefToggle)
  let pdfComponent = useRef()
  let printButtonRef = useRef()
  const [isChecked, setIsChecked] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [changeOccured, setChangeOccured] = useState(false)
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experiances = useSelector(Experiance_Data)
  const progressData = useSelector(sliderData)
  const refrence = useSelector(referenceData)
  const courses = useSelector(coursesData)
  const skills = useSelector(propertiesData)
  const internships = useSelector(getInternships)
  const profileData = useSelector(profileRichTextData)
  const properties = useSelector(propertiesData)
  const languages = useSelector(languageData)
  const screenShot = useSelector(cvScreenShot)

  // (() => {
  //   if (displayTemplate) {
  //     console.log(
  //       "mobile screen detected the element will directly be printed now !!!!!!!!!!!",
  //     );

  //     printButtonRef.current.click();
  //     // setIsChecked(true)

  //   }

  // })();

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('template-five-container'),
      cvData.email,
      displayTemplate
    )
  }

  // const takeCVScreenShot = () => {
  //   console.log("wow");
  //   const input = document.getElementsByClassName("template-five-container");
  //   html2canvas(input[0]).then(async (canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     console.log(imgData, "<===== imgData");
  //     return imgData;
  //   });
  // };

  let resizeWindow = () => {
    setWindowWidth(window.screen.width)
  }

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  useEffect(() => {
    console.log('re render!!!')
  }, [changeOccured])

  useEffect(() => {
    if (displayTemplate == true && displayTemplate !== {}) {
      console.log(
        'mobile screen detected the element will directly be printed now !!!!!!!!!!!'
      )

      printButtonRef.current.click()
    }
  }, [displayTemplate])

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        overflowWrap: 'break-word',
        flexDirection: 'column',
        height: '100%',
      }}
      onClick={() => console.log(screenShot, '<==========  screenShot')}
    >
      <div
        ref={(el) => (pdfComponent = el)}
        className='template-five-container'
        style={{
          display: 'block',
          height: displayTemplate === true ? '100%' : 'inherit',
          width:
            displayTemplate === true
              ? '928px'
              : pageWidth === true
              ? '95%'
              : '95%',
          margin: displayTemplate === true ? '0px' : '10px',
          padding: displayTemplate === true ? '0px' : '10px',
        }}
      >
        <div className='template-five-container-mainheading'>
          <h1>{cvData.firstName + ' ' + cvData.lastName}</h1>
          <div className='template-five-container-mainheading-subheading'>
            <span>{cvData.jobTitle}</span>
          </div>
        </div>
        <div className='template-five-container-wrapper'>
          <div
            className='template-five-container-wrapper-leftside'
            style={{ minHeight: '890px' }}
          >
            <div className='template-five-container-wrapper-leftside-heading'>
              <h1>•DETALJER•</h1>
              {cvData?.DOB == '' ? null : (
                <div className='template-five-container-wrapper-leftside-heading-head'>
                  <span>{moment(cvData?.DOB).format('DD,MM,YYYY')}</span>
                </div>
              )}
              <div className='template-five-container-wrapper-leftside-heading-head'>
                <span>{cvData.physicalAddress}</span>
              </div>
              <div className='template-five-container-wrapper-leftside-heading-head'>
                <span>{cvData.zipCode}</span>
              </div>
              <div className='template-five-container-wrapper-leftside-heading-head'>
                <span>{cvData.country}</span>
              </div>
              <div className='template-five-container-wrapper-leftside-heading-head'>
                <span>{cvData.phone === '' ? null : cvData.phone}</span>
              </div>
              <div className='template-five-container-wrapper-leftside-heading-head'>
                <span
                  style={{
                    width: 'fit-content',
                    borderBottom: '1px solid blue',
                    color: 'blue',
                  }}
                >
                  {cvData.email}
                </span>
              </div>

              <div className='template-five-container-wrapper-leftside-progress'>
                <h2>•FERDIGHETER•</h2>
                {properties?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: 'Oswald',
                        fontWeight: 600,
                      }}
                    >
                      {cvData.displayProgressBar === true ? (
                        <ProgressBar
                          fontSize='16px'
                          maxWidth={'100%'}
                          key={index}
                          backgroundcolor='#000000'
                          wrapperColor='#BFBFBF'
                          title={item?.name}
                          percentage={item?.value}
                          color='#393939'
                          height='1px'
                        />
                      ) : (
                        <p>{item?.name}</p>
                      )}

                      <span style={{ textAlign: 'center' }}>--</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='template-five-container-wrapper-leftside-heading'>
              <h1 onClick={() => console.log(courses)}>•</h1>
            </div>
            <div className='template-five-container-wrapper-leftside-heading'>
              <h1 onClick={() => console.log(courses)}>SPRÅK</h1>
              {languages?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ textAlign: 'center' }}
                    className='template-five-container-wrapper-leftside-heading-head'
                  >
                    <>
                      <span>
                        {item?.name}
                        {item?.value}
                      </span>
                    </>
                  </div>
                )
              })}
            </div>
            {accordiansEnabled.Kurs === true ? (
              <div className='template-five-container-wrapper-leftside-heading'>
                <h1 onClick={() => console.log(courses)}>KURS</h1>

                <div
                  style={{
                    width: '100%',
                  }}
                  className='template-five-container-wrapper-leftside-heading-head'
                >
                  {courses?.map((item, index) => {
                    return (
                      <>
                        <span key={index}>{item?.name}</span>
                      </>
                    )
                  })}
                </div>
              </div>
            ) : null}
            {cvData.drivingLicense !== '' ? (
              <div className='template-five-container-wrapper-leftside-heading'>
                <h1>Førerkort</h1>
                <div className='template-five-container-wrapper-leftside-heading-head'>
                  <span>{cvData.drivingLicense}</span>
                </div>
              </div>
            ) : null}
            {accordiansEnabled.Hobbyer === true ? (
              <div
                style={{ textAlign: 'center' }}
                className='template-five-container-wrapper-leftside-heading'
              >
                <h1 onClick={() => console.log(courses)}>HOBBY</h1>
                {hobbies?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='template-five-container-wrapper-leftside-heading-head'
                    >
                      <>
                        <span key={index}>{item?.name}</span>
                      </>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
          <div className='template-five-container-wrapper-rightside'>
            {/* <FaUserAlt/> */}
            {profileData !== '<p><br></p>' && profileData !== '<p></p>' && (
              <div className='template-five-container-wrapper-rightside-wrapper'>
                <div>
                  <FaUserAlt
                    style={{
                      color: 'black',
                      position: 'absolute',
                      left: '-1.5%',
                      top: '-15%',
                    }}
                    size={18}
                  />
                  <div className='template-five-container-wrapper-rightside-wrapper-line' />
                </div>
                <div className='template-five-container-wrapper-rightside-wrapper-line-content22'>
                  <h1>PROFIL </h1>
                  <div style={{ width: '100%', fontFamily: 'Oswald' }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: profileData,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div className='template-five-container-wrapper-rightside-wrapper'>
              <div>
                <img
                  style={{ position: 'absolute', left: '-0.5rem', top: '-1%' }}
                  src={BriefCaseIcon}
                  width='20px'
                  alt='briefcase'
                ></img>
                <div className='template-five-container-wrapper-rightside-wrapper-line' />
              </div>
              <div>
                <h1>ARBEIDSERFARING</h1>
                {experiances?.map((item, index) => (
                  <div
                    style={{
                      overflowWrap: 'anywhere',
                      position: 'relative',
                      fontSize: '15px',
                    }}
                    key={index}
                  >
                    <FiCircle
                      style={{
                        position: 'absolute',
                        left: '-1.5rem',
                        backgroundColor: 'white',
                      }}
                    />
                    <p style={{ fontWeight: 'bold' }}>
                      {item?.jobTitle + ' - ' + item?.employer}
                    </p>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <p style={{ color: 'grey' }}>
                        {item.startDate.length === 0
                          ? 'Startdato -'
                          : moment(item?.startDate).format('MM/YYYY') + ' - '}
                      </p>
                      <p style={{ color: 'grey' }}>
                      {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                      </p>
                    </div>

                    <div
                      style={{ fontSize: '15px', fontFamily: 'Oswald' }}
                      dangerouslySetInnerHTML={{
                        __html: item?.additionalInformation,
                      }}
                    ></div>
                    <br />
                  </div>
                ))}
              </div>
            </div>
            {accordiansEnabled.Praksisplasser === true ? (
              <div className='template-five-container-wrapper-rightside-wrapper'>
                <div>
                  <FaGraduationCap
                    style={{
                      color: 'black',
                      position: 'absolute',
                      left: '-0.5rem',
                      top: '-1%',
                    }}
                    size={22}
                  />
                  <div className='template-five-container-wrapper-rightside-wrapper-line' />
                </div>
                <div>
                  <h1>Praksisplasser </h1>
                  {internships?.map((item, index) => (
                    <div
                      style={{
                        overflowWrap: 'anywhere',
                        position: 'relative',
                      }}
                      key={index}
                    >
                      <FiCircle
                        style={{
                          position: 'absolute',
                          left: '-1.5rem',
                          backgroundColor: 'white',
                        }}
                      />
                      <p style={{ fontWeight: 'bold' }}>
                        {item?.jobTitle + ' - ' + item?.employer}
                      </p>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <p style={{ color: 'grey' }}>
                          {item.startDate.length === 0
                            ? 'Startdato -'
                            : moment(item?.startDate).format('MM/YYYY') + ' - '}
                        </p>
                        <p style={{ color: 'grey' }}>
                        {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                        </p>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.additionalInformation,
                        }}
                      ></p>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {/* <FaUserAlt/> */}
            <div className='template-five-container-wrapper-rightside-wrapper'>
              <div>
                <FaGraduationCap
                  style={{
                    color: 'black',
                    position: 'absolute',
                    left: '-2%',
                    top: '-1%',
                  }}
                  size={22}
                />
                <div className='template-five-container-wrapper-rightside-wrapper-line' />
              </div>
              <div>
                <h1>UTDANNING </h1>
                {educationData?.map((item, index) => (
                  <div
                    style={{
                      overflowWrap: 'anywhere',
                      position: 'relative',
                    }}
                    key={index}
                  >
                    <FiCircle
                      style={{
                        position: 'absolute',
                        left: '-1.5rem',
                        backgroundColor: 'white',
                      }}
                    />
                    <p style={{ fontWeight: 'bold' }}>
                      {item.school}-{item.study}
                    </p>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <p style={{ color: 'grey' }}>
                        {item.startDate.length === 0
                          ? 'Startdato -'
                          : moment(item?.startDate).format('MM/YYYY') + ' - '}
                      </p>
                      <p style={{ color: 'grey' }}>
                      {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                      </p>
                    </div>

                    <div
                      style={{ fontSize: '15px', fontFamily: 'Oswald' }}
                      dangerouslySetInnerHTML={{
                        __html: item?.additionalInformation,
                      }}
                    ></div>
                    <br />
                  </div>
                ))}
              </div>
            </div>
            {accordiansEnabled.Referanser === true ? (
              <div className='template-five-container-wrapper-rightside-wrapper'>
                <div>
                  <div className='template-five-container-wrapper-rightside-wrapper-line' />
                </div>

                <div
                  style={{
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <h1>REFERANSER </h1>

                  {refrence?.map((item, index) => (
                    <div key={index}>
                      {toggleData ? (
                        <>
                          <p>Oppgis ved forespørsel</p>
                        </>
                      ) : (
                        <>
                          <br />
                          <FiCircle
                            style={{
                              position: 'absolute',
                              left: '-1.5rem',
                              backgroundColor: 'white',
                            }}
                          />
                          <p style={{ fontWeight: 'bold' }}>
                            {item?.name + ' , ' + item?.companyName}
                          </p>
                          <p style={{ fontWeight: 'bold', color: 'grey' }}>
                            {item?.email}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '95%',
        }}
      >
        <EndreMaalButton />
        <div className='gdpr-image'>
          {/* {windowWidth > 768 ? ( <input
                type="checkbox"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />): null } */}

          <span>
            Ved å trykke på "laste ned", vil du laste ned CVen du har laget
            forplikte deg til å akseptere våre{' '}
            <Link to='/gdpr'>
              <span>vilkår og betingelser</span>
            </Link>{' '}
            og{' '}
            <Link to='/gdpr'>
              <span>personvernregler</span>
            </Link>
          </span>
        </div>
        <ReactToPrint
          // documentTitle={cvData.saveAs}
          trigger={() => (
            <button
              ref={printButtonRef}
              style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '180px',
                borderRadius: '5px',
                gap: '5px',
                background: '#F6F3F1',
                padding: '10px',
                fontFamily: 'Montserrat',
                fontWeight: '600',
                fontSize: '16px',
                border: '1px solid #F6F3F1',
                backgroundColor: '#eeb856',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              Last ned CV
            </button>
          )}
          content={() => pdfComponent}
          onBeforeGetContent={() => {
            setPageWidth(true)
          }}
          onAfterPrint={async () => {
            sendPrintedDocument()
            setPageWidth(false)
            setDisplayTemplate(false)
            setChangeOccured(!changeOccured)
          }}
        />
      </div>
    </div>
  )
}

export default TemplateFive
