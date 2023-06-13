import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import userprofile from '../../assests/images/pr.png'
import { useOutletContext, Link } from 'react-router-dom'
import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  coursesData,
  referenceData,
  languageData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  propertiesData,
  profileRichTextData,
  getRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import ReactToPrint from 'react-to-print'

import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'
const TemplateSix = () => {
  let pdfComponent = useRef()
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  let printButtonRef = useRef()
  const [isChecked, setIsChecked] = useState(false)
  const toggleData = useSelector(getRefToggle)
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const dob = moment(cvData?.DOB).format('DD,MM,YYYY')
  const courses = useSelector(coursesData)
  const refrence = useSelector(referenceData)
  const languages = useSelector(languageData)
  const properties = useSelector(propertiesData)
  const profileData = useSelector(profileRichTextData)
  const [changeOccured, setChangeOccured] = useState(false)
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   console.log("wow");
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('function-hook'),
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
        // width: displayTemplate === true ? "100%" : pageWidth === true ? "100%" : "95%",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflowWrap: 'break-word',
        flexDirection: 'column',
        height: '96%',
        // marginTop: '10px',
        margin: '10px',
        padding: '10px'
      }}
    >
      <div className='template-six-container' style={{ height: 'inherit' }}>
        <div
          ref={(el) => (pdfComponent = el)}
          className='function-hook'
          style={{
            width:
              displayTemplate === true
                ? '720px'
                : pageWidth === true
                ? '720px'
                : '100%',
            // height: '100%',
            minHeight: '1035px',
            margin: displayTemplate === true ? '10px' : '12px',
            padding: displayTemplate === true ? '10px' : '12px',
            display: 'block',
            // justifyContent: "center",
            // flexDirection: "column",
          }}
        >
          <div className='template-six-container-header'>
            <div className='template-six-container-header-heading'>
              <h2>
                {cvData.firstName ? cvData?.firstName + ' ' : 'Your Name'}
                {cvData.lastName ? cvData?.lastName : ' '}
              </h2>
              <div className='template-six-container-header-heading-divOne-jobTitle'>
                <p>{cvData?.jobTitle}</p>
              </div>
              <div className='template-six-container-header-heading-divOne'>
                <div>
                  {cvData?.DOB == '' ? null : (
                    <span>
                      Fødselsdato: {moment(cvData?.DOB).format('DD,MM,YYYY')}
                    </span>
                  )}
                  <span>Mail: {cvData.email ? cvData.email : 'din epost'}</span>
                  {cvData?.drivingLicense !== '' ? (
                    <span>Førerkort: {cvData?.drivingLicense}</span>
                  ) : null}
                </div>

                <div>
                  <span>
                    Telefon: {cvData.phone ? cvData.phone : 'din telefon'}
                  </span>
                  <span>
                    Adresse:
                    {cvData.physicalAddress !== ''
                      ? cvData.physicalAddress + ', ' + cvData.zipCode
                      : 'adressen din'}
                  </span>
                  <span>{cvData.country !== '' ? cvData.country : null}</span>
                </div>
              </div>
            </div>
            <div className='template-six-container-header-imgdiv'>
              <img
                src={cvData.profileImage ? cvData.profileImage : userprofile}
                alt=''
                style={cvData.profileImage ? null : { display: 'none' }}
              />
            </div>
          </div>
          {profileData !== '<p><br></p>' && profileData !== '<p></p>' && (
            <div className='template-six-container-profile'>
              <h2 style={{ textTransform: 'uppercase' }}>Profil</h2>
              {/* <p>{cvData?.profile}</p> */}
              <p
                style={{ fontFamily: 'Arial', fontSize: '12px' }}
                dangerouslySetInnerHTML={{
                  __html: profileData,
                }}
              ></p>
            </div>
          )}
          <div
            className='template-six-container-content'
          >
            <div className='template-six-container-content-heading-box'>
              <div className='template-six-container-content-heading-box-leftSide'>
                <p>ERFARING</p>
              </div>
              <div className='template-six-container-content-heading-box-rightSide'></div>
            </div>
            {experianceData.map((item, index) => (
              <div
                key={index}
                className='template-six-container-content-heading-box'
              >
                <div className='template-six-container-content-heading-box-leftSide'>
                  <h3>
                    {item.startDate.length === 0
                      ? 'Startdato'
                      : moment(item.startDate).format('YYYY MM')}{' '}
                    {' - '}
                    {item.toggle
                      ? 'dags dato'
                      : item.endDate.length === 0
                      ? ' Sluttdato'
                      : moment(item?.endDate).format('YYYY-MM')}
                  </h3>
                </div>
                <div className='template-six-container-content-heading-box-rightSide'>
                  <h3>
                    {item?.jobTitle}, {item?.employer}
                  </h3>
                  <div
                    style={{ fontFamily: 'Arial', fontSize: '17px' }}
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                </div>
              </div>
            ))}
            <div className='template-six-container-content-heading-box'>
              <div className='template-six-container-content-heading-box-leftSide'>
                <p>UTDANNING</p>
              </div>
              <div className='template-six-container-content-heading-box-rightSide'></div>
            </div>
            {educationData.map((item, index) => (
              <div
                key={index}
                className='template-six-container-content-heading-box'
              >
                <div
                  style={{ gap: '4px' }}
                  className='template-six-container-content-heading-box-leftSide'
                >
                  <h3 style={{ marginLeft: '0px' }}>
                    {item.startDate.length === 0
                      ? 'Startdato'
                      : moment(item.startDate).format('YYYY MM')}{' '}
                    {' - '}
                  </h3>
                  <h3 style={{ marginLeft: '0px' }}>
                    {item.toggle
                      ? 'dags dato'
                      : item.endDate.length === 0
                      ? ' Sluttdato'
                      : moment(item?.endDate).format('YYYY-MM')}
                  </h3>
                </div>
                <div className='template-six-container-content-heading-box-rightSide'>
                  <h3>
                    {item?.study}, {item.school}
                  </h3>
                  <div
                    style={{ fontFamily: 'Arial', fontSize: '17px' }}
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                </div>
              </div>
            ))}
            {accordiansEnabled.Praksisplasser === true ? (
              <>
                <div className='template-six-container-content-heading-box'>
                  <div className='template-six-container-content-heading-box-leftSide'>
                    <p>PRAKSISPLASSER</p>
                  </div>
                  <div className='template-six-container-content-heading-box-rightSide'></div>
                </div>
                {internships.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='template-six-container-content-heading-box'
                    >
                      <div className='template-six-container-content-heading-box-leftSide'>
                        <h3>
                          {moment(item.startDate).format('YYYY MM')} {' - '}
                          {item.toggle
                            ? 'dags dato'
                            : moment(item.endDate).format('YYYY MM')}
                        </h3>
                      </div>
                      <div className='template-six-container-content-heading-box-rightSide'>
                        <h3>
                          {item?.jobTitle} - {item?.employer}
                        </h3>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.additionalInformation,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : null}
            <div className='template-six-container-content-heading-box'>
              <div className='template-six-container-content-heading-box-leftSide'>
                <p>FERDIGHETER</p>
              </div>
              <div className='template-six-container-content-heading-box-rightSide'></div>
            </div>
            <div className='template-six-container-content-heading-box'>
              <div className='template-six-container-content-heading-box-leftSide'></div>
              <div className='template-six-container-content-heading-box-rightSide'>
                <ul>
                  {properties.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='template-six-container-content-heading-box'>
              <div className='template-six-container-content-heading-box-leftSide'>
                <p>ANNET</p>
              </div>
              <div className='template-six-container-content-heading-box-rightSide'></div>
            </div>
            <div className='template-six-container-content-heading-box'>
              <div className='template-six-container-content-heading-box-leftSide'></div>
              <div className='template-six-container-content-heading-box-rightSide'>
                <h3
                  style={{
                    fontWeight: '600',
                    marginTop: '20px',
                  }}
                >
                  Språk
                </h3>
                {languages.map((item, index) => (
                  <p key={index}>
                    {item.name} {item?.value}
                  </p>
                ))}
              </div>
            </div>
            {accordiansEnabled.Hobbyer === true ? (
              <div className='template-six-container-content-heading-box'>
                <div className='template-six-container-content-heading-box-leftSide'></div>
                <div className='template-six-container-content-heading-box-rightSide'>
                  <h3 style={{ fontWeight: '600', marginTop: '20px' }}>
                    Hobby
                  </h3>
                  {hobbies.map((item, index) => (
                    <p key={index}>{item.name}</p>
                  ))}
                </div>
              </div>
            ) : null}
            {accordiansEnabled.Kurs === true ? (
              <div className='template-six-container-content-heading-box'>
                <div className='template-six-container-content-heading-box-leftSide'></div>
                <div className='template-six-container-content-heading-box-rightSide'>
                  <h3 style={{ fontWeight: '600', marginTop: '20px' }}>Kurs</h3>
                  {courses.map((item, index) => (
                    <p key={index}>{item.name}</p>
                  ))}
                </div>
              </div>
            ) : null}
            {accordiansEnabled.Referanser === true ? (
              <>
                <div className='template-six-container-content-heading-box'>
                  <div className='template-six-container-content-heading-box-leftSide'>
                    <p onClick={() => console.log(refrence)}>REFERANSE</p>
                  </div>
                  <div className='template-six-container-content-heading-box-rightSide'></div>
                </div>

                {refrence.map((item, index) => (
                  <div
                    key={index}
                    className='template-six-container-content-heading-box'
                  >
                    <div className='template-six-container-content-heading-box-leftSide'></div>
                    <div className='template-six-container-content-heading-box-rightSide'>
                      {toggleData ? (
                        <p>Oppgis ved forespørsel</p>
                      ) : (
                        <>
                          <h3>
                            {item?.name} - {item?.companyName}
                          </h3>
                          <p>{item?.email}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: '#F6F3F1',
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

export default TemplateSix
