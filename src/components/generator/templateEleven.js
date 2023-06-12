import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext, Link } from 'react-router-dom'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  getAdditionalAccordian,
  getHobbies,
  getInternships,
  getRefToggle,
  languageData,
  profileRichTextData,
  propertiesData,
  referenceData,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import ProgressBar from './progressBar'
import ReactToPrint from 'react-to-print'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'

const TemplateEleven = () => {
  let pdfComponent = useRef()
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const toggleData = useSelector(getRefToggle)
  const [changeOccured, setChangeOccured] = useState(false)
  const courses = useSelector(coursesData)
  // const profileData = useSelector(profileRichTextData);
  let printButtonRef = useRef()
  let [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  const [isChecked, setIsChecked] = useState(false)
  const properties = useSelector(propertiesData)
  const languages = useSelector(languageData)
  const refrence = useSelector(referenceData)
  const enabledAccordians = useSelector(getAdditionalAccordian)
  const hobbies = useSelector(getHobbies)
  const internships = useSelector(getInternships)
  const profileData = useSelector(profileRichTextData)
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   console.log("wow");
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('templateeleven-container'),
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
        display: displayTemplate
          ? 'flex'
          : pageWidth === true
          ? 'none'
          : 'flex',
        width:
          displayTemplate === true
            ? '928px'
            : pageWidth === true
            ? '95%'
            : '95%',
        alignItems: 'center',
        overflowWrap: 'break-word',
        flexDirection: 'column',
        marginTop: '10px',
        height: '100%',
      }}
    >
      <div
        style={{
          width:
            displayTemplate === true
              ? '928px'
              : pageWidth === true
              ? '100%'
              : '100%',
          display: 'flex',
          height: 'inherit',
          justifyContent: 'inherit',
          // margin: displayTemplate === true ? "0px" : "10px",
          // padding: displayTemplate === true ? "0px" : "10px",
        }}
        ref={(el) => (pdfComponent = el)}
        className='templateeleven-container'
      >
        <div className='templateeleven-container-header'>
          <div className='templateeleven-container-header-leftside'></div>
          <div className='templateeleven-container-header-rightside'>
            <h2>
              {cvData?.firstName} <span>{cvData?.lastName}</span>
            </h2>

            <strong style={{ fontFamily: 'Calibri' }}>
              {cvData?.jobTitle}
            </strong>

            <p>
              <strong>Epost:</strong> {cvData?.email} /{' '}
              {cvData?.phone === '' ? null : (
                <>
                  / <strong>Tlf: </strong>
                  {cvData?.phone}
                </>
              )}
              {cvData?.physicalAddress === '' ? null : (
                <>
                  / <strong>Adresse: </strong>
                  {cvData?.physicalAddress}
                </>
              )}
              {cvData?.zipCode === '' ? null : <>{',' + cvData?.zipCode}</>}
              {cvData?.drivingLicense === '' ? null : (
                <>
                  / <strong>Førerkort:</strong> {cvData?.drivingLicense}
                </>
              )}
              {cvData?.DOB === '' ? null : (
                <>
                  / <strong>Fødselsdato:</strong>{' '}
                  {moment(cvData?.DOB).format('DD,MM,YYYY')}
                </>
              )}
            </p>
          </div>
        </div>

        <div className='templateeleven-container-body'>
          {/* {profileData !== '<p><br></p>' && ( */}
          <div className='templateeleven-container-body-about'>
            <h3>OM MEG</h3>
            <div
              style={{
                fontFamily: 'Calibri',
                fontSize: '12px',
                borderBottom: '1px solid',
                paddingBottom: '5px',
              }}
              dangerouslySetInnerHTML={{
                __html: profileData,
              }}
            ></div>
          </div>
          {/* )} */}
          <div
            style={{ paddingTop: '0.5rem' }}
            className='templateeleven-container-body-workexperience'
          >
            <h3>ARBEIDSERFARING</h3>
            {experianceData?.map((item, index) => {
              return (
                <>
                  <h4>
                    {item?.jobTitle} | {item?.employer}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <span>{item?.location}</span> */}
                    <span>
                      {item?.startDate} -{' '}
                      {item.toggle ? 'dags dato' : item?.endDate}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'Calibri',
                      fontSize: '12px',
                      flexDirection: 'column',
                      borderBottom: '1px solid',
                      paddingBottom: '5px',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                </>
              )
            })}
          </div>
          {enabledAccordians.Praksisplasser === true ? (
            <div
              style={{ paddingTop: '0.5rem' }}
              className='templateeleven-container-body-workexperience'
            >
              <h3>Praksisplasser</h3>
              {internships?.map((item, index) => {
                return (
                  <>
                    <h4>
                      {item?.jobTitle} | {item?.employer}
                    </h4>
                    <div>
                      {/* <span>{item?.location}</span> */}
                      <span>
                        {item?.startDate} -{' '}
                        {item.toggle ? 'dags dato' : item?.endDate}
                      </span>
                    </div>
                    <h5
                      dangerouslySetInnerHTML={{
                        __html: item?.additionalInformation,
                      }}
                      style={{
                        fontFamily: 'Calibri',
                        fontSize: '12px',
                        fontWeight: '500',
                        borderBottom: '1px solid',
                      }}
                    >
                      {/* {'● '} */}
                      {/* {item?.additionalInformation} */}
                    </h5>
                  </>
                )
              })}
            </div>
          ) : null}
        </div>
        <div
          className='templateeleven-container-bottom-side'
          style={{ minHeight: '800px' }}
        >
          <div className='templateeleven-container-bottom-side-left'>
            <div className='templateeleven-container-bottomdiv'>
              <h3>PROFESJONELL EKSPERTISE</h3>

              <div className='templateeleven-container-bottomdiv-leftside'>
                <h2>ferdigheter</h2>
                <div className='settingdiv'>
                  {properties?.map((item) => (
                    <div className='templateeleven-container-bottomdiv-leftside-nameprogress'>
                      <h4 style={{ width: '200px' }}>{item?.name}</h4>
                      {cvData?.displayProgressBar === true ? (
                        <ProgressBar
                          backgroundcolor='rgb(237, 125, 49)'
                          percentage={item?.value}
                          wrapperColor={'grey'}
                          fontFamily={'Calibri'}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='templateeleven-container-bottomdiv'>
              <h3>ANNET</h3>

              <div className='templateeleven-container-bottomdiv-leftside'>
                <h2>Språk</h2>
                <div className='settingdiv'>
                  {languages?.map((item) => (
                    <div className='templateeleven-container-bottomdiv-leftside-nameprogress'>
                      <span>
                        {item?.name} {item?.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {enabledAccordians.Kurs === true ? (
                <div className='templateeleven-container-bottomdiv-leftside'>
                  <h2>Kurs</h2>
                  <div className='settingdiv'>
                    {courses?.map((item) => (
                      <div className='templateeleven-container-bottomdiv-leftside-nameprogress'>
                        <span>{item?.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {enabledAccordians.Hobbyer === true ? (
                <div className='templateeleven-container-bottomdiv-leftside'>
                  <h2>HOBBY</h2>
                  <div className='settingdiv'>
                    <p>
                      {hobbies?.map((item, index) => (
                        <span>
                          {index === hobbies.length - 1
                            ? item?.name + '.'
                            : item?.name + ', '}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div
            style={{ paddingLeft: '1rem' }}
            className='templateeleven-container-bottom-side-right'
          >
            {' '}
            <div className='templateeleven-container-bottomdiv'>
              <h3>UTDANNELSE</h3>

              <div className='studyingdiv'>
                {educationData?.map((item) => (
                  <div className='settingdiv'>
                    <h4 style={{ textTransform: 'uppercase' }}>
                      {item?.study}
                    </h4>
                    <h4>{item?.school}</h4>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                      }}
                    >
                      <h4>
                        {item.startDate.length === 0
                          ? 'Startdato -'
                          : moment(item?.startDate).format('MM YYYY') + ' - '}
                      </h4>
                      <h4>
                        {item.endDate.length === 0
                          ? 'sluttdato -'
                          : moment(item?.endDate).format('MM YYYY')}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {enabledAccordians.Referanser === true ? (
              <div className='templateeleven-container-bottomdiv'>
                <h3>Referanser</h3>

                {toggleData ? (
                  <p
                    style={{
                      marginTop: '5px',
                      wordBreak: 'break-all',
                      fontSize: '13px',
                      fontFamily: 'Calibri-Bold',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    Oppgis ved forespørsel
                  </p>
                ) : (
                  <div className='studyingdiv'>
                    {refrence?.map((item) => (
                      <div className='settingdiv'>
                        <h4>{item?.name + ' - ' + item?.companyName}</h4>

                        <h4>{item?.email}</h4>
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
              // disabled={!isChecked}
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

export default TemplateEleven
