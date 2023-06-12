import React, { useEffect, useRef } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  languageData,
  profileRichTextData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  referenceData,
  propertiesData,
  getRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import moment from 'moment'
import { useSelector } from 'react-redux'
import ProgressBar from './progressBar'
import EndreMaalButton from '../endreMaalButton/EndreMaalButton'
import { sendFileToBackend } from '../../helper/helperFunctions'
import { useState } from 'react'

const TemplateEight = (props) => {
  const storedChildHeight = localStorage.getItem('childHeight');
  const [childHeight, setChildHeight] = useState(882);
  const [page, setPage] = useState(1);
  var parentElement = document.getElementById('parent')?.offsetHeight;

  setTimeout(() => {
    let updatedHeight = parentElement
    let contentPosition = document.getElementById('parent').scrollHeight
    console.log(updatedHeight, childHeight,contentPosition,"hhhhh");
  }, 100);

  // useEffect(() => {
  //        localStorage.setItem('childHeight', childHeight);
  //   if (parentElement > 1055 && page !== 2) {
  //      setChildHeight(Number(childHeight) + 1055);
  //      setPage(2);
  //   } else if (parentElement <= 1055 && page == 2) {
  //     setChildHeight(815);
  //     setPage(1);
  //   } else {
  //     setChildHeight(childHeight);
  //   }
  // }, [parentElement]);
 
  useEffect(()=>{
    if(parentElement>1122 && page!==2){
      setChildHeight(childHeight+1122)
      setPage(2)
    }
    else if(parentElement==1122){
      setChildHeight(882)
      setPage(1)
    }
    else{
      setChildHeight(childHeight)
    }
},[parentElement])
console.log(parentElement,"oooooooooooooooooooooo")

  let pdfComponent = useRef()
  let printButtonRef = useRef()
  const [displayTemplate, setDisplayTemplate, pageWidth, setPageWidth] =
    useOutletContext()
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const hobbies = useSelector(getHobbies)
  const [isChecked, setIsChecked] = useState(false)
  const [changeOccured, setChangeOccured] = useState(true)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const profileData = useSelector(profileRichTextData)
  const skillData = useSelector(propertiesData)
  const refrence = useSelector(referenceData)
  const courses = useSelector(coursesData)
  const lanuages = useSelector(languageData)
  const toggleData = useSelector(getRefToggle)
  const { ProfilText } = props
  // if (displayTemplate && displayTemplate === true ) {
  //   console.log(
  //     "mobile screen detected the element will directly be printed now !!!!!!!!!!!11"
  //   );
  //   printButtonRef.current.click();
  // }

  const sendPrintedDocument = async () => {
    await sendFileToBackend(
      document.getElementsByClassName('template-eight-container'),
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
        width: '90%',
        alignItems: 'center',
        overflowWrap: 'break-word',
        flexDirection: 'column',
        marginTop: '10px',
        paddingLeft: '10px',
        height: '100%',
      }}
    >
      <div
        style={{
          // display: displayTemplate === true ? "none" : "block",
          display: 'block',
          width:
            displayTemplate === true
              ? '928px'
              : pageWidth === true
              ? '100%'
              : '100%',
        }}
        ref={(el) => (
          pdfComponent = el
  )}
        className='template-eight-container'
        id="parent"
      >
        <div className='template-eight-container-header'>
          <div
            style={{
              width: '30%',
              minHeight: '240px',
              backgroundColor: '#eeeae4',
            }}
          ></div>
          <div style={{ width: '70%', height: '100%' }}></div>
          <div className='template-eight-container-header-wrapper'>
            <div>
              <h1>{cvData?.firstName + ' ' + cvData?.lastName}</h1>
              <p>{cvData.jobTitle}</p>
            </div>
          </div>
        </div>
        <div
          className='template-eight-container-content'
          style={{ height: 'inherit' }}
        >
          {/* {console.log('Container Height', containerHeight )} */}
          <div
            className='template-eight-container-content-left'
            // id="child"
            style={{ minHeight: childHeight}}
            //  ref={templateContentLeftRef}
            //  style={{
            //   minHeight: containerHeight > 1055 ? '1055px' : '815px',
            // }}
          >
            <h1 className='template-eight-container-content-left-heading'>
              DETALJER
            </h1>
            <div className='template-eight-container-content-left-content'>
              {cvData.physicalAddress !== '' ? <h3>ADRESSE</h3> : null}
              {cvData.physicalAddress !== '' ? (
                <p>{cvData?.physicalAddress}</p>
              ) : null}
              {cvData?.physicalAddress !== '' ? <span /> : null}

              {cvData.country !== '' ? <h3>By</h3> : null}
              {cvData.country !== '' ? <p>{cvData?.country}</p> : null}
              {cvData?.country !== '' ? <span /> : null}

              {cvData?.zipCode !== '' ? <h3>Post kode</h3> : null}
              {cvData?.zipCode !== '' ? <p>{cvData?.zipCode}</p> : null}
              {cvData?.zipCode !== '' ? <span /> : null}

              {cvData?.drivingLicense ? <h3>Førerkort</h3> : null}
              {cvData?.drivingLicense ? <p>{cvData?.drivingLicense}</p> : null}
              {cvData?.drivingLicense ? <span /> : null}

              <h3>E-POST</h3>
              <p>{cvData?.email}</p>
              <span />
              <h3>TELEFON</h3>
              <p>{cvData?.phone}</p>
              <span />

              {/* <p>{(cvData?.DOB)}</p> */}
              {cvData?.DOB == '' ? null : (
                <>
                  <h3>Fødselsdato</h3>
                  <p> {moment(cvData?.DOB).format('DD,MM,YYYY')}</p>
                </>
              )}
            </div>

            <div className='template-eight-container-content-left-content'>
              <h1 className='template-eight-container-content-left-heading'>
                FERDIGHETER
              </h1>
              {skillData?.map((item, index) => {
                return (
                  <>
                    {cvData.displayProgressBar === true ? (
                      <>
                        <ProgressBar
                          // fontFamily={"Roboto-Bold"}
                          keys={index}
                          title={item?.name}
                          percentage={item?.value}
                          backgroundcolor='#B19C7D'
                          height='3px'
                          dashed='dotted'
                          color='white'
                        />

                        <br />
                        <span />
                      </>
                    ) : (
                      <p
                        style={{
                          fontFamily: 'Roboto-Bold',
                          fontWeight: '300',
                        }}
                        key={index}
                      >
                        {item?.name}
                      </p>
                    )}
                  </>
                )
              })}
            </div>
            <div
              style={{ paddingBottom: '1rem' }}
              className='template-eight-container-content-left-content'
            >
              <h1 className='template-eight-container-content-left-heading'>
                ANNET
              </h1>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className='template-eight-container-content-left-subheading'>
                  Språk
                </h3>
                {lanuages?.map((item, index) => (
                  <h7
                    className='template-eight-container-content-left-point'
                    key={index}
                  >
                    {item?.name} {item?.value}
                  </h7>
                ))}

                {accordiansEnabled.Hobbyer === true ? (
                  <>
                    <span style={{ height: '0.8rem' }}> </span>
                    <h3>Hobby</h3>
                    <h7>
                      {hobbies?.map((item, index) => (
                        <span
                          key={index}
                          className='template-eight-container-content-left-point'
                        >
                          {index === hobbies.length - 1
                            ? item?.name + '.'
                            : item?.name + ', '}
                        </span>
                      ))}
                    </h7>
                  </>
                ) : null}
                {accordiansEnabled.Kurs === true ? (
                  <>
                    <span style={{ height: '0.8rem' }}> </span>
                    <h3>Kurs</h3>
                    {courses?.map((item, index) => (
                      <h7
                        key={index}
                        className='template-eight-container-content-left-point'
                      >
                        {index === courses.length - 1
                          ? item?.name + '.'
                          : item?.name + ', '}
                      </h7>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className='template-eight-container-content-right'>
            {profileData !== '<p><br></p>' && profileData !== '<p></p>' && (
              <>
                <h1 className='template-eight-container-content-right-heading'>
                  PROFIL
                </h1>

                <div
                  className='template-eight-container-content-right-content'
                  style={{ fontSize: '0.8rem', fontWeight: '300' }}
                >
                  <div
                    // style={{ fontWeight: '300' }}
                    dangerouslySetInnerHTML={{
                      __html: profileData,
                    }}
                  ></div>
                </div>
              </>
            )}

            <h1 className='template-eight-container-content-right-heading'>
              ARBEIDSERFARING
            </h1>
            <div className='template-eight-container-content-right-content'>
              {experianceData?.map((item, index) => (
                <>
                  <p
                    key={index}
                    style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}
                  >
                    {item?.jobTitle + ' - ' + item?.employer}
                  </p>
                  <div style={{ display: 'flex' }}>
                    <p>
                      {item.startDate?.length === 0
                        ? 'Startdato -'
                        : moment(item?.startDate).format('YYYY-MM') + ' - '}
                    </p>
                    <p>
                      {/* {item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                        {item.toggle
                        ? 'dags dato'
                        : moment(item?.endDate).format('YYYY')
                        } */}

                      {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                    </p>
                  </div>
                  <div
                    style={{ fontSize: '0.8rem' }}
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                  {/* <p>⋅ Gode kommunikasjons- og kundeservice ferdigheter </p>
                <p> ⋅ Det viktigste jeg har lært av jobben </p>{" "}
                <p>⋅ Den største utfordringen jeg har kommet over på jobb</p>
                <p> . Hva du kan forvente av meg</p> */}
                </>
              ))}
              <span />
              <span />
            </div>
            <h1 className='template-eight-container-content-right-heading'>
              UTDANNING
            </h1>
            {educationData?.map((item, index) => {
              return (
                <div
                  keys={index}
                  className='template-eight-container-content-right-content'
                >
                  {item?.study ? (
                    <p style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
                      {' '}
                      {item?.study + ', ' + item?.school}
                    </p>
                  ) : null}

                  <div style={{ display: 'flex' }}>
                    <p>
                      {item.startDate?.length === 0
                        ? 'Startdato -'
                        : moment(item?.startDate).format('YYYY-MM') + ' - '}
                    </p>

                    <p>
                      {item.toggle
                        ? 'dags dato'
                        : item.endDate.length === 0
                        ? ' Sluttdato'
                        : moment(item?.endDate).format('YYYY-MM')}
                    </p>
                  </div>
                  <div
                    style={{ fontSize: '0.8rem' }}
                    dangerouslySetInnerHTML={{
                      __html: item?.additionalInformation,
                    }}
                  ></div>
                </div>
              )
            })}
            {accordiansEnabled.Praksisplasser === true ? (
              <>
                <h1 className='template-eight-container-content-right-heading'>
                  PRAKSISPLASSER
                </h1>
                {internships?.map((item, index) => (
                  <div
                    keys={index}
                    className='template-eight-container-content-right-content'
                  >
                    <p style={{ fontWeight: 'bold' }}>
                      {item?.jobTitle + ' - ' + item?.employer}
                    </p>
                    <div style={{ display: 'flex' }}>
                      <p>
                        {item.startDate.length === 0
                          ? 'Startdato -'
                          : moment(item?.startDate).format('YYYY-MM') + ' - '}
                      </p>

                      <p>
                        {item.toggle
                          ? 'dags dato'
                          : item.endDate.length === 0
                          ? 'Sluttdato'
                          : moment(item?.endDate).format('YYYY-MM')}
                      </p>
                    </div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.additionalInformation,
                      }}
                    ></p>
                  </div>
                ))}
              </>
            ) : null}
            {accordiansEnabled.Referanser === true ? (
              <>
                <h1 className='template-eight-container-content-right-heading'>
                  REFERANSER
                </h1>

                {refrence?.map((item, index) => (
                  <div
                    key={index}
                    className='template-eight-container-content-right-content'
                  >
                    {toggleData ? (
                      <p>Oppgis ved forespørsel </p>
                    ) : (
                      <>
                        <h3>{item?.name}</h3>
                        <p>{item?.companyName}</p>
                        <p>{item?.email}</p>
                      </>
                    )}
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
            setDisplayTemplate(false)
            setChangeOccured(!changeOccured)
          }}
        />
      </div>
    </div>
  )
}

export default TemplateEight
