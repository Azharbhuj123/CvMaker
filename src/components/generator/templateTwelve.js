import React, { useRef } from 'react'
import UserProfile from '../../assests/images/userProfile.jpg'
import ProgressBar from './progressBar'
import { BsBookFill } from 'react-icons/bs'
import { FaMusic, FaAndroid } from 'react-icons/fa'
import { BiFootball } from 'react-icons/bi'
import { MdLocalActivity, MdOutlineAirplanemodeActive } from 'react-icons/md'
import { CgGym } from 'react-icons/cg'
import ReactToPrint from 'react-to-print'
import { useOutletContext, Link } from 'react-router-dom'
import { EditorState } from 'draft-js'
import { Editor } from 'draft-js'
import { useSelector } from 'react-redux'
import moment from 'moment'

import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  getAdditionalAccordian,
  getHobbies,
  getInternships,
  languageData,
  propertiesData,
  referenceData,
  sliderData,
} from '../../Redux/reducers/CvGeneratorReducer'
const Templatetwelve = () => {
  let pdfComponent = useRef()
  const cvData = useSelector(CV_DATA)
  const educationData = useSelector(Education_DATA)
  const experianceData = useSelector(Experiance_Data)
  const progressData = useSelector(propertiesData)
  const courses = useSelector(coursesData)
  // const profileData = useSelector(profileRichTextData);
  let [editorState] = useOutletContext()
  let printButtonRef = useRef()
  let [displayTemplate, setDisplayTemplate] = useOutletContext()
  const languages = useSelector(languageData)
  const references = useSelector(referenceData)
  const hobbies = useSelector(getHobbies)
  const internships = useSelector(getInternships)
  const enabledAccordians = useSelector(getAdditionalAccordian)
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
        display: displayTemplate === true ? 'none' : 'flex',

        width: '95%',
        alignItems: 'center',
        overflowWrap: 'break-word',
        flexDirection: 'column',
        marginTop: '10px',
      }}
    >
      <div
        ref={(el) => (pdfComponent = el)}
        style={{
          width: '100%',
          margin: '0px',
          padding: '0px',
        }}
        className='templatetwelve-container'
      >
        <div className='templatetwelve-container-leftside'>
          <div class='arrow-right'></div>
          <div className='templatetwelve-container-leftside-profile'>
            <img src={cvData?.profileImage} alt='img' />
            <h2 style={{ fontSize: '18px', letterSpacing: '2px' }}>
              {cvData?.firstName}
            </h2>
            <h1 style={{ fontSize: '24px', letterSpacing: '2px' }}>
              {cvData?.lastName}
            </h1>
          </div>
          <div
            style={{
              border: '2px solid white',
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'center',
              margin: '10px ',
            }}
          >
            <h3 className='boxed-title' style={{ color: 'white' }}>
              {cvData?.jobTitle}
            </h3>
          </div>
          <div className='profile-parent'>
            <div className='profile'>
              <div className='profile-bodyy'>
                <h3>Navn</h3>
                <h3>{cvData.firstName + ' ' + cvData?.lastName}</h3>
              </div>
              {cvData?.DOB === '' ? null : (
                <div className='profile-bodyy'>
                  <h3>Fødselsdato</h3> <h3>{cvData.DOB}</h3>
                </div>
              )}
              {cvData?.physicalAddress === '' ? null : (
                <div className='profile-bodyy'>
                  <h3>Adresse</h3> <h3>{cvData?.physicalAddress}</h3>
                </div>
              )}
              {cvData?.zipCode === '' ? null : (
                <div className='profile-bodyy'>
                  <h3>Postnummer</h3> <h3>{cvData?.zipCode}</h3>
                </div>
              )}
            </div>
            <div className='profile'>
              <h2>KONTAKT</h2>
              <div className='profile-bodyy'>
                <h3>E-post</h3> <h3>{cvData?.email}</h3>
              </div>
              <div className='profile-bodyy'>
                <h3>Telefonnummer</h3> <h3>{cvData?.phone}</h3>
              </div>
              <div className='profile-bodyy'>
                <h3>Land</h3> <h3>{cvData.country}</h3>
              </div>
              <div className='profile-bodyy'>
                <h3>Postnummer</h3> <h3>{cvData.zipCode}</h3>
              </div>
              {cvData?.drivingLicense === '' ? null : (
                <div className='profile-bodyy'>
                  <h3>Førekort</h3> <h3>{cvData.zipCode}</h3>
                </div>
              )}
            </div>
            <div>
              <h4 className='heading-style'>SPRÅK</h4>
              <div className='profile-left-below'>
                {languages.map((item, index) => {
                  return <p key={index}>{item.name}</p>
                })}
              </div>
            </div>
            {enabledAccordians.Kurs === true ? (
              <div>
                <h4 className='heading-style'>Kurs</h4>
                <div className='profile-left-below'>
                  {courses.map((item, index) => {
                    return <p key={index}>{item.name}</p>
                  })}
                </div>
              </div>
            ) : null}
            {enabledAccordians.Referanser === true ? (
              <div>
                <h4 className='heading-style'>Referanse</h4>
                {references.map((item, index) => {
                  return (
                    <p className='profile-left-below' key={index}>
                      {item.name}--{item?.email}--{item?.companyName}
                    </p>
                  )
                })}
              </div>
            ) : null}
            {enabledAccordians.Hobbyer === true ? (
              <div>
                <h4 className='heading-style'>Hobbyer</h4>
                {hobbies.map((item, index) => {
                  return (
                    <p className='profile-left-below' key={index}>
                      {item.name}
                    </p>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className='templatetwelve-container-rightside'>
          <div className='templatetwelve-container-rightside-profilepara'>
            <Editor
              style={{ fontSize: '15px' }}
              editorState={
                Object.keys(editorState).length === 0
                  ? EditorState.createEmpty()
                  : editorState
              }
            ></Editor>
          </div>
          <div className='templatetwelve-container-rightside-workexp'>
            <h3>Arbeioshisiorikk</h3>
            <div className='templatetwelve-container-rightside-workexp-linebr'></div>
          </div>
          <div className='bullet-container'>
            <div class='work-exp'>
              {experianceData.map((item, index) => (
                <div class='single-yr-work'>
                  <div class='year'>
                    <h5>
                      {item?.startDate} - {item?.endDate}
                    </h5>
                  </div>
                  <div class='yr-exp-divider'>
                    <div class='dot-line'>
                      <div class='dot'></div>
                      <div class='line-ver'></div>
                    </div>
                  </div>
                  <div class='work-exp-details'>
                    <h4>
                      {item?.employer} , {item?.location}
                    </h4>
                    <h5> {item?.jobTitle}</h5>
                    <p>- {item?.additionalInformation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='templatetwelve-container-rightside-workexp'>
            <h3>Utdannelse</h3>
            <div className='templatetwelve-container-rightside-workexp-linebr'></div>
          </div>
          <div className='bullet-container'>
            <div class='work-exp'>
              {educationData.map((item, index) => (
                <div class='single-yr-work'>
                  <div class='year'>
                    <h5>
                      {item?.startDate}
                      {' - '} {item?.endDate}
                    </h5>
                  </div>
                  <div class='yr-exp-divider'>
                    <div class='dot-line'>
                      <div class='dot'></div>
                      <div class='line-ver'></div>
                    </div>
                  </div>
                  <div class='work-exp-details'>
                    <h4> {item?.study}-</h4>
                    <h5>- {item?.school + ' , ' + item?.location}</h5>
                    <p>{item?.additionalInformation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {enabledAccordians.Praksisplasser === true ? (
            <>
              <div className='templatetwelve-container-rightside-workexp'>
                <h3>Praksisplasser</h3>
                <div className='templatetwelve-container-rightside-workexp-linebr'></div>
              </div>
              <div className='bullet-container'>
                <div class='work-exp'>
                  {internships.map((item, index) => (
                    <div class='single-yr-work'>
                      <div class='year'>
                        <h5>
                          {item?.startDate} - {item?.endDate}
                        </h5>
                      </div>
                      <div class='yr-exp-divider'>
                        <div class='dot-line'>
                          <div class='dot'></div>
                          <div class='line-ver'></div>
                        </div>
                      </div>
                      <div class='work-exp-details'>
                        <h4>
                          {item?.employer} , {item?.location}
                        </h4>
                        <h5> {item?.jobTitle}</h5>
                        <p>- {item?.additionalInformation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          <div className='templatetwelve-container-rightside-refrence'>
            <div className='templatetwelve-container-rightside-workexp'>
              <h3>FERDIGHETER</h3>
              <div className='templatetwelve-container-rightside-workexp-linebr'></div>
            </div>
            <div className='progress-head'>
              {progressData.map((item, index) => (
                <div
                  key={index}
                  className='templatetwelve-container-rightside-refrence-head2'
                >
                  <div className='loader'>
                    <h1>{item?.name}</h1>
                    <ProgressBar
                      wrapperColor={'#D3D3D3'}
                      backgroundcolor={'#87CEEB'}
                      percentage={item?.value}
                      borderradius={'10px'}
                    ></ProgressBar>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {enabledAccordians.Hobbyer === true ? (
            <>
              <div className='templatetwelve-container-rightside-refrence'>
                <div className='templatetwelve-container-rightside-workexp'>
                  <h3>HOBBYER OG INTERESSER</h3>
                  <div className='templatetwelve-container-rightside-workexp-linebr1'></div>
                </div>
                <div className='templatetwelve-container-rightside-refrence-head'>
                  <div
                    className='icon-section'
                    style={{
                      display: 'flex',
                      gap: '20px',
                      width: '100%',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    {hobbies.map((item, index) => {
                      return (
                        <div className='icons'>
                          <MdLocalActivity />
                          <p style={{ fontSize: '8px', fontWeight: 'bold' }}>
                            {item.name}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
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
          onAfterPrint={() => setDisplayTemplate(false)}
        />
      </div>
    </div>
  )
}
export default Templatetwelve
