import React, { useState, useRef } from 'react'
import moment from 'moment'
import UserProfile from '../../assests/images/userProfile.jpg'
import ProgressBar from './progressBar'
import { useSelector } from 'react-redux'
import { useOutletContext, Link } from 'react-router-dom'

import {
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  sliderData,
  languageData,
  propertiesData,
  coursesData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  profileRichTextData,
  referenceData,
} from '../../Redux/reducers/CvGeneratorReducer'
import { Editor, EditorState } from 'draft-js'
import ReactToPrint from 'react-to-print'
const TemplateTwo = () => {
  let pdfComponent = useRef()
  let printButtonRef = useRef()
  let [displayTemplate, setDisplayTemplate] = useOutletContext()
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  let [editorState, setEditorState, contexxt] = useOutletContext()
  const hobbies = useSelector(getHobbies)
  const accordiansEnabled = useSelector(getAdditionalAccordian)
  const internships = useSelector(getInternships)
  const skills = useSelector(sliderData)
  const courses = useSelector(coursesData)
  const profileData = useSelector(profileRichTextData)
  const properties = useSelector(propertiesData)
  const languages = useSelector(languageData)
  const references = useSelector(referenceData)

  if (displayTemplate && displayTemplate === true) {
    console.log(
      'mobile screen detected the element will directly be printed now !!!!!!!!!!!11'
    )
    console.log('wow')
    printButtonRef.current.click()
  }
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        overflowWrap: 'break-word',
        flexDirection: 'column',
      }}
    >
      <div ref={(el) => (pdfComponent = el)} className='templatetwo-container'>
        <div className='templatetwo-container-leftside'>
          <div className='templatetwo-container-leftside-profile'>
            <img src={cvData.profileImage} alt='img' />
            <h1>
              {cvData?.firstName} {cvData?.lastName}
            </h1>
            <h2>{cvData?.jobTitle}</h2>
          </div>

          <div className='templatetwo-container-leftside-address'>
            <h3>Detaljer</h3>
            {cvData?.physicalAddress === '' ||
            cvData?.physicalAddress === null ||
            cvData?.physicalAddress === ' ' ? null : (
              <>
                <h2>ADDRESS</h2>
                <h2>{cvData?.physicalAddress}</h2>
              </>
            )}
            {cvData?.phone === '' ||
            cvData?.phone === null ||
            cvData?.phone === ' ' ? null : (
              <>
                <h2>TELEFON</h2>
                <h2>{cvData?.phone}</h2>
              </>
            )}
            {cvData?.email === '' ||
            cvData?.email === null ||
            cvData?.email === ' ' ? null : (
              <>
                <h2>E-POST</h2>
                <h2>{cvData?.email}</h2>
              </>
            )}
            {cvData?.DOB === '' ||
            cvData?.DOB === null ||
            cvData?.DOB === ' ' ? null : (
              <>
                <h2>Fodselsdato</h2>
                <h2>{cvData?.DOB}</h2>
              </>
            )}
            {/* <h4>Asker</h4> */}
            {cvData?.country === '' ||
            cvData?.country === null ||
            cvData?.country === ' ' ? null : (
              <>
                <h2>Nasjonalitet</h2>
                <h2>{cvData?.country}</h2>
              </>
            )}
          </div>
          {skills.length === 0 ? null : (
            <div className='templatetwo-container-leftside-progress'>
              <h2>Feroighehr</h2>
              {skills.map((item, index) => {
                return (
                  <div key={index}>
                    <ProgressBar
                      backgroundcolor='white'
                      title={item?.name}
                      percentage={item?.value}
                      color='#487b77'
                    />
                  </div>
                )
              })}
            </div>
          )}
          {languages.length === 0 ? null : (
            <div className='templatetwo-container-leftside-progress'>
              <h2>Sprak</h2>
              {languages.map((item, index) => {
                return (
                  <div key={index}>
                    <ProgressBar
                      backgroundcolor='white'
                      title={item?.name}
                      percentage={item?.value}
                      color='#487b77'
                    />
                  </div>
                )
              })}
            </div>
          )}

          {accordiansEnabled.Hobbyer === true ? (
            <div className='templatetwo-container-leftside-progress'>
              <h2>Hobbyer</h2>
              {hobbies.map((item, index) => {
                return (
                  <div key={index}>
                    <h2 style={{ color: 'white' }}>{item?.name}</h2>
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>

        <div className='templatetwo-container-rightside'>
          <div className='templatetwo-container-rightside-profilepara'>
            <span>Profile</span>
            <Editor
              editorState={
                Object.keys(editorState).length === 0
                  ? EditorState.createEmpty()
                  : editorState
              }
              readOnly={true}
            ></Editor>
          </div>
          {accordiansEnabled.Praksisplasser === true ? (
            <div className='templatetwo-container-rightside-refrence'>
              <span>Praksisplasser</span>
              {internships.map((item, index) => (
                <div
                  key={index}
                  className='templatetwo-container-rightside-refrence-head'
                >
                  <h1>{item?.jobTitle}</h1>
                  <h5>
                    {' '}
                    {moment(item?.startDate).format('MM/YYYY') +
                      ' - ' +
                      moment(item?.endDate).format('MM/YYYY')}
                  </h5>
                </div>
              ))}
            </div>
          ) : null}
          {experianceData.length === 0 ? null : (
            <div className='templatetwo-container-rightside-workhistory'>
              <span>Arbeioshisiorikk</span>
              {experianceData.map((item, index) => (
                <div className='templatetwo-container-rightside-workhistory-headings'>
                  <h2>
                    {item?.jobTitle} hos {item?.employer}, {item?.location}
                  </h2>
                  <h3>
                    {item?.startDate} - {item?.endDate}
                  </h3>
                  <p>{item?.additionalInformation}</p>
                </div>
              ))}
            </div>
          )}
          {educationData.length === 0 ? null : (
            <div className='templatetwo-container-rightside-education'>
              <span>Utoannihg</span>
              {educationData.map((item) => (
                <div className='templatetwo-container-rightside-education-head'>
                  <h1>
                    {item.study}, {item.school}, {item.location}
                  </h1>
                  <h5>
                    {item.startDate} - {item.endDate}
                  </h5>
                </div>
              ))}
            </div>
          )}

          {accordiansEnabled.Praksisplasser === true ? (
            <div className='templatetwo-container-rightside-refrence'>
              <span>Praksisplasser</span>
              {internships.map((item, index) => (
                <div
                  key={index}
                  className='templatetwo-container-rightside-refrence-head'
                >
                  <h1>{item?.jobTitle}</h1>
                  <h5>
                    {' '}
                    {moment(item?.startDate).format('MM/YYYY') +
                      ' - ' +
                      moment(item?.endDate).format('MM/YYYY')}
                  </h5>
                </div>
              ))}
            </div>
          ) : null}
          {accordiansEnabled.Kurs === true ? (
            <div className='templatetwo-container-rightside-refrence'>
              <span>Cursessen</span>
              {courses.map((item, index) => (
                <div
                  key={index}
                  className='templatetwo-container-rightside-refrence-head'
                >
                  <h1>{item?.name}</h1>
                  <h5>
                    {' '}
                    {moment(item?.startDate).format('DD/MM/YYYY') +
                      ' - ' +
                      moment(item?.endDate).format('DD/MM/YYYY')}
                  </h5>
                </div>
              ))}
            </div>
          ) : null}
          {accordiansEnabled.Referanser === true ? (
            <div className='templatetwo-container-rightside-refrence'>
              <span>Referanser</span>
              {references.map((item, index) => (
                <div
                  key={index}
                  className='templatetwo-container-rightside-refrence-head'
                >
                  <h1>{item?.name}</h1>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <button
          style={{
            margin: '15px',
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
          Endre mal
        </button>
        <div className='gdpr-image'>
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
            <span style={{ color: 'red' }}>
              {' '}
              Husk å trykke på 'Oppdater tekst' før du laster ned CV-en din
            </span>
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
          content={() => pdfComponent}
        />
      </div>
    </div>
  )
}

export default TemplateTwo
