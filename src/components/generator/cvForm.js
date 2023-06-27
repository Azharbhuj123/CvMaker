import React, { useState, useRef } from 'react'
import { HeadInput } from './primaryInput'
import { FaCamera } from 'react-icons/fa'
import GeneratorAccordian from './generatorAccordian'
import ClosedGeneratorAccordian from './closedGeneratorAccordian'
import { useDispatch, useSelector } from 'react-redux'
import { HiPlus } from 'react-icons/hi'
import Switch from 'react-switch'
import { useLocation } from 'react-router-dom'
import {
  addCourse,
  addEducationData,
  addLanguage,
  addProperty,
  addSlider,
  cvGenerator,
  addReference,
  editAdditonalAccordian,
  addToInternship,
  addToHobby,
  refrenceToggle,
} from '../../Redux/actions/CvGeneratorAction'
import {
  coursesData,
  CV_DATA,
  Education_DATA,
  Experiance_Data,
  languageData,
  propertiesData,
  profileRichTextData,
  referenceData,
  getAdditionalAccordian,
  getInternships,
  getHobbies,
  getRefToggle,
} from '../../Redux/reducers/CvGeneratorReducer'
import AddDetails from './addDetails'
import ExperianceGeneratorAccordian from './experianceGeneratorAccordian'
import ExperianceClosedGeneratorAccordian from './experianceClosedGeneratorAccordian'
import { addWorkExperiance } from '../../Redux/actions/CvGeneratorAction'
import LanguageGeneratorAccordian from './languageGeneratorAccordian'
import LanguageClosedGeneratorAccordian from './closedLanguageGeneratorAccordian'
import CourseGeneratorAccordian from './courseGeneratorAccordian'
import moment from 'moment'
import CourseClosedGeneratorAccordian from './closedCourseGeneratorAccordian'
import PropertyGeneratorAccordian from './PropertyGeneratorAccordian'
import PropertyClosedGeneratorAccordian from './closedPropertyGeneratorAccordian'
import ReferenceGeneratorAccordian from './referenceGeneratorAccordian'
import ClosedReferenceGeneratorAccordian from './closedReferenceGeneratorAccordian'
import InternshipGeneratorAccordian from './internshipGeneratorAccordian'
import ClosedInternshipGeneratorAccordian from './closedInternshipGeneratorAccordian'
import HobbyGeneratorAccordian from './hobbyGeneratorAccordian'
import ClosedHobbyGeneratorAccordian from './closedHobbyGeneratorAccordian'
import QuillTextEditor2 from '../QuillTextEditor/QuillTextEditor2'
import { useContext } from 'react'
import { IsRenderingContext } from '../../context/IsRenderingContext'

const CvForm = (props) => {
  const dispatch = useDispatch()
  const basicInformation = useSelector(CV_DATA)
  const education = useSelector(Education_DATA)
  const [isChecked, setIsChecked] = useState(false)
  const workExperiannce = useSelector(Experiance_Data)
  const languages = useSelector(languageData)
  const courses = useSelector(coursesData)
  const properties = useSelector(propertiesData)
  const profileImageRef = useRef(null)
  const references = useSelector(referenceData)
  const [imageSwitch, setImageSwitch] = useState(false)
  const profileData = useSelector(profileRichTextData)
  const internships = useSelector(getInternships)
  const hobbies = useSelector(getHobbies)
  const additionalAccordians = useSelector(getAdditionalAccordian)
  const toggleData = useSelector(getRefToggle)
  const text = localStorage.getItem('uniqueText')
  console.log(text, 'text check')

  const location = useLocation()

  const [personalProperty, setPersonalProperty] = useState([
    'Lagspiller',
    'Løsningsorientert',
    'Inkluderende',
    'Nysgjerrig',
    'Utadvendt',
    'Kundeservice',
    'Excel',
    'Salg',
  ])

  const [skillSet, setSkillSet] = useState([
    'Kundeservice',
    'Prosjektledelse',
    'Multitasking',
    'Samarbeid',
    'Salgsstrategier',
  ])

  const [moreDetails, setMoreDetails] = useState({
    Adresse: false,
    By: false,
    PostNummer: false,
    Førerkort: false,
  })

  const addEducation = () => {
    dispatch(
      addEducationData({
        school: '',
        study: '',
        location: '',
        startDate: '',
        endDate: '',
        additionalInformation: '',
        enableAccordian: true,
        toggle: false,
      })
    )
  }
  const addExperiance = () => {
    dispatch(
      addWorkExperiance({
        jobTitle: '',
        employer: '',
        location: '',
        startDate: '',
        endDate: '',
        additionalInformation: '',
        enableAccordian: true,
        toggle: false,
      })
    )
  }
  const addInternship = () => {
    dispatch(
      addToInternship({
        jobTitle: '',
        employer: '',
        location: '',
        startDate: '',
        endDate: '',
        additionalInformation: '',
        enableAccordian: true,
        toggle: false,
      })
    )
  }

  const addHobby = () => {
    dispatch(
      addToHobby({
        name: '',
        value: 1,
        enableAccordian: true,
      })
    )
  }

  const addIntoProperty = (propertyName = null) => {
    if (propertyName) {
      let updatedpersonalProperty = personalProperty.filter(
        (i) => propertyName !== i
      )
      setPersonalProperty(updatedpersonalProperty)
    }
    dispatch(
      addProperty({
        name: propertyName ? propertyName : '',
        value: '',
        enableAccordian: true,
      })
    )
  }

  const addSkill = (item = null) => {
    dispatch(
      addSlider({
        name: item ? item : '',
        value: 1,
        enableAccordian: true,
      })
    )
    let updatedSkillSet = skillSet.filter((i) => item !== i)

    setSkillSet(updatedSkillSet)
  }
  const addIntoCourse = () => {
    dispatch(
      addCourse({
        name: '',
        startDate: moment(new Date()).format('Y'),
        endDate: moment(new Date()).format('Y'),
        enableAccordian: true,
      })
    )
  }
  const addToLanguage = () => {
    dispatch(addLanguage({ name: '', value: '', enableAccordian: true }))
  }
  const addToReference = () => {
    dispatch(
      addReference({
        name: '',
        email: '',
        companyName: '',
        enableAccordian: true,
      })
    )
  }

  const changeBasicInfo = (value, field) => {
    dispatch(cvGenerator({ ...basicInformation, [field]: value }))
  }
  const disableAccordian = (accordianName) => {
    dispatch(
      editAdditonalAccordian({
        ...additionalAccordians,
        [accordianName]: false,
      })
    )
  }

  let educationHeadings = {
    heading: '(Studie) på (Navn på skolen)',
    field1: 'Skole',
    field2: 'Studie',
    field3: 'Sted',
    field4: 'Start dato - slutt dato (Trykk på kalender)',
    field5: 'Utfyllende informasjon',
  }
  let experianceHeadings = {
    heading: '(Jobbtittel) hos (Navn på arbeidsgiver)',
    field1: 'Jobbtittel',
    field2: 'Arbeidsgiver',
    field3: 'Sted',
    field4: 'Start dato - slutt dato (Trykk på kalender)',
    field5: 'Utfyllende informasjon',
  }
  const clickToChangeProfile = () => {
    console.log('ref found')
    profileImageRef.current.click()
  }

  const handleFileChange = async (e) => {
    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    }
    const wow = await getBase64(e.target.files[0])
    setImageSwitch(true)
    console.log(wow)
    dispatch(cvGenerator({ ...basicInformation, profileImage: wow }))
  }
  const activeSkill = (skillName) => {
    console.log(skillName, '<=====')
    console.log(moreDetails, '<==============================')
    setMoreDetails({ ...moreDetails, [skillName]: true })
  }

  const buttonDesign = {
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    borderRadius: '5px',
    gap: '5px',
    background: '#F6F3F1',
    padding: '10px',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  }

  const enableAccordian = (accordianName) => {
    console.log(accordianName, '<=====')
    dispatch(
      editAdditonalAccordian({ ...additionalAccordians, [accordianName]: true })
    )
  }

  const onToggleChange = (nextChecked) => {
    dispatch(refrenceToggle(nextChecked))
  }
  const dateRef = useRef(null)

  const handleButtonClick = () => {
    dateRef.current.click()
  }
  console.log(basicInformation, '<====check personal info')

  const { isRendering, setIsRendering } = useContext(IsRenderingContext)
  return (
    <div className='cv-form'>
      <h1
        onClick={() => {
          console.log(basicInformation, '<====check personal info')
        }}
      >
        Personlig informasjon
      </h1>
      <div></div>
      <div className='cv-form-wrapper'>
        <div className='cv-form-wrapper-imgdiv'>
          {/* <span>{text? "Bilde" : "Bilde - Mal uten bilde"}</span> */}
          <span>
            {location.pathname === '/generator/mal-6'
              ? 'Bilde'
              : 'Bilde - Mal uten bilde'}
          </span>
          <input
            style={{ display: 'none' }}
            type={'file'}
            onChange={(e) => handleFileChange(e)}
            onFocus={() => setIsRendering(false)}
            ref={profileImageRef}
          ></input>
          {imageSwitch ? (
            <div
              onMouseEnter={() => setImageSwitch(false)}
              className='cv-form-wrapper-imgdiv-bg'
            >
              <img
                style={{ width: '100%', height: '100%' }}
                src={basicInformation.profileImage}
                alt='profile'
              ></img>
            </div>
          ) : (
            <div
              onMouseLeave={() => setImageSwitch(true)}
              onClick={() => clickToChangeProfile()}
              className='cv-form-wrapper-imgdiv-bg'
            >
              <FaCamera style={{ color: '#4B575F' }} size={35} />
            </div>
          )}
        </div>
        <div className='cv-form-wrapper-inputheading'>
          <HeadInput
            value={basicInformation.firstName}
            onChange={(e) => changeBasicInfo(e.target.value, 'firstName')}
            heading='Fornavn'
            inputPlaceholder='fornavn'
            onFocus={() => setIsRendering(false)}
          />
          <HeadInput
            value={basicInformation.lastName}
            onChange={(e) => {
              changeBasicInfo(e.target.value, 'lastName')
            }}
            heading='Etternavn'
            inputPlaceholder='etternavn'
            onFocus={() => setIsRendering(false)}
          />
        </div>
      </div>
      <div className='cv-form-numberpost'>
        <HeadInput
          value={basicInformation.email}
          onChange={(e) => {
            changeBasicInfo(e.target.value, 'email')
          }}
          heading='E-post'
          inputPlaceholder=''
          onFocus={() => setIsRendering(false)}
        />
        <HeadInput
          value={basicInformation.phone}
          onChange={(e) => {
            changeBasicInfo(e.target.value, 'phone')
          }}
          heading='Telefonnummer'
          inputPlaceholder=''
          onFocus={() => setIsRendering(false)}
        />
        {/* <HeadInput
 value={basicInformation.jobTitle}
 onChange={(e) => {
 changeBasicInfo(e.target.value, "jobTitle");
 }}
 heading="Jobbtittel"
 inputPlaceholder="Jobbtittel"
 /> */}
      </div>
      <div
        className='cv-form-numberpost'
        onClick={() => {
          handleButtonClick()
        }}
      >
        <div className='cv-form-dob'>
          <span>Fødselsdato (Kun om relevant til stilling)</span>
          <div
            id='date-container'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <input
              id='date-input'
              ref={dateRef}
              type='date'
              className='headinput-container date-container'
              value={basicInformation.DOB}
              onFocus={() => setIsRendering(false)}
              onChange={(date) => {
                // console.log(date.target.value, 'lll')
                changeBasicInfo(date.target.value, 'DOB')
              }}
              yearDropdownItemNumber={100}
              scrollableYearDropdown={true}
              showYearDropdown
              showMonthDropdown
              style={{ position: 'relative' }}
            />
            <img
              src={require('../../assests/icons/calendericon.png')}
              alt='Select Date'
              id='date-img'
              style={{ position: 'absolute', right: '10px', bottom: '20px' }}
            />
          </div>
        </div>
        <HeadInput
          value={basicInformation.jobTitle}
          onChange={(e) => {
            changeBasicInfo(e.target.value, 'jobTitle')
          }}
          onFocus={() => setIsRendering(false)}
          heading='Jobbtittel'
          inputPlaceholder='Jobbtittel'
        />
      </div>
      <div className='cv-form-numberpost'>
        {moreDetails.Adresse ? (
          <HeadInput
            value={basicInformation.physicalAddress}
            onChange={(e) => {
              changeBasicInfo(e.target.value, 'physicalAddress')
            }}
            heading='Adresse'
            inputPlaceholder='Adresse'
            onFocus={() => setIsRendering(false)}
          />
        ) : null}
        {moreDetails?.By ? (
          <HeadInput
            value={basicInformation.country}
            onChange={(e) => {
              changeBasicInfo(e.target.value, 'country')
            }}
            onFocus={() => setIsRendering(false)}
            heading='By'
            inputPlaceholder='By'
          />
        ) : null}
      </div>
      <div className='cv-form-numberpost'>
        {moreDetails.PostNummer ? (
          <HeadInput
            value={basicInformation.zipCode}
            onChange={(e) => {
              changeBasicInfo(e.target.value, 'zipCode')
            }}
            onFocus={() => setIsRendering(false)}
            heading='PostNummer'
            inputPlaceholder='PostNummer'
          />
        ) : null}
        {moreDetails.Førerkort ? (
          <HeadInput
            value={basicInformation.drivingLicense}
            onChange={(e) => {
              changeBasicInfo(e.target.value, 'drivingLicense')
            }}
            onFocus={() => setIsRendering(false)}
            heading='Førerkort'
            inputPlaceholder='Førerkort'
          />
        ) : null}
      </div>
      <div className='cv-form-addmoredetails'>
        {!moreDetails.Adresse &&
        !moreDetails.Land &&
        !moreDetails.PostNummer &&
        !moreDetails.Førerkort ? (
          <h2>Legg til flere detaljer</h2>
        ) : null}

        <div className='cv-form-addmoredetails-detailset'>
          {Object.keys(moreDetails).map((item, index) => {
            if (moreDetails[item] === true) {
              return null
            } else {
              return (
                <AddDetails onClick={() => activeSkill(item)} heading={item} />
              )
            }
          })}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          paddingTop: '15px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <span
          onClick={() => console.log(profileData)}
          className='profile-heading'
        >
          Profiltekst
        </span>

        <span
          style={{
            fontFamily: 'Montserrat',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Inkluder 2-4 linjer om deg selv og din arbeidserfaringer
        </span>
        {/* <Editor
 // 2nd copy
 // editorState={EditorState.createWithContent(convertFromRaw(profileData))}
 //1st copy
 editorState={
 Object.keys(editorState).length === 0 ? EditorState.createEmpty() : editorState
 }
 //3rd copy
 // editorState={
 // Object.keys(editorState).length === 0
 // ? EditorState.createEmpty()
 // : EditorState.acceptSelection(profileData, profileData.getSelection())
 // }
 ref={editorRef}
 onEditorStateChange={onEditorStateChange}
 wrapperClassName="textEditor-wrapper-class"
 editorClassName="textEditor-editor-class"
 toolbarClassName="textEditor-toolbar-class"
 toolbar={{
 options: ["inline", "blockType"],
 }}
 /> */}
        {/* <QuillTextEditor /> */}
        {/* {moreDetails.Adresse ? ( */}
        <QuillTextEditor2
          onFocus={() => setIsRendering(false)}
          // value={basicInformation.physicalAddress}
          // onChange={(e) => {
          // changeBasicInfo(e.target.value, 'physicalAddress')
          // }}
          // heading='Adresse'
          // inputPlaceholder='Adresse'
          // ) : null}
        />
      </div>

      <div className='cv-form-study'>
        <h2>Utdanning</h2>
        <span
          style={{
            fontFamily: 'Montserrat',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Her kan du legge til alt av relevant utdanning som øker sjansen for å
          bli lagt merke til
        </span>
        {education?.map((item, index) => {
          return education[index].enableAccordian ? (
            <GeneratorAccordian
              headings={educationHeadings}
              accordianIndex={index}
            />
          ) : (
            <ClosedGeneratorAccordian accordianIndex={index} />
          )
        })}

        <div onClick={() => addEducation()} style={buttonDesign}>
          <HiPlus size={25} style={{ color: '#EEB856' }} />
          <span style={{ fontFamily: 'Montserrat', fontWeight: '600' }}>
            Legg til Utdanning
          </span>
        </div>
      </div>
      <div className='cv-form-study'>
        <h2>Arbeidserfaring</h2>
        <span
          style={{
            fontFamily: 'Montserrat',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Her kan du legge til alt av relevant arbeidserfaring som øker sjansen
          for å bli lagt merke til
        </span>
        {console.log(workExperiannce, 'www')}
        {workExperiannce?.map((item, index) => {
          return workExperiannce[index].enableAccordian ? (
            <ExperianceGeneratorAccordian
              headings={experianceHeadings}
              accordianIndex={index}
            />
          ) : (
            <ExperianceClosedGeneratorAccordian accordianIndex={index} />
          )
        })}

        <div onClick={() => addExperiance()} style={buttonDesign}>
          <HiPlus size={25} style={{ color: '#EEB856' }} />
          <span style={{ fontFamily: 'Montserrat', fontWeight: '600' }}>
            Legg til Arbeidserfaring
          </span>
        </div>
      </div>
      <div className='cv-form-study'>
        <h2>Ferdigheter</h2>
        <div style={{ paddingTop: '8px' }} className='swtichbtnwithpara'>
          <Switch
            checked={basicInformation.displayProgressBar}
            onColor='#EEB856'
            onChange={() =>
              changeBasicInfo(
                !basicInformation.displayProgressBar,
                'displayProgressBar'
              )
            }
          />
          <p>Vis ferdighetsgrad (anbefales av) </p>
        </div>
        {properties?.map((item, index) => {
          return properties[index].enableAccordian ? (
            <PropertyGeneratorAccordian accordianIndex={index} />
          ) : (
            <PropertyClosedGeneratorAccordian accordianIndex={index} />
          )
        })}
      </div>
      <div className='cv-form-addmoredetails'>
        <h2>Legg til alt av ferdigheter som som er relevant for stillingen</h2>
        <div className='cv-form-addmoredetails-detailset'>
          {personalProperty.map((item, index) => {
            if (moreDetails[item] === true) {
              return null
            } else {
              return (
                <AddDetails
                  key={index}
                  onClick={() => addIntoProperty(item)}
                  heading={item}
                />
              )
            }
          })}
        </div>
      </div>
      <div onClick={() => addIntoProperty()} style={buttonDesign}>
        <HiPlus size={25} style={{ color: '#EEB856' }} />
        Leg til ferdigheter
      </div>
      {/* <div className="cv-form-study">
 <h2>ferdigheter</h2>
 {sliders.map((item, accordianIndex) => {
 return sliders[accordianIndex]?.enableAccordian ? (
 <SkillGeneratorAccordian accordianIndex={accordianIndex} />
 ) : (
 <SkillClosedGeneratorAccordian accordianIndex={accordianIndex} />
 );
 })}
 <div style={buttonDesign} onClick={() => addSkill()}>
 <HiPlus size={25} style={{ color: "#EEB856" }} />
 legge til ferdigheter
 </div>
 </div> */}
      <div className='cv-form-study'>
        <h2>Språk</h2>
        {languages?.map((item, accordianIndex) => {
          return languages[accordianIndex]?.enableAccordian ? (
            <LanguageGeneratorAccordian accordianIndex={accordianIndex} />
          ) : (
            <LanguageClosedGeneratorAccordian accordianIndex={accordianIndex} />
          )
        })}

        <button style={buttonDesign} onClick={() => addToLanguage()}>
          <HiPlus size={25} style={{ color: '#EEB856' }} />
          Legg til språk
        </button>
      </div>

      {additionalAccordians['Referanser'] === true ? (
        <div className='cv-form-study'>
          <div className='cv-form-study-header-container'>
            <h2>Referanser</h2>
            <button
              onClick={() => {
                disableAccordian('Referanser')
              }}
            >
              Slett
            </button>
          </div>
          <div className='swtichbtnwithpara'>
            <Switch
              onChange={onToggleChange}
              onColor='#EEB856'
              checked={toggleData}
              className='react-switch'
            />
            <p>Oppgis ved forespørsel</p>
          </div>

          {references?.map((item, accordianIndex) => {
            return references[accordianIndex]?.enableAccordian ? (
              <ReferenceGeneratorAccordian
                key={accordianIndex}
                accordianIndex={accordianIndex}
              />
            ) : (
              <ClosedReferenceGeneratorAccordian
                key={accordianIndex}
                accordianIndex={accordianIndex}
              />
            )
          })}

          <button
            disabled={toggleData}
            style={buttonDesign}
            onClick={() => addToReference()}
          >
            <HiPlus size={25} style={{ color: '#EEB856' }} />
            Legg til referanse
          </button>
        </div>
      ) : null}

      {additionalAccordians['Kurs'] === true ? (
        <>
          <div className='cv-form-study'>
            <div className='cv-form-study-header-container'>
              <h2>Kurs </h2>
              <button
                onClick={() => {
                  disableAccordian('Kurs')
                }}
              >
                Slett
              </button>
            </div>

            {courses?.map((item, index) => {
              return courses[index].enableAccordian ? (
                <CourseGeneratorAccordian accordianIndex={index} />
              ) : (
                <CourseClosedGeneratorAccordian accordianIndex={index} />
              )
            })}
          </div>
          <div onClick={() => addIntoCourse()} style={buttonDesign}>
            <HiPlus size={25} style={{ color: '#EEB856' }} />
            Legg til kurs
          </div>
        </>
      ) : null}
      {additionalAccordians['Praksisplasser'] === true ? (
        <div className='cv-form-study'>
          <div className='cv-form-study-header-container'>
            <h2>Praksisplasser</h2>
            <button
              onClick={() => {
                disableAccordian('Praksisplasser')
              }}
            >
              Slett
            </button>
          </div>
          {internships?.map((item, index) => {
            return internships[index].enableAccordian ? (
              <InternshipGeneratorAccordian
                headings={experianceHeadings}
                accordianIndex={index}
              />
            ) : (
              <ClosedInternshipGeneratorAccordian accordianIndex={index} />
            )
          })}

          <div onClick={() => addInternship()} style={buttonDesign}>
            <HiPlus size={25} style={{ color: '#EEB856' }} />
            <span style={{ fontFamily: 'Montserrat', fontWeight: '600' }}>
              Legg til praksisplass
            </span>
          </div>
        </div>
      ) : null}

      {additionalAccordians['Hobbyer'] === true ? (
        <div className='cv-form-study'>
          <div className='cv-form-study-header-container'>
            <h2>Hobbyer</h2>
            <button
              onClick={() => {
                disableAccordian('Hobbyer')
              }}
            >
              Slett
            </button>
          </div>
          {hobbies.map((item, accordianIndex) => {
            return hobbies[accordianIndex]?.enableAccordian ? (
              <HobbyGeneratorAccordian accordianIndex={accordianIndex} />
            ) : (
              <ClosedHobbyGeneratorAccordian accordianIndex={accordianIndex} />
            )
          })}
          <div style={buttonDesign} onClick={() => addHobby()}>
            <HiPlus size={25} style={{ color: '#EEB856' }} />
            Legg til hobby
          </div>
        </div>
      ) : null}

      <div
        className='cv-form-study'
        style={{
          display:
            additionalAccordians.Kurs &&
            additionalAccordians.Referanser &&
            additionalAccordians.Praksisplasser &&
            additionalAccordians.Hobbyer
              ? 'none'
              : 'block',
        }}
      >
        <h2 onClick={() => {}}>Har du mer du vil legge til?</h2>
        <span>Legg til flere punkter som hjelper deg med å skille det ut</span>
        <div className='cv-form-addmoredetails-detailset'>
          {Object.keys(additionalAccordians).map((item, index) => {
            if (additionalAccordians[item] === true) {
              return null
            } else {
              return (
                <AddDetails
                  onClick={() => enableAccordian(item)}
                  heading={item.replace('_', ' ')}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default CvForm
