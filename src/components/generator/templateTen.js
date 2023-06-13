import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext, Link } from 'react-router-dom'
import moment from 'moment'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  languageData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  propertiesData,
  referenceData,
  getRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'

const TemplateTen = () => {
  let pdfComponent = useRef()
  const cvData = useSelector(CV_DATA)
  const toggleData = useSelector(getRefToggle)
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  let printButtonRef = useRef()
  const [isChecked, setIsChecked] = useState(false)
  const [changeOccured, setChangeOccured] = useState(false)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const courses = useSelector(coursesData)
  const refrence = useSelector(referenceData)
  const properties = useSelector(propertiesData)
  const languages = useSelector(languageData)
  // const dob = moment(cvData?.DOB).format("DD,MM,YYYY");
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   console.log("wow");
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('templateten-container'),
      cvData.email,
      displayTemplate
    )
  }

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
        // marginTop: '10px',
        height: '100%',
        margin: '10px',
        padding: '10px',
      }}
    >
      <div
        style={{
          display: 'block',
          width:
            displayTemplate === true
              ? '928px'
              : pageWidth === true
              ? '100%'
              : '100%',
          minHeight: '1030px',
          margin: displayTemplate === true ? '0px' : '10px',
          padding: displayTemplate === true ? '0px' : '10px',
        }}
        ref={(el) => (pdfComponent = el)}
        className='templateten-container'
      >
        <div className='templateten-container-headingwrapper'>
          <div className='templateten-container-headingwrapper-head'>
            <h1>{cvData?.firstName + ' ' + cvData?.lastName}</h1>
            <h2>{cvData?.jobTitle}</h2>
          </div>

          <div className='templateten-container-headingwrapper-info'>
            <span>{cvData?.physicalAddress}</span>
            <div>
              <div>
                <span>Tlf:</span>
                <span>{cvData?.phone}</span>
              </div>
              <h3>|</h3>
              <div>
                <span>E-post:</span>
                <span>{cvData?.email}</span>
              </div>
            </div>
            {cvData?.DOB == '' ? null : (
              <div>
                <span>Født: </span>
                <span>{moment(cvData?.DOB).format('DD,MM,YYYY')}</span>
              </div>
            )}
          </div>

          {/* <div className="templateten-container-headingwrapper-mainheading">
            <div className="templateten-container-headingwrapper-mainheading-borderdiv">
              <h1>Profil</h1>
            </div>
            <div className="templateten-container-headingwrapper-mainheading-borderdiv-studying">
              <div className="templateten-container-headingwrapper-mainheading-borderdiv-studying-head">
                <Editor
                  editorState={
                    Object.keys(editorState).length === 0
                      ? EditorState.createEmpty()
                      : editorState
                  }
                  readOnly={true}
                ></Editor>
              </div>
            </div>
          </div> */}

          <div className='templateten-container-headingwrapper-mainheading'>
            <div className='templateten-container-headingwrapper-mainheading-borderdiv'>
              <h1>Utdanning</h1>
            </div>
            {educationData?.map((item) => (
              <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying'>
                <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head'>
                  {item.startDate === '' ? (
                    <span style={{ fontFamily: 'Myriad Pro' }}>
                      Startdato - sluttdato
                    </span>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <span style={{ fontFamily: 'Myriad Pro' }}>
                        {moment(item?.startDate).format('MM-YYYY') + ' - '}
                      </span>
                      <span style={{ fontFamily: 'Myriad Pro' }}>
                        {item.toggle
                          ? 'dags dato'
                          : moment(item?.endDate).format('MM-YYYY')}
                      </span>
                    </div>
                  )}
                  <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-right'>
                    <h4 style={{ fontFamily: 'Myriad Pro' }}>
                      {item?.study + ', ' + item?.school}
                    </h4>
                    <div
                      style={{
                        fontFamily: 'Myriad Pro',
                        fontSize: '14px',
                        color: 'black',
                        wordBreak: 'break-all',
                        textAlign: 'left',
                        fontWeight: '400',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item?.additionalInformation,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='templateten-container-headingwrapper-mainheading'>
            <div className='templateten-container-headingwrapper-mainheading-borderdiv'>
              <h1>Erfaring</h1>
            </div>
            {experianceData?.map((item) => (
              <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying'>
                <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head'>
                  <span style={{ fontFamily: 'Myriad Pro' }}>
                    {item.startDate === '' ? (
                      <span>Startdato - sluttdato</span>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <span style={{ fontFamily: 'Myriad Pro' }}>
                          {moment(item?.startDate).format('MM-YYYY') + ' - '}
                        </span>
                        <span>
                          {item.toggle
                            ? 'dags dato'
                            : moment(item?.endDate).format('MM-YYYY')}
                        </span>
                      </div>
                    )}
                  </span>
                  <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-right'>
                    <h4 style={{ fontFamily: 'Myriad Pro' }}>
                      {item?.jobTitle} {', ' + item?.employer}
                    </h4>
                    <div
                      style={{
                        fontFamily: 'Myriad Pro',
                        fontSize: '14px',
                        color: 'black',
                        wordBreak: 'break-all',
                        textAlign: 'left',
                        fontWeight: '400',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item?.additionalInformation,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {accordiansEnabled.Praksisplasser === true ? (
            <div className='templateten-container-headingwrapper-mainheading'>
              <div className='templateten-container-headingwrapper-mainheading-borderdiv'>
                <h1>Praksisplasser</h1>
              </div>
              {internships?.map((item) => (
                <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying'>
                  <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head'>
                    <span style={{ fontFamily: 'Myriad Pro' }}>
                      {item.startDate === '' ? (
                        <span>Startdato - sluttdato</span>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <span>
                            {moment(item?.startDate).format('MM-YYYY') + ' - '}
                          </span>
                          <span>
                            {item.toggle
                              ? 'dags dato'
                              : moment(item?.endDate).format('MM-YYYY')}
                          </span>
                        </div>
                      )}
                    </span>
                    <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-right'>
                      <h4 style={{ fontFamily: 'Myriad Pro' }}>
                        {item?.jobTitle} {', ' + item?.employer}{' '}
                      </h4>
                      <p
                        style={{ fontFamily: 'Myriad Pro' }}
                        dangerouslySetInnerHTML={{
                          __html: item?.additionalInformation,
                        }}
                      >
                        {/* {item?.additionalInformation} */}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div>
            <div className='templateten-container-headingwrapper-mainheading'>
              <div className='templateten-container-headingwrapper-mainheading-borderdiv'>
                <h1>Annet</h1>
              </div>
              <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying'>
                <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head'>
                  <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-heading'>
                    <span
                      style={{
                        fontSize: '16px',
                        fontFamily: 'Myriad Pro',
                        justifyContent: 'flex-start',
                      }}
                    >
                      Språk
                    </span>
                  </div>

                  <div className='divsetlangandcourse'>
                    {languages?.map((item) => (
                      <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-right'>
                        <h4
                          style={{
                            fontFamily: 'Myriad Pro',
                            fontWeight: 500,
                            fontSize: '14px',
                          }}
                        >
                          {item?.name} {item?.value}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {accordiansEnabled.Kurs === true ? (
                <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying'>
                  <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head'>
                    <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-heading'>
                      <span
                        style={{
                          fontSize: '16px',
                          fontFamily: 'Myriad Pro',
                        }}
                      >
                        Kurs
                      </span>
                    </div>
                    <div className='divsetlangandcourse'>
                      {courses?.map((item, index) => (
                        <div
                          key={index}
                          className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-right'
                        >
                          <h4
                            style={{
                              fontFamily: 'Myriad Pro',
                              fontWeight: 500,
                              fontSize: '14px',
                            }}
                          >
                            {item?.name}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying'>
                <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head'>
                  <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-heading'>
                    <span
                      style={{ fontSize: '16px', fontFamily: 'Myriad Pro' }}
                    >
                      Ferdigheter
                    </span>
                  </div>
                  <div className='divsetlangandcourse'>
                    <p>
                      {properties?.map((item, index) => (
                        <span style={{ fontSize: '14px' }} key={index}>
                          {index === properties.length - 1
                            ? item.name + ' .'
                            : item.name + ', '}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              {accordiansEnabled.Hobbyer === true ? (
                <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head'>
                  <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-heading'>
                    <span
                      style={{ fontSize: '16px', fontFamily: 'Myriad Pro' }}
                    >
                      Hobby
                    </span>
                  </div>
                  <div className='divsetlangandcourse'>
                    <p>
                      {hobbies?.map((item, index) => (
                        <span style={{ fontSize: '14px' }} key={index}>
                          {index === hobbies.length - 1
                            ? item.name + ' .'
                            : item.name + ', '}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ) : null}
              {cvData.drivingLicense === '' ? null : (
                // <div className="templateten-container-headingwrapper-mainheading-borderdiv-studying">
                //   <div className="templateten-container-headingwrapper-mainheading-borderdiv-studying-head">
                //     <div className="templateten-container-headingwrapper-mainheading-borderdiv-studying-head-heading">
                //       <p
                //         style={{
                //           fontSize: "16px",
                //           fontFamily: "Myriad Pro",
                //         }}
                //       >
                //         Førerkort
                //       </p>
                //     </div>
                //     <div className="divsetlangandcourse">
                //       <p>{cvData.drivingLicense}</p>
                //     </div>
                //   </div>
                // </div>

                <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head'>
                  <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-heading'>
                    <span
                      style={{ fontSize: '16px', fontFamily: 'Myriad Pro' }}
                    >
                      Førerkort
                    </span>
                  </div>
                  <div className='divsetlangandcourse'>
                    <p>{cvData.drivingLicense}</p>
                  </div>
                </div>
              )}
            </div>
            {accordiansEnabled.Referanser === true ? (
              <div className='templateten-container-headingwrapper-mainheading'>
                <div className='templateten-container-headingwrapper-mainheading-borderdiv'>
                  <h1>Referanser</h1>
                </div>

                {toggleData ? (
                  <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying'>
                    <span>Oppgis ved forespørsel</span>
                  </div>
                ) : (
                  <>
                    {refrence?.map((item, index) => (
                      <div
                        key={index}
                        className='templateten-container-headingwrapper-mainheading-borderdiv-studying'
                      >
                        <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head'>
                          <span
                            style={{
                              fontSize: '16px',
                              fontFamily: 'Myriad Pro',
                              width: '120px',
                            }}
                          >
                            {item?.name}
                          </span>
                          <div className='templateten-container-headingwrapper-mainheading-borderdiv-studying-head-right'>
                            <h4 style={{ fontFamily: 'Myriad-Pro-Light' }}>
                              {item.email !== ''
                                ? item?.companyName + ', ' + item?.email
                                : item?.companyName}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
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
          {/* <input
                type="checkbox"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              /> */}
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
          trigger={() => (
            <button
              ref={printButtonRef}
              // disabled={!isChecked }
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
          documentTitle={cvData.saveAs}
          content={() => pdfComponent}
          onBeforeGetContent={() => {
            setPageWidth(true)
          }}
          onAfterPrint={() => {
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

export default TemplateTen
