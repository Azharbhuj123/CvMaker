import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProgressBar from './progressBar'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  propertiesData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  referenceData,
  languageData,
  profileRichTextData,
  getRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import ReactToPrint from 'react-to-print'
import { Editor } from 'draft-js'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import {
  sendFileToBackend,
  sendPrintedDocument,
} from '../../helper/helperFunctions'
import moment from 'moment'
const TemplateNine = () => {
  let printButtonRef = useRef()
  const cvData = useSelector(CV_DATA)
  const toggleData = useSelector(getRefToggle)
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  let pdfComponent = useRef()
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const progressData = useSelector(propertiesData)
  const [isChecked, setIsChecked] = useState(false)

  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const skills = useSelector(propertiesData)
  const languages = useSelector(languageData)
  const profileData = useSelector(profileRichTextData)
  const [changeOccured, setChangeOccured] = useState(false)
  const courses = useSelector(coursesData)
  const references = useSelector(referenceData)
  // if (displayTemplate && displayTemplate === true  ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('template-nine-container'),
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
        width:
          displayTemplate === true
            ? '928px'
            : pageWidth === true
            ? '100%'
            : '100%',
        alignItems: 'center',
        overflowWrap: 'break-word',
        flexDirection: 'column',
        marginTop: '0px',
      }}
    >
      <div
        style={{
          display: 'block',
          width:
            displayTemplate === true
              ? '928px'
              : pageWidth === true
              ? '95%'
              : '95%',
          margin: displayTemplate === true ? '0px' : '10px',
          // padding: displayTemplate === true ? "0px" : "10px",
        }}
        ref={(el) => (pdfComponent = el)}
        className='template-nine-container'
      >
        <div className='template-nine-container-wrapper'>
          <div className='template-nine-container-wrapper-leftside'>
            <div className='template-nine-container-wrapper-leftside-nameBox'>
              <h2>{cvData.firstName + ' ' + cvData.lastName}</h2>
              <h3>{cvData.jobTitle}</h3>
            </div>
            <div className='template-nine-container-wrapper-leftside-heading'>
              <div className='template-nine-container-wrapper-leftside-heading-head'>
                <h1>Detaljer</h1>
                <h2>ADRESSE</h2>
                <span> {cvData?.physicalAddress}</span>
              </div>
              <div className='template-nine-container-wrapper-leftside-heading-head'>
                <h2>Telefon</h2>
                <span> {cvData?.phone}</span>
                <h2>E-post</h2>
                <span>{cvData?.email}</span>
                <h2>Fødselsdato</h2>
                <span>{moment(cvData?.DOB).format('DD,MM,YYYY')}</span>
                <h2>Postnummer </h2>
                <span>{cvData?.zipCode}</span>
                {cvData.drivingLicense !== '' ? (
                  <>
                    <h2> Førerkort</h2>
                    <span>{cvData?.drivingLicense}</span>
                  </>
                ) : null}
              </div>
            </div>
            <div className='template-nine-container-wrapper-leftside-progress'>
              <h1>Ferdigheter</h1>
              <p> </p>
              {progressData.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {cvData?.displayProgressBar === true ? (
                      <ProgressBar
                        height={'1px'}
                        title={item?.name}
                        backgroundcolor='#ffffff'
                        color='#ffffff'
                        percentage={item.value}
                        wrapperColor='#3b588d'
                      />
                    ) : (
                      <p
                        style={{
                          paddingTop: '10px',
                          fontFamily: 'Arial, Helvetica, sans-serif',
                          fontSize: '15px',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      >
                        {item?.name}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
            <div className='template-nine-container-wrapper-leftside-heading-head'>
              <h2 style={{ fontSize: '22px' }}>Språk</h2>
              {languages.map((item, index) => {
                return <span key={index}>{item?.name + item?.value}</span>
              })}

              <span> {cvData.address}</span>
            </div>
            {accordiansEnabled.Hobbyer === true ? (
              <div className='template-nine-container-wrapper-leftside-heading-head'>
                <h2 style={{ fontSize: '22px' }}>Hobby</h2>
                {hobbies.map((item, index) => {
                  return <span key={index}>{item?.name}</span>
                })}

                <span> {cvData.address}</span>
              </div>
            ) : null}
            {accordiansEnabled.Kurs === true ? (
              <div className='template-nine-container-wrapper-leftside-heading-head'>
                <h2 style={{ fontSize: '22px' }}>Kurs</h2>
                {courses.map((item, index) => {
                  return <span key={index}>{item?.name}</span>
                })}

                <span> {cvData.address}</span>
              </div>
            ) : null}
          </div>
          <div className='template-nine-container-wrapper-rightside'>
            {/* <FaUserAlt/> */}
            {profileData !== '<p><br></p>' && (
              <div className='template-nine-container-wrapper-rightside-wrapper'>
                <div style={{ width: '100%' }}>
                  <h1>PROFIL </h1>
                  <p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: profileData,
                      }}
                    ></div>
                  </p>
                </div>
              </div>
            )}
            <br />
            <div className='template-nine-container-wrapper-rightside-wrapper'>
              <div>
                <h1>Arbeidserfaring</h1>
                {experianceData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <p>
                        {item?.jobTitle} - {item?.employer}
                      </p>
                      <p style={{ color: 'gray' }}>
                        {item?.startDate} -{' '}
                        {item.toggle ? 'dags dato' : item?.endDate}
                      </p>
                      <div
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                      <br />
                    </div>
                  )
                })}
              </div>
            </div>
            {accordiansEnabled.Praksisplasser === true ? (
              <div className='template-nine-container-wrapper-rightside-wrapper'>
                <div>
                  <h1>Praksisplasser</h1>
                  {internships.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <p>
                          {item?.jobTitle} - {item?.employer}
                        </p>
                        <p style={{ color: 'gray', marginBottom: '10px' }}>
                          {moment(item?.startDate).format('MM YYYY')} -{' '}
                          {item.toggle
                            ? 'dags dato'
                            : moment(item?.endDate).format('MM YYYY')}
                        </p>
                        <p>{item?.additionalInformation}</p>
                        <br />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null}

            <div className='template-nine-container-wrapper-rightside-wrapper'>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h1>Utdanning</h1>
                {educationData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <p>
                        {item?.study} - {item?.school}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '10px',
                          gap: '4px',
                        }}
                      >
                        <p style={{ color: 'gray' }}>
                          {item?.startDate + ' -'}
                        </p>
                        <p style={{ color: 'gray' }}>
                          {item.toggle ? 'dags dato' : item?.endDate}
                        </p>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.additionalInformation,
                        }}
                      ></div>
                      <br />
                    </div>
                  )
                })}
                {accordiansEnabled.Referanser === true ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <h1>REFERANSER </h1>
                    {toggleData ? (
                      <p style={{ fontWeight: 'bold' }}>
                        Oppgis ved forespørsel
                      </p>
                    ) : (
                      <>
                        {references.map((item, index) => {
                          return (
                            <p style={{ fontWeight: 'bold' }} key={index}>
                              {item?.name} ,{item?.companyName} - {item?.email}
                            </p>
                          )
                        })}
                      </>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
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
          onBeforeGetContent={async () => {
            await setPageWidth(true)
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
export default TemplateNine
