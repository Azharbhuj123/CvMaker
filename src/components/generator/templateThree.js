import React, { useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  languageData,
  referenceData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  propertiesData,
  profileRichTextData,
  getRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import ProgressBar from './progressBar'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'
import { useState } from 'react'

const TemplateThree = () => {
  let pdfComponent = useRef()
  let printButtonRef = useRef()
  const cvData = useSelector(CV_DATA)
  const hobbies = useSelector(getHobbies)
  const toggleData = useSelector(getRefToggle)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const internships = useSelector(getInternships)
  const skillData = useSelector(propertiesData)
  const refrence = useSelector(referenceData)
  const courses = useSelector(coursesData)
  const profileData = useSelector(profileRichTextData)
  const lanuages = useSelector(languageData)
  const [isChecked, setIsChecked] = useState(false)
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
      document.getElementsByClassName('template-three-container'),
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
        display: displayTemplate === true ? 'block' : 'flex',
        width:
          displayTemplate === true
            ? '928px'
            : pageWidth === true
            ? '100%'
            : '100% ',
        alignItems: 'center',
        overflowWrap: 'break-word',
        // paddingLeft: "10px",
        flexDirection: 'column',
        height: '100%',
        padding: '10px',
        margin: '10px'
      }}
    >
      <div
        ref={(e) => (pdfComponent = e)}
        style={{
          display: 'block',
          width:
            displayTemplate === true
              ? '928px'
              : pageWidth === true
              ? '100%'
              : '100%',
          height: 'inherit',
          // margin: displayTemplate === true ? '0px' : '10px',
          // padding: displayTemplate === true ? '0px' : '10px',
        }}
        className='template-three-container'
      >
        <div className='template-three-container-mainheading'>
          <h1>{cvData?.firstName + ' ' + cvData?.lastName}</h1>
          <h2>{cvData.jobTitle}</h2>
        </div>
        <div className='template-three-container-wrapper'>
          <div
            className='template-three-container-wrapper-leftside'
            style={{ minHeight: '920px' }}
          >
            <div className='template-three-container-wrapper-leftside-heading'>
              <h1>DETALJER</h1>
              {cvData.physicalAddress === '' ? null : (
                <div className='template-three-container-wrapper-leftside-heading-head'>
                  <h2>Adresse</h2>
                  <span>{cvData?.physicalAddress}</span>
                </div>
              )}
              {cvData.phone === '' ? null : (
                <div className='template-three-container-wrapper-leftside-heading-head'>
                  <h2>TELEFON</h2>
                  <span>{cvData?.phone}</span>
                </div>
              )}

              {cvData?.email === '' ? null : (
                <div className='template-three-container-wrapper-leftside-heading-head'>
                  <h2>E-POST</h2>
                  <span>{cvData?.email}</span>
                </div>
              )}

              {cvData.DOB === '' ? null : (
                <div className='template-three-container-wrapper-leftside-heading-head'>
                  <h2>Fødselsdato</h2>
                  <span>{moment(cvData?.DOB).format('DD,MM,YYYY')}</span>
                </div>
              )}

              {cvData.country === '' ? null : (
                <div className='template-three-container-wrapper-leftside-heading-head'>
                  <h2>By</h2>
                  <span>{cvData?.country}</span>
                </div>
              )}

              {cvData.zipCode === '' ? null : (
                <div className='template-three-container-wrapper-leftside-heading-head'>
                  <h2>Post kode</h2>
                  <span>{cvData?.zipCode}</span>
                </div>
              )}

              {cvData.drivingLicense === '' ? null : (
                <div className='template-three-container-wrapper-leftside-heading-head'>
                  <h2>Førerkort</h2>
                  <span>{cvData?.drivingLicense}</span>
                </div>
              )}
            </div>

            <div className='template-three-container-wrapper-leftside-progress'>
              <h2 style={{ fontSize: '22px' }}>FERDIGHETER</h2>

              {skillData?.map((item, index) =>
                cvData.displayProgressBar === true ? (
                  <ProgressBar
                    keys={index}
                    backgroundcolor='white'
                    title={item?.name}
                    percentage={item?.value}
                    color='#393939'
                    height='1px'
                    dashed='dashed'
                  />
                ) : (
                  <p
                    style={{
                      fontFamily: 'Roboto-Bold',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginTop: '5px',
                    }}
                  >
                    {item?.name}
                  </p>
                )
              )}
            </div>
            <div className='template-three-container-wrapper-leftside-heading'>
              <h1>ANNET</h1>

              <div className='template-three-container-wrapper-leftside-heading-head'>
                <br />
                <h3>Språk</h3>
                {lanuages?.map((item, index) => (
                  <p key={index}>
                    {item.name} {item?.value}
                  </p>
                ))}
                {accordiansEnabled.Hobbyer === true ? (
                  <>
                    <br />
                    <h3>Hobby</h3>
                    <p>
                      {hobbies?.map((item, index) => (
                        <span key={index}>
                          {index === hobbies.length - 1
                            ? item.name + '.'
                            : item.name + ', '}
                        </span>
                      ))}
                    </p>
                  </>
                ) : null}
                {accordiansEnabled.Kurs === true ? (
                  <>
                    <br />
                    <h3>Kurs</h3>
                    {courses?.map((item, index) => (
                      <p key={index}>{item.name}</p>
                    ))}
                  </>
                ) : null}
              </div>
            </div>

            {/* <div className="template-three-container-wrapper-leftside-progress">
              <h2>Talen</h2>

              {lanuages?.map((item, index) => (
                <ProgressBar
                  keys={index}
                  backgroundcolor="#BFBFBF"
                  title={item?.name}
                  percentage={item?.value}
                  color="#393939"
                />
              ))}
            </div> */}
          </div>
          <div className='template-three-container-wrapper-rightside'>
            {profileData !== '<p><br></p>' && profileData !== '<p></p>' && (
              <div className='template-three-container-wrapper-rightside-heading'>
                <h3 style={{ textTransform: 'uppercase' }}>Profil</h3>
                <div
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: profileData,
                  }}
                ></div>
              </div>
            )}

            <div className='template-three-container-wrapper-rightside-heading'>
              {/* <br /> */}
              <h3 style={{ textTransform: 'uppercase', paddingTop: '10px' }}>
                ARBEIDSERFARING
              </h3>
              {experianceData?.map((item) => (
                <div className='template-three-container-wrapper-rightside-heading-subhead'>
                  <h2
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                    }}
                  >
                    {' '}
                    {item?.jobTitle + ' - ' + item?.employer}
                  </h2>
                  <div
                    style={{ display: 'flex', marginTop: '4px', gap: '2px' }}
                  >
                    <span style={{ fontFamily: 'Roboto', fontWeight: '400' }}>
                      {item.startDate.length === 0
                        ? 'Startdato -'
                        : moment(item?.startDate).format('YYYY MM') + ' -  '}
                    </span>

                    <span style={{ fontFamily: 'Roboto', fontWeight: '400' }}>
                    {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                </div>
              ))}
            </div>

            <div className='template-three-container-wrapper-rightside-heading'>
              {/* <br /> */}
              <h3 style={{ textTransform: 'uppercase', paddingTop: '10px' }}>
                UTDANNING
              </h3>

              {educationData?.map((item) => (
                <div className='template-three-container-wrapper-rightside-heading-subhead'>
                  <h2
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                    }}
                  >
                    {item?.study + ' - ' + item?.school}
                  </h2>

                  <div
                    style={{ display: 'flex', marginTop: '4px', gap: '2px' }}
                  >
                    <span style={{ fontFamily: 'Roboto', fontWeight: '400' }}>
                      {item.startDate.length === 0
                        ? 'Startdato -'
                        : moment(item?.startDate).format('YYYY MM') + ' - '}
                    </span>

                    <span style={{ fontFamily: 'Roboto', fontWeight: '400' }}>
                    {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {accordiansEnabled.Praksisplasser === true ? (
              <div className='template-three-container-wrapper-rightside-heading'>
                <h3 style={{ textTransform: 'uppercase', paddingTop: '10px' }}>
                  Praksisplasser
                </h3>

                {internships?.map((item, index) => (
                  <div
                    key={index}
                    className='template-three-container-wrapper-rightside-heading-subhead'
                  >
                    <h2>
                      {item?.jobTitle} - {item?.employer}
                    </h2>
                    <div
                      style={{ display: 'flex', marginTop: '4px', gap: '2px' }}
                    >
                      <p style={{ fontFamily: 'Roboto', fontWeight: '400' }}>
                        {moment(item?.startDate).format('YYYY MM') + ' - '}
                      </p>

                      <p style={{ fontFamily: 'Roboto', fontWeight: '400' }}>
                      {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: 'Roboto',
                      fontSize: '13px',
                      fontWeight: '500',
                    }}
                      dangerouslySetInnerHTML={{
                        __html: item?.additionalInformation,
                      }}
                    ></span>
                  </div>
                ))}
              </div>
            ) : null}
            {accordiansEnabled.Referanser === true ? (
              <div className='template-three-container-wrapper-rightside-heading'>
                <h3 style={{ textTransform: 'uppercase', paddingTop: '10px' }}>
                  REFERANSER
                </h3>
                {toggleData ? (
                  <p
                    style={{
                      fontWeight: '600',
                      marginTop: '5px',
                      fontSize: '13px',
                      fontFamily: 'Roboto-Light',
                      color: 'black',
                    }}
                  >
                    Oppgis ved forespørsel
                  </p>
                ) : (
                  <>
                    {refrence?.map((item) => (
                      <div className='template-three-container-wrapper-rightside-heading-subhead'>
                        <h2>{item?.name + ' , ' + item?.companyName}</h2>
                        <span style={{}}>{item?.email}</span>
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
          alignItems: 'center',
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
              // disabled={!isChecked}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '180px',
                borderRadius: '5px',
                gap: '5px',
                height: '44px',
                background: '#F6F3F1',
                padding: '10px',
                fontFamily: 'Montserrat',
                fontWeight: '600',
                fontSize: '16px',
                border: '1px solid #F6F3F1',
                backgroundColor: '#eeb856',
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

export default TemplateThree
