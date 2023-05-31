import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineCar, AiOutlineMail } from 'react-icons/ai'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { HiLocationMarker } from 'react-icons/hi'

import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  profileRichTextData,
  getAdditionalAccordian,
  coursesData,
  propertiesData,
  getHobbies,
  languageData,
  getInternships,
  referenceData,
  getRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import { BsTelephone } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'

import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import ProgressBar from './progressBar'
import {
  sendFileToBackend,
  sendPrintedDocument,
} from '../../helper/helperFunctions'
const TemplateFourteen = (props) => {
  console.log(props, 'props in 6')
  const [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  let printButtonRef = useRef()
  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const toggleData = useSelector(getRefToggle)
  let pdfComponent = useRef()
  const cvData = useSelector(CV_DATA)
  const [isChecked, setIsChecked] = useState(false)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const refrence = useSelector(referenceData)
  const internships = useSelector(getInternships)
  const courses = useSelector(coursesData)
  const properties = useSelector(propertiesData)
  const profileData = useSelector(profileRichTextData)
  const languages = useSelector(languageData)
  const [changeOccured, setChangeOccured] = useState(false)
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   console.log("wow");
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async (props) => {
    await sendFileToBackend(
      document.getElementsByClassName('template-fourteen-container'),
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
        // display: displayTemplate ? "flex" : pageWidth === true ? "none" : "flex",
        // width: displayTemplate === true ? "100%" : pageWidth === true ? "928px" : "95%",
        width: '100%',
        alignItems: 'center',
        overflowWrap: 'break-word',
        flexDirection: 'column',
        paddingTop: '0px',
        justifyContent: 'center',
        // height: '97.2%',
        margin: displayTemplate === true ? '0px' : '10px',
        padding: displayTemplate === true ? '0px' : '10px',
      }}
      className='containers-container'
    >
      <div
        ref={(el) => (pdfComponent = el)}
        style={{
          width:
            displayTemplate === true
              ? '928px'
              : pageWidth === true
              ? '100%'
              : '100%',
          display: 'flex',
          // height: 'inherit',
          // margin: displayTemplate === true ? "0px" : "10px",
          // padding: displayTemplate === true ? "0px" : "10px",
        }}
        className='template-fourteen-container'
      >
        <div className='template-fourteen-container-left'>
          <div className='template-fourteen-container-left-heading'>
            <h1>{cvData?.firstName + ' ' + cvData?.lastName}</h1>
            {cvData?.DOB == '' ? null : (
              <span>{moment(cvData?.DOB).format('DD,MM,YYYY')}</span>
            )}
            <p>{cvData?.jobTitle}</p>
          </div>
          <div className='template-fourteen-container-left-content'>
            <div className='template-fourteen-container-left-content-heading'>
              <div className='template-fourteen-container-right-content-element-bullet' />
              <h1 className='heading'>ARBEIDSERFARING</h1>
            </div>
            {experianceData.map((item) => (
              <div className='job-title '>
                <div className='job-title-header'>
                  <p style={{ textTransform: 'uppercase' }}>
                    {item?.jobTitle} | {item?.employer}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span style={{ fontSize: '1rem', color: 'grey' }}>
                      {item.startDate.length === 0
                        ? 'Startdato -'
                        : moment(item?.startDate).format('MM YYYY') + ' - '}
                    </span>

                    <span style={{ fontSize: '1rem', color: 'grey' }}>
                    {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                    </span>
                  </div>
                </div>
                <div
                  style={{ fontFamily: 'Calibri', color: 'gray' }}
                  dangerouslySetInnerHTML={{
                    __html: item?.additionalInformation,
                  }}
                ></div>
                <br />
              </div>
            ))}

            <div className='template-fourteen-container-left-content-heading'>
              <div className='template-fourteen-container-right-content-element-bullet' />
              <h1 className='heading'>UTDANNING </h1>
            </div>
            {educationData?.map((item) => (
              <div className='job-title '>
                <div className='job-title-header'>
                  <p style={{ textTransform: 'uppercase' }}>
                    {item?.study} | {item?.school}
                  </p>
                  <div
                    style={{
                      //  width: '27%',
                      display: 'flex',
                      gap: '4px',
                    }}
                  >
                    <span style={{ fontSize: '1rem', color: 'grey' }}>
                      {item.startDate.length === 0
                        ? 'Startdato -'
                        : moment(item?.startDate).format('MM YYYY') + ' - '}
                    </span>
                    <span>
                    {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                    </span>
                  </div>
                </div>
                <div
                  style={{ fontFamily: 'Calibri', color: 'gray' }}
                  dangerouslySetInnerHTML={{
                    __html: item?.additionalInformation,
                  }}
                ></div>
                <br />
              </div>
            ))}
            {accordiansEnabled.Praksisplasser === true ? (
              <>
                <div className='template-fourteen-container-left-content-heading'>
                  <div className='template-fourteen-container-right-content-element-bullet' />
                  <h1 className='heading'>Praksisplasser </h1>
                </div>
                {internships?.map((item) => {
                  return (
                    <div className='job-title '>
                      <div className='job-title-header'>
                        <p style={{ textTransform: 'uppercase' }}>
                          {item?.jobTitle} | {item?.employer}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <span style={{ fontSize: '1rem', color: 'grey' }}>
                            {item.startDate.length === 0
                              ? 'Startdato -'
                              : moment(item?.startDate).format('MM YYYY') +
                                ' - '}
                          </span>

                          <span style={{ fontSize: '1rem', color: 'grey' }}>
                          {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                          </span>
                        </div>
                      </div>
                      <span
                        style={{ fontSize: '1rem', color: 'grey' }}
                        dangerouslySetInnerHTML={{
                          __html: item?.additionalInformation,
                        }}
                      ></span>
                      <br />
                    </div>
                  )
                })}
              </>
            ) : null}
            <div
              style={{
                width: '100%',
                display: 'flex',
              }}
            >
              <div style={{ width: '45%' }}>
                <div className='template-fourteen-container-left-content-heading'>
                  <div className='template-fourteen-container-right-content-element-bullet' />
                  <h1 className='heading'>SPRÅK</h1>
                </div>
                <div className='job-title'>
                  {languages.map((item, index) => (
                    <>
                      <p key={index}>
                        {item.name} {item?.value}
                      </p>
                      <br />
                    </>
                  ))}
                </div>
              </div>
              <div style={{ width: '55%' }}>
                <div className='template-fourteen-container-left-content-heading'>
                  <div className='template-fourteen-container-right-content-element-bullet' />
                  <h1 className='heading'>FERDIGHETER</h1>
                </div>
                <div className='job-title'>
                  {properties.map((item, index) => (
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                      }}
                    >
                      <span style={{ width: '200px' }} key={index}>
                        {item.name}
                      </span>
                      {cvData.displayProgressBar === true ? (
                        <div style={{ width: '70%' }}>
                          <ProgressBar
                            backgroundcolor='white'
                            percentage={item?.value}
                            wrapperColor={'white'}
                            dashed='dotted'
                            color='rgb(75, 172, 198)'
                            borderraadius='50%'
                          />
                          <br />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className='template-fourteen-container-right'
          style={{ minHeight: '1055px' }}
        >
          <div className='template-fourteen-container-right-profile'>
            <div>
              <div>
                <div>
                  {cvData.profileImage ? (
                    <img src={cvData.profileImage} alt='prof' />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='template-fourteen-container-right-content'>
            <h2>MÅLSETTING</h2>
            <p>
              <p
                style={{
                  wordBreak: 'break-all',
                  fontFamily: 'Calibri-Bold',
                  fontSize: '12px',
                  color: 'grey',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: profileData,
                  }}
                ></div>
              </p>
            </p>
            <h2> PROFIL</h2>

            <div className='template-fourteen-container-spacing' />

            {cvData && cvData.phone ? (
              <div className='template-fourteen-container-right-content-element'>
                <div>
                  <BsTelephone size={16} color='white' />
                </div>
                <p>{cvData?.phone}</p>
              </div>
            ) : null}
            {cvData && cvData.email ? (
              <div className='template-fourteen-container-right-content-element'>
                <div>
                  <AiOutlineMail size={16} color='white' />
                </div>
                <p>{cvData?.email}</p>
              </div>
            ) : null}

            {cvData && cvData.physicalAddress ? (
              <div className='template-fourteen-container-right-content-element'>
                <div>
                  <GoLocation size={16} color='white' />
                </div>
                <p>{cvData?.physicalAddress}</p>
              </div>
            ) : null}
            {cvData.zipCode !== '' && cvData.zipCode ? (
              <div className='template-fourteen-container-right-content-element'>
                <div>
                  <HiLocationMarker size={16} color='white' />
                </div>
                <p>{cvData?.zipCode}</p>
              </div>
            ) : null}
            {cvData && cvData.drivingLicense ? (
              <div className='template-fourteen-container-right-content-element'>
                <div>
                  <AiOutlineCar size={16} color='white' />
                </div>
                <p>{cvData?.drivingLicense}</p>
              </div>
            ) : null}

            <div className='template-fourteen-container-right-content-element-reference'>
              <h2 style={{ color: 'rgb(237, 231, 231)' }}> {' Extras'}</h2>
              <br />
              {accordiansEnabled.Kurs === true ? (
                <div className='template-fourteen-container-right-content-element-reference-box'>
                  <div className='template-fourteen-container-right-content-element-reference-box-left'>
                    <h3 style={{ margin: 0, padding: 0 }}>Kurs</h3>
                  </div>
                  <div className='template-fourteen-container-right-content-element-reference-box-right'>
                    <p style={{ margin: 0, padding: 0 }}>
                      {courses.map((item, index) => {
                        return (
                          <p key={index} style={{ margin: 0, padding: 0 }}>
                            {item.name}
                          </p>
                        )
                      })}
                    </p>
                  </div>
                </div>
              ) : null}
              <br />
              {accordiansEnabled.Hobbyer === true ? (
                <div className='template-fourteen-container-right-content-element-reference-box'>
                  <div className='template-fourteen-container-right-content-element-reference-box-left'>
                    <h3 style={{ margin: 0, padding: 0 }}>Hobby</h3>
                  </div>
                  <div className='template-fourteen-container-right-content-element-reference-box-right'>
                    <p style={{ margin: 0, padding: 0 }}>
                      {hobbies.map((item, index) => {
                        return (
                          <p key={index} style={{ margin: 0, padding: 0 }}>
                            {item.name}
                          </p>
                        )
                      })}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {accordiansEnabled.Referanser === true ? (
              <div className='template-fourteen-container-right-content-element-reference'>
                <h2> Referanser</h2>

                {toggleData ? (
                  <p
                    style={{
                      textAlign: 'left',
                      fontSize: '15px',
                      color: 'grey',
                    }}
                  >
                    Oppgis ved forespørsel
                  </p>
                ) : (
                  <div>
                    {refrence?.map((item, index) => (
                      <div className='template-fourteen-container-right-content-element-reference-box'>
                        <div
                          style={{ width: '100%' }}
                          className='template-fourteen-container-right-content-element-reference-box-left'
                        >
                          <h3>{item?.name}</h3>
                          <p
                            style={{
                              textAlign: 'left',
                              margin: 0,
                              padding: 0,
                              fontSize: '16px',
                              color: 'grey',
                            }}
                          >
                            {item.companyName}
                          </p>
                          <p
                            style={{
                              textAlign: 'left',
                              margin: 0,
                              padding: 0,
                              fontSize: '16px',
                              color: 'grey',
                            }}
                          >
                            {item.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
          width: '90%',
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

export default TemplateFourteen
