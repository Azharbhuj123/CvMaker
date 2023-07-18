import React, { useState, useRef, useEffect } from 'react'
import { AltHeadInput, HeadInput } from './primaryInput'
import { FaCamera } from 'react-icons/fa'
import ClosedGeneratorAccordian from './closedGeneratorAccordian'
import { useDispatch, useSelector } from 'react-redux'
import { HiPlus } from 'react-icons/hi'
import Switch from 'react-switch'
import { useLocation } from 'react-router-dom'
import {
  addCourse,
  addEducationData,
  addNewEducationData,
  addLanguage,
  addProperty,
  addSlider,
  cvGenerator,
  addReference,
  editAdditonalAccordian,
  addToInternship,
  addToHobby,
  refrenceToggle,
  removeEducationData,
  editEducation,
  editNewEducation,
  updateEducationToggle,
  updateNewEducationToggle,
  updateExperienceToggle,
  editWorkExperiance,
  addNewWorkExperiance,
  editNewWorkExperiance,
  updateNEWExperienceToggle,
  updateNewExperienceToggle,
  editInternship,
  updateInternshipToggle,
  editNewInternship,
  updateNewInternshipToggle,
  addToNewInternship,
  editLanguage,
  editNewLanguage,
  addNewLanguage,
  editCourse,
  addNewCourse,
  editNewCourse,
  editHobbies,
  editNewHobbies,
  addNewToHobby,
  editReference,
  addNewReference,
  editNewReference,
  refrencNewToggle,
  editProperty,
  addNewProperty,
  editNewProperty,
  saveData,
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
  New_Education_Data,
  New_Experiance_Data,
  getNewInternships,
  newLanguageData,
  NewCoursesData,
  getNewHobbies,
  newReferenceData,
  getNewRefToggle,
  newPropertiesData,
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
import { forwardRef } from 'react'
import { BiCalendarAlt } from 'react-icons/bi'
//Udtanning  imports
import arrowdown from '../../assests/images/arrowdown.png'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import ReactQuill from 'react-quill'

const CvForm = (props) => {
  const basicInformation = useSelector(CV_DATA)
  useEffect(() => {
    setFirstName(basicInformation.firstName)
    setLastName(basicInformation.lastName)
    setEmail(basicInformation.email)
    setPhone(basicInformation.phone)
    setDOB(basicInformation.DOB)
    setJobTitle(basicInformation.jobTitle)
    setPhysicalAddress(basicInformation.physicalAddress)
    setCountry(basicInformation.country)
    setZipCode(basicInformation.zipCode)
    setDrivingLiscense(basicInformation.drivingLicense)
    setPreviewData(editorData)
  }, [])

  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('Fornavn')
  // const [profileImage, setProfileImage] = useState()
  const [lastName, setLastName] = useState('Etternavn')
  const [progressBar, setProgressBar] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('+090078601')
  const [DOB, setDOB] = useState('')
  const [physicalAddress, setPhysicalAddress] = useState('')
  const [country, setCountry] = useState('')
  const [drivingLicense, setDrivingLiscense] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [value, setValue] = useState('')
  const [toggle, setToggle] = useState('')
  const [test, setTest] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const workExperiannce = useSelector(Experiance_Data)
  const languages = useSelector(languageData)
  const courses = useSelector(coursesData)
  const properties = useSelector(propertiesData)
  const profileImageRef = useRef(null)
  const [profileImage, setProfileImage] = useState('')
  const references = useSelector(referenceData)
  const [imageSwitch, setImageSwitch] = useState(false)
  const profileData = useSelector(profileRichTextData)
  const internships = useSelector(getInternships)
  const hobbies = useSelector(getHobbies)
  const additionalAccordians = useSelector(getAdditionalAccordian)
  const toggleData = useSelector(getRefToggle)
  const text = localStorage.getItem('uniqueText')
  // Utdanning
  const [institute, setInstitute] = useState('')
  const [degree, setDegree] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [editable, setEditable] = useState(true)
  const [toggleValue, setToggleValue] = useState(false)
  const [study, setStudy] = useState('')
  const [school, setSchool] = useState('')
  const education = useSelector(Education_DATA)
  const newEducation = useSelector(New_Education_Data)
  const experiance = useSelector(Experiance_Data)

  const store = useSelector((state) => state)
  console.log(store, 'store check')

  const handleAdd = () => {
    if (newEducation.length < 3) {
      dispatch(
        addNewEducationData({
          id: Math.floor(Math.random() * 1000),
          institute: institute,
          degree: degree,
          startDate: `${moment(startDate).format('MMM YYYY')}`,
          endDate: `${moment(endDate).format('MMM YYYY')}`,
          toggle: false,
        })
      )
      setDegree('')
      setInstitute('')
      setStartDate('')
      setEndDate('')
    } else {
      console.log('Only 3 add')
    }
  }
  const addEducation = () => {
    console.log(newEducation, 'new education in the dispatch')
    dispatch(editEducation(newEducation))
  }

  const addNewEducation = () => {
    dispatch(
      addNewEducationData({
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
  console.log(addNewEducation, 'Education')
  // Utdanning End

  // Arbeidserfaring
  const newWorkExperiance = useSelector(New_Experiance_Data)
  const datepickerRef = useRef()
  const location = useLocation()

  const addExperiance = () => {
    console.log(newWorkExperiance, 'new education in the dispatch')
    dispatch(editWorkExperiance(newWorkExperiance))
  }

  const addNewExperiance = () => {
    dispatch(
      addNewWorkExperiance({
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

  // Praksisplasser
  const internship = useSelector(getInternships)
  const newInternship = useSelector(getNewInternships)

  const addInternship = () => {
    console.log(newEducation, 'new education in the dispatch')
    dispatch(editInternship(newInternship))
  }

  const addNewInternship = () => {
    dispatch(
      addToNewInternship({
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
  // Praksisplasser End

  // Språk
  const data = [
    ' Morsmål',
    ' Veldig God kunnskap',
    ' God kunnskap',
    ' Litt kunnskap',
  ]
  const newLanguages = useSelector(newLanguageData)

  const addToLanguage = () => {
    dispatch(editLanguage(newLanguages))
  }

  const addToNewLanguage = () => {
    dispatch(addNewLanguage({ name: '', value: '', enableAccordian: true }))
  }
  // End

  // Kurs
  const newCourses = useSelector(NewCoursesData)
  const addCourse = () => {
    dispatch(editCourse(newCourses))
  }
  const addToNewCourse = () => {
    dispatch(
      addNewCourse({
        name: '',
        startDate: moment(new Date()).format('Y'),
        endDate: moment(new Date()).format('Y'),
        enableAccordian: true,
      })
    )
  }
  // End

  // Hobbyer
  const skills = useSelector(getHobbies)
  const newHobbies = useSelector(getNewHobbies)

  const addHobby = () => {
    console.log(newHobbies, 'new education in the dispatch')
    dispatch(editHobbies(newHobbies))
  }

  const addNewHobby = () => {
    dispatch(
      addNewToHobby({
        name: '',
        value: 1,
        enableAccordian: true,
      })
    )
  }
  // End

  //Referanser
  const newReferences = useSelector(newReferenceData)
  const newToggleData = useSelector(getNewRefToggle)
  const addReference = () => {
    dispatch(editReference(newReferences))
  }

  const addToReference = () => {
    dispatch(
      addNewReference({
        name: '',
        email: '',
        companyName: '',
        enableAccordian: true,
      })
    )
  }
  // End

  // Ferdigheter
  const newProperties = useSelector(newPropertiesData)
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

  const addProperty = () => {
    console.log(newEducation, 'new education in the dispatch')
    dispatch(editProperty(newProperties))
  }

  const addIntoProperty = (propertyName = null) => {
    if (propertyName) {
      let updatedpersonalProperty = personalProperty.filter(
        (i) => propertyName !== i
      )
      setPersonalProperty(updatedpersonalProperty)
    }

    dispatch(
      addNewProperty({
        name: propertyName ? propertyName : '',
        value: '',
        enableAccordian: true,
      })
    )
  }
  // End

  // Profile
  const [previewData, setPreviewData] = useState('')
  const profileUpdate = () => {
    dispatch(saveData(previewData))
  }
  const editorData = useSelector(profileRichTextData)

  // const handleChange = (event) => {
  //   console.log(editorData, '<===== data')
  //   dispatch(saveData(event.target.value))
  // }

  // End

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

  // const addIntoProperty = (propertyName = null) => {
  //   if (propertyName) {
  //     let updatedpersonalProperty = personalProperty.filter(
  //       (i) => propertyName !== i
  //     )
  //     setPersonalProperty(updatedpersonalProperty)
  //   }

  //   dispatch(
  //     addProperty({
  //       name: propertyName ? propertyName : '',
  //       value: '',
  //       enableAccordian: true,
  //     })
  //   )
  // }

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

  // const addToReference = () => {
  //   dispatch(
  //     addReference({
  //       name: '',
  //       email: '',
  //       companyName: '',
  //       enableAccordian: true,
  //     })
  //   )
  // }

  const changeBasicInfo = (value, field) => {
    console.log(basicInformation, 'basic information check')
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
    setProfileImage(wow)
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

  const updateStore = async () => {
    const info = {
      startDate: startDate,
      displayProgressBar: basicInformation.displayProgressBar,
      endDate: endDate,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      DOB: DOB,
      physicalAddress: physicalAddress,
      country: country,
      zipCode: zipCode,
      drivingLicense: drivingLicense,
      jobTitle: jobTitle,
      profileImage: profileImage,
      progressBar: basicInformation.progressBar,
    }
    await dispatch(cvGenerator({ ...info }))
    console.log(updateStore, 'storeee')
  }

  const enableAccordian = (accordianName) => {
    console.log(accordianName, '<=====')
    dispatch(
      editAdditonalAccordian({ ...additionalAccordians, [accordianName]: true })
    )
  }

  const onToggleChange = (nextChecked) => {
    dispatch(refrencNewToggle(nextChecked))
  }

  const dateRef = useRef(null)

  const handleButtonClick = () => {
    dateRef.current.click()
  }
  console.log(basicInformation, '<====check personal info')

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
            onChange={(e) => {
              handleFileChange(e)
              // setProfileImage(e)
            }}
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
            value={`${firstName}`}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
            heading='Fornavn'
            inputPlaceholder='fornavn'
          />
          <HeadInput
            value={`${lastName}`}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
            heading='Etternavn'
            inputPlaceholder='etternavn'
          />
        </div>
      </div>
      <div className='cv-form-numberpost'>
        <HeadInput
          value={`${email}`}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          heading='E-post'
          inputPlaceholder=''
        />
        <HeadInput
          value={`${phone}`}
          onChange={(e) => {
            setPhone(e.target.value)
          }}
          heading='Telefonnummer'
          inputPlaceholder=''
        />
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
              value={`${DOB}`}
              onChange={(date) => {
                setDOB(date.target.value)
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
          value={jobTitle}
          onChange={(e) => {
            setJobTitle(e.target.value)
          }}
          heading='Jobbtittel'
          inputPlaceholder='Jobbtittel'
        />
      </div>
      <div className='cv-form-numberpost'>
        {moreDetails.Adresse ? (
          <HeadInput
            value={physicalAddress}
            onChange={(e) => {
              {
                setPhysicalAddress(e.target.value)
              }
            }}
            heading='Adresse'
            inputPlaceholder='Adresse'
          />
        ) : null}
        {moreDetails?.By ? (
          <HeadInput
            value={country}
            onChange={(e) => {
              {
                setCountry(e.target.value)
              }
            }}
            heading='By'
            inputPlaceholder='By'
          />
        ) : null}
      </div>
      <div className='cv-form-numberpost'>
        {moreDetails.PostNummer ? (
          <HeadInput
            value={zipCode}
            onChange={(e) => {
              {
                setZipCode(e.target.value)
              }
            }}
            heading='PostNummer'
            inputPlaceholder='PostNummer'
          />
        ) : null}
        {moreDetails.Førerkort ? (
          <HeadInput
            value={drivingLicense}
            onChange={(e) => {
              {
                // changeBasicInfo(e.target.value, 'drivingLicense')
                setDrivingLiscense(e.target.value)
              }
            }}
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
        <span className='profile-heading'>Profiltekst</span>

        <span
          style={{
            fontFamily: 'Montserrat',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Inkluder 2-4 linjer om deg selv og din arbeidserfaringer
        </span>
        <textarea
          style={{
            width: '100%',
            height: '8rem',
            borderRadius: '5px',
            border: 'none',
            padding: '20px',
            resize: 'none',
            textAlign: 'start',
            backgroundColor: '#F6F3F1',
          }}
          {...props}
          theme='snow'
          value={previewData}
          onChange={(e) => setPreviewData(e.target.value)}
          // value={editorData}
          // onChange={handleChange}
        />
        {/* <QuillTextEditor2 /> */}
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
        {console.log(education, 'education')}
        {newEducation.map((item, accordianIndex) => {
          const handleChange = (field, value) => {
            let change = newEducation.map((item, index) => {
              if (index === accordianIndex) {
                return {
                  ...item,
                  [field]: value,
                }
              }
              return item
            })
            // dispatch(editEducation(change))
            dispatch(editNewEducation(change))
          }
          const onEducationToggleChange = (nextChecked) => {
            dispatch(updateNewEducationToggle({ accordianIndex, nextChecked }))
          }

          const CustomInput = forwardRef((props, ref) => {
            return (
              <div className='custominputdiv'>
                <label onClick={props.onClick} ref={ref}>
                  {props.value || props.placeholder}
                </label>
                <div className='custominputdiv-iconsdiv'>
                  <BiCalendarAlt size={15} onClick={props.onClick} />
                </div>
              </div>
            )
          })

          let educationHeadings = {
            heading: '(Studie) på (Navn på skolen)',
            field1: 'Skole',
            field2: 'Studie',
            field3: 'Sted',
            field4: 'Start dato - slutt dato (Trykk på kalender)',
            field5: 'Utfyllende informasjon',
          }

          return newEducation[accordianIndex].enableAccordian ? (
            // <GeneratorAccordian
            //   getSchool={getSchool}
            //   getstudy={getStudy}
            //   getStartDate={getStartDate}
            //   getEndDate={getEndDate}
            //   headings={educationHeadings}
            //   accordianIndex={index}
            // />
            <div className='generator-accordian'>
              <div className='generator-accordian-heading'>
                <span>{educationHeadings.heading}</span>
                <img
                  src={arrowdown}
                  alt='arrowdown'
                  onClick={() =>
                    handleChange(
                      'enableAccordian',
                      !newEducation[accordianIndex].enableAccordian
                    )
                  }
                />
              </div>

              <div className='generator-accordian-textfields'>
                <HeadInput
                  value={newEducation[accordianIndex]?.school}
                  onChange={(e) => {
                    handleChange('school', e.target.value)
                    setSchool(e.target.value)
                  }}
                  {...educationHeadings.field1}
                  inputPlaceholder={educationHeadings.field1}
                />
                <HeadInput
                  value={newEducation[accordianIndex]?.study}
                  onChange={(e) => handleChange('study', e.target.value)}
                  index={accordianIndex}
                  {...educationHeadings.field2}
                  inputPlaceholder={educationHeadings.field2}
                />
              </div>
              <div className='generator-accordian-inputanddate'>
                <HeadInput
                  value={newEducation[accordianIndex]?.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  {...educationHeadings.field3}
                  inputPlaceholder={educationHeadings.field3}
                />
                <div className='generator-accordian-inputanddate-dateset'>
                  <span>{educationHeadings.field4}</span>
                  <div className='generator-accordian-inputanddate-dateset-datedash'>
                    {/* <input
                    type={"month"}
                    dateFormat="MM/yyyy"
                    value={education[accordianIndex]?.startDate}generator-accordian-inputanddate
                    selected={startDate}
                    placeholderText="mm/yyyy"
                    onChange={(date) => handleChange("startDate", date.target.value)}
                  /> */}
                    <div style={{ width: '100%' }}>
                      <DatePicker
                        customInput={<CustomInput />}
                        dateFormat='MM/yyyy'
                        showMonthYearPicker
                        value={newEducation[accordianIndex]?.startDate}
                        // selected={new Date(education[accordianIndex]?.startDate)}
                        onChange={(date) => {
                          handleChange(
                            'startDate',
                            moment(date).format('YYYY-MM')
                          )
                        }}
                      ></DatePicker>
                    </div>
                    <h6>-</h6>
                    {/* <input
                    type={"month"}
                    dateFormat="MM/yyyy"
                    value={education[accordianIndex]?.endDate}
                    selected={endDate}
                    placeholderText="mm/yyyy"
                    onChange={(date) => {
                      let dateM = moment().format("YYYY-MM")
                     let dateValue =  date.target.value == dateM ? "Present" : date.target.value
                      console.log(dateValue)
                      handleChange("endDate", date.target.value)}}
                  /> */}

                    <div style={{ width: '100%' }}>
                      <DatePicker
                        // selected={education[accordianIndex]?.toggle ?new Date() : new Date(education[accordianIndex]?.endDate)}
                        customInput={<CustomInput />}
                        minDate={
                          newEducation[accordianIndex]?.toggle ? new Date() : ''
                        }
                        maxDate={
                          newEducation[accordianIndex]?.toggle ? new Date() : ''
                        }
                        dateFormat='MM/yyyy'
                        showMonthYearPicker
                        value={
                          newEducation[accordianIndex]?.toggle
                            ? 'dags dato'
                            : newEducation[accordianIndex]?.endDate
                        }
                        onChange={(date) => {
                          if (newEducation[accordianIndex]?.toggle) {
                            handleChange('endDate', moment().format('YYYY-MM'))
                          } else {
                            handleChange(
                              'endDate',
                              moment(date).format('YYYY-MM')
                            )
                          }
                        }}
                      >
                        <div
                          style={{
                            padding: '5px',
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                          }}
                        >
                          <Switch
                            onChange={onEducationToggleChange}
                            onColor='#EEB856'
                            checked={newEducation[accordianIndex]?.toggle}
                            className='react-switch'
                          />
                          {console.log(
                            newEducation[accordianIndex].toggle,
                            'toggle date'
                          )}

                          <span>Nåværende</span>
                        </div>
                      </DatePicker>
                    </div>
                  </div>
                </div>
              </div>

              <div className='generator-accordian-textareainput'>
                <span>{educationHeadings.field5}</span>
                <textarea
                  value={newEducation[accordianIndex]?.additionalInformation}
                  onChange={(e) =>
                    handleChange('additionalInformation', e.target.value)
                  }
                />
                {/* <ReactQuill
                  value={newEducation[accordianIndex]?.additionalInformation}
                  onChange={(content, delta, source, editor) => {
                    handleChange('additionalInformation', editor.getHTML()) // update state variable with new content
                  }}
                /> */}
              </div>
            </div>
          ) : (
            <ClosedGeneratorAccordian accordianIndex={accordianIndex} />
          )
        })}

        <div onClick={() => addNewEducation()} style={buttonDesign}>
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
        {newWorkExperiance?.map((item, accordianIndex) => {
          const handleChange = (field, value) => {
            let change = newWorkExperiance.map((item, index) => {
              if (index === accordianIndex) {
                return {
                  ...item,
                  [field]: value,
                }
              }
              return item
            })
            dispatch(editNewWorkExperiance(change))
          }

          const onExperienceToggleChange = (nextChecked) => {
            dispatch(updateNewExperienceToggle({ accordianIndex, nextChecked }))
          }

          const CustomInput = forwardRef((props, ref) => {
            return (
              <div className='custominputdiv'>
                <label onClick={props.onClick} ref={ref}>
                  {/* {console.log(props.value?.length, 'dateee valueee')} */}
                  {props.value || props.placeholder}
                </label>

                <div className='custominputdiv-iconsdiv'>
                  <BiCalendarAlt size={15} onClick={props.onClick} />
                </div>
              </div>
            )
          })

          let experianceHeadings = {
            heading: '(Jobbtittel) hos (Navn på arbeidsgiver)',
            field1: 'Jobbtittel',
            field2: 'Arbeidsgiver',
            field3: 'Sted',
            field4: 'Start dato - slutt dato (Trykk på kalender)',
            field5: 'Utfyllende informasjon',
          }

          return newWorkExperiance[accordianIndex].enableAccordian ? (
            <div className='generator-accordian'>
              <div className='generator-accordian-heading'>
                <span>{experianceHeadings.heading}</span>
                <img
                  src={arrowdown}
                  alt='arrowdown'
                  onClick={() =>
                    handleChange(
                      'enableAccordian',
                      !newWorkExperiance[accordianIndex].enableAccordian
                    )
                  }
                />
              </div>

              <div className='generator-accordian-textfields'>
                <HeadInput
                  value={newWorkExperiance[accordianIndex]?.jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  heading={experianceHeadings.field1}
                  inputPlaceholder={experianceHeadings.field1}
                />
                <HeadInput
                  value={newWorkExperiance[accordianIndex]?.employer}
                  onChange={(e) => handleChange('employer', e.target.value)}
                  accordianIndex={accordianIndex}
                  heading={experianceHeadings.field2}
                  inputPlaceholder={experianceHeadings.field2}
                />
              </div>
              <div className='generator-accordian-inputanddate'>
                <HeadInput
                  value={newWorkExperiance[accordianIndex]?.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  heading={experianceHeadings.field3}
                  inputPlaceholder={experianceHeadings.field3}
                />
                <div className='generator-accordian-inputanddate-dateset'>
                  <span>{experianceHeadings.field4}</span>
                  <div className='generator-accordian-inputanddate-dateset-datedash'>
                    {/* <input
                    type={"month"}
                    dateFormat="MM/yyyy"
                    value={experiance[accordianIndex]?.startDate}
                    selected={startDate}
                    placeholderText="mm/yyyy"
                    onChange={(date) => {
                      console.log(
                        moment(date.target.value).format("MM/YYYY"),
                        "<=========================wowowwowoow"
                      );
                      handleChange("startDate", date.target.value);
                    }}
                  /> */}
                    <div style={{ width: '100%' }}>
                      <DatePicker
                        customInput={<CustomInput />}
                        dateFormat='MM/yyyy'
                        showMonthYearPicker
                        value={newWorkExperiance[accordianIndex]?.startDate}
                        // selected={ new Date(experiance[accordianIndex]?.startDate)}
                        onChange={(date) => {
                          handleChange(
                            'startDate',
                            moment(date).format('YYYY-MM')
                          )
                        }}
                      ></DatePicker>
                    </div>
                    <h6>-</h6>
                    {/* <input
                    type={"month"}
                    dateFormat="MM/yyyy"
                    value={experiance[accordianIndex]?.endDate}
                    selected={endDate}
                    placeholderText="mm/yyyy"
                    onChange={(date) => handleChange("endDate", date.target.value)}
                  /> */}

                    <div style={{ width: '100%' }}>
                      <DatePicker
                        ref={datepickerRef}
                        customInput={<CustomInput />}
                        minDate={
                          newWorkExperiance[accordianIndex]?.toggle
                            ? new Date()
                            : ''
                        }
                        maxDate={
                          newWorkExperiance[accordianIndex]?.toggle
                            ? new Date()
                            : ''
                        }
                        dateFormat='MM/yyyy'
                        showMonthYearPicker
                        // selected={experiance[accordianIndex]?.toggle ?new Date() : new Date(experiance[accordianIndex]?.endDate)}
                        value={
                          newWorkExperiance[accordianIndex]?.toggle
                            ? 'dags dato'
                            : newWorkExperiance[accordianIndex]?.endDate
                        }
                        onChange={(date) => {
                          if (newWorkExperiance[accordianIndex]?.toggle) {
                            handleChange('endDate', moment().format('YYYY-MM'))
                          } else {
                            handleChange(
                              'endDate',
                              moment(date).format('YYYY-MM')
                            )
                          }
                        }}
                      >
                        <div
                          style={{
                            padding: '5px',
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                          }}
                        >
                          <Switch
                            onChange={onExperienceToggleChange}
                            onColor='#EEB856'
                            checked={newWorkExperiance[accordianIndex]?.toggle}
                            className='react-switch'
                          />
                          <span>Nåværende studiested</span>
                        </div>
                      </DatePicker>
                    </div>
                  </div>
                </div>
              </div>

              <div className='generator-accordian-textareainput'>
                <span>{experianceHeadings.field5}</span>
                <textarea
                  value={
                    newWorkExperiance[accordianIndex]?.additionalInformation
                  }
                  onChange={(e) =>
                    handleChange('additionalInformation', e.target.value)
                  }
                />
                {/* <ReactQuill
                value={experiance[accordianIndex]?.additionalInformation}
                onChange={(content, delta, source, editor) => {
                  handleChange('additionalInformation', editor.getHTML()) // update state variable with new content
                }}
              /> */}
              </div>
            </div>
          ) : (
            // <ExperianceGeneratorAccordian
            //   headings={experianceHeadings}
            //   accordianIndex={index}
            // />
            <ExperianceClosedGeneratorAccordian
              accordianIndex={accordianIndex}
            />
          )
        })}

        <div onClick={() => addNewExperiance()} style={buttonDesign}>
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
            checked={
              basicInformation.displayProgressBar
              // progressBar
            }
            onColor='#EEB856'
            onChange={() => {
              changeBasicInfo(
                !basicInformation.displayProgressBar,
                'displayProgressBar'
              )
              // setProgressBar(true)
            }}
          />
          <p>Vis ferdighetsgrad (anbefales av) </p>
        </div>
        {newProperties?.map((item, accordianIndex) => {
          const handleChange = (field, value) => {
            console.log(field, value, accordianIndex)
            let change = newProperties.map((item, index) => {
              if (index === accordianIndex) {
                return {
                  ...item,
                  [field]: value,
                }
              }
              return item
            })
            dispatch(editNewProperty(change))
          }
          return newProperties[accordianIndex].enableAccordian ? (
            <div className='generator-accordian'>
              <div className='generator-accordian-heading'>
                <span></span>
                <img
                  src={arrowdown}
                  alt='arrowdown'
                  onClick={() => {
                    handleChange(
                      'enableAccordian',
                      !newProperties[accordianIndex].enableAccordian
                    )
                  }}
                />
              </div>

              <div className='generator-accordian-textfields'>
                <HeadInput
                  value={newProperties[accordianIndex]?.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  heading='ferdighetsnavn'
                />
                <input
                  className='generator-accordian-rangefield'
                  step={10}
                  max={100}
                  min={10}
                  type='range'
                  value={newProperties[accordianIndex]?.value}
                  onChange={(e) => handleChange('value', e.target.value)}
                  heading='Level'
                />
              </div>
            </div>
          ) : (
            // <PropertyGeneratorAccordian accordianIndex={index} />
            <PropertyClosedGeneratorAccordian accordianIndex={accordianIndex} />
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
      <div className='cv-form-study'>
        <h2>Språk</h2>
        {newLanguages?.map((item, accordianIndex) => {
          const handleChange = (field, value) => {
            console.log(field, '<==== field')
            console.log(value, '<==== value')
            console.log(accordianIndex, '<=== index')
            let change = newLanguages.map((item, index) => {
              if (index === accordianIndex) {
                return {
                  ...item,
                  [field]: value,
                }
              }
              return item
            })
            dispatch(editNewLanguage(change))
          }

          const selectTextSize = {
            fontWeight: 600,
            fontSize: '12px',
            color: 'grey',
            marginBottom: '5px',
          }

          return newLanguages[accordianIndex]?.enableAccordian ? (
            // <LanguageGeneratorAccordian accordianIndex={accordianIndex} />
            <div className='generator-accordian'>
              <div className='generator-accordian-heading'>
                <span></span>
                <img
                  src={arrowdown}
                  alt='arrowdown'
                  onClick={() => {
                    handleChange(
                      'enableAccordian',
                      !newLanguages[accordianIndex].enableAccordian
                    )
                  }}
                />
              </div>

              <div className='generator-accordian-textfields'>
                <HeadInput
                  value={newLanguages[accordianIndex]?.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  heading='språknavn'
                  //   inputPlaceholder={headings.field1}
                />
                {/* <input
          className="generator-accordian-rangefield"
          step={10}
          type="range"
          max={100}
          min={10}
          value={languages[accordianIndex]?.value}
          onChange={(e) => handleChange("value", e.target.value)}
          accordianIndex={accordianIndex}
          heading="ferdigheter"
        /> */}
                <div
                  className='heading-container'
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <label style={selectTextSize} for='select'>
                    nivå
                  </label>
                  <select
                    value={newLanguages[accordianIndex]?.value}
                    id='select'
                    style={{
                      height: '55px',
                      border: 'none',
                      marginTop: '3px',
                      borderRadius: '5px',
                      width: '100%',
                      backgroundColor: 'white',
                    }}
                    onChange={(e) => handleChange('value', e.target.value)}
                  >
                    <option value={''}></option>
                    {data.map((item, index) => (
                      <option key={index} value={': ' + item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <LanguageClosedGeneratorAccordian accordianIndex={accordianIndex} />
          )
        })}

        <button style={buttonDesign} onClick={() => addToNewLanguage()}>
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
              checked={newToggleData}
              className='react-switch'
            />
            <p>Oppgis ved forespørsel</p>
          </div>

          {newReferences?.map((item, accordianIndex) => {
            const handleChange = (field, value) => {
              let change = newReferences.map((item, index) => {
                if (index === accordianIndex) {
                  return {
                    ...item,
                    [field]: value,
                  }
                }
                return item
              })
              dispatch(editNewReference(change))
            }

            const handleInputChange = (e) => {
              const { value } = e.target
              const prefix = 'Telefon: '
              let emailValue
              if (value === '') {
                emailValue = null
              } else if (value.startsWith(prefix)) {
                emailValue = value
              } else {
                emailValue = prefix
              }
              handleChange('email', emailValue)
            }
            let referenceHeading = {
              heading: '',
            }
            return newReferences[accordianIndex]?.enableAccordian ? (
              <div className='generator-accordian'>
                <div className='generator-accordian-heading'>
                  <span>{referenceHeading?.heading}</span>
                  <img
                    src={arrowdown}
                    alt='arrowdown'
                    onClick={() =>
                      handleChange(
                        'enableAccordian',
                        !newReferences[accordianIndex].enableAccordian
                      )
                    }
                  />
                </div>

                <div className='generator-accordian-textfields'>
                  <HeadInput
                    value={newReferences[accordianIndex]?.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    heading={'Navn'}
                    disabled={newToggleData}
                    inputPlaceholder={!newToggleData ? 'navn' : null}
                  />
                  <HeadInput
                    value={newReferences[accordianIndex]?.companyName}
                    onChange={(e) =>
                      handleChange('companyName', e.target.value)
                    }
                    accordianIndex={accordianIndex}
                    heading={'Selskap'}
                    inputPlaceholder={!newToggleData ? 'selskap' : null}
                    disabled={newToggleData}
                  />
                </div>
                <div className='generator-accordian-inputanddate'>
                  <HeadInput
                    // value={`Telefon:${}`}
                    value={newReferences[accordianIndex]?.email}
                    // value={basicInformation.firstName}
                    onChange={handleInputChange}
                    heading={'Telefonnummer'}
                    inputPlaceholder={!newToggleData ? 'Telefon ' : null}
                    disabled={newToggleData}
                  />
                </div>
              </div>
            ) : (
              // <ReferenceGeneratorAccordian
              //   key={accordianIndex}
              //   accordianIndex={accordianIndex}
              // />
              <ClosedReferenceGeneratorAccordian
                key={accordianIndex}
                accordianIndex={accordianIndex}
              />
            )
          })}

          <button
            disabled={newToggleData}
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

            {newCourses?.map((item, accordianIndex) => {
              const handleChange = (field, value) => {
                console.log(field, value, accordianIndex)
                let change = newCourses.map((item, index) => {
                  if (index === accordianIndex) {
                    return {
                      ...item,
                      [field]: value,
                    }
                  }
                  return item
                })
                dispatch(editNewCourse(change))
              }
              return newCourses[accordianIndex].enableAccordian ? (
                <div className='generator-accordian'>
                  <div className='generator-accordian-heading'>
                    <span></span>
                    <img
                      src={arrowdown}
                      alt='arrowdown'
                      onClick={() => {
                        handleChange(
                          'enableAccordian',
                          !newCourses[accordianIndex].enableAccordian
                        )
                      }}
                    />
                  </div>
                  <AltHeadInput
                    value={newCourses[accordianIndex]?.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    heading='kursnavn'
                  />
                </div>
              ) : (
                // <CourseGeneratorAccordian accordianIndex={accordianIndex} />
                <CourseClosedGeneratorAccordian
                  accordianIndex={accordianIndex}
                />
              )
            })}
          </div>
          <div onClick={() => addToNewCourse()} style={buttonDesign}>
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
          {newInternship?.map((item, accordianIndex) => {
            const handleChange = (field, value) => {
              console.log(field, '<==== field')
              console.log(value, '<==== value')
              console.log(accordianIndex, '<=== index')
              let change = newInternship.map((item, index) => {
                if (index === accordianIndex) {
                  return {
                    ...item,
                    [field]: value,
                  }
                }
                return item
              })
              dispatch(editNewInternship(change))
            }

            const onInternshipToggleChange = (nextChecked) => {
              dispatch(
                updateNewInternshipToggle({ accordianIndex, nextChecked })
              )
            }

            const CustomInput = forwardRef((props, ref) => {
              return (
                <div className='custominputdiv'>
                  <label onClick={props.onClick} ref={ref}>
                    {props.value || props.placeholder}
                  </label>
                  <div className='custominputdiv-iconsdiv'>
                    <BiCalendarAlt size={15} onClick={props.onClick} />
                  </div>
                </div>
              )
            })

            let internshipHeadings = {
              heading: '(Jobbtittel) hos (Navn på arbeidsgiver)',
              field1: 'Jobbtittel',
              field2: 'Arbeidsgiver',
              field3: 'Sted',
              field4: 'Start dato - slutt dato (Trykk på kalender)',
              field5: 'Utfyllende informasjon',
            }

            return newInternship[accordianIndex].enableAccordian ? (
              <div className='generator-accordian'>
                <div className='generator-accordian-heading'>
                  <span>{internshipHeadings.heading}</span>
                  <img
                    src={arrowdown}
                    alt='arrowdown'
                    onClick={() =>
                      handleChange(
                        'enableAccordian',
                        !newInternship[accordianIndex].enableAccordian
                      )
                    }
                  />
                </div>

                <div className='generator-accordian-textfields'>
                  <HeadInput
                    value={newInternship[accordianIndex]?.jobTitle}
                    onChange={(e) => handleChange('jobTitle', e.target.value)}
                    heading={internshipHeadings.field1}
                    inputPlaceholder={internshipHeadings.field1}
                  />
                  <HeadInput
                    value={newInternship[accordianIndex]?.employer}
                    onChange={(e) => handleChange('employer', e.target.value)}
                    accordianIndex={accordianIndex}
                    heading={internshipHeadings.field2}
                    inputPlaceholder={internshipHeadings.field2}
                  />
                </div>
                <div className='generator-accordian-inputanddate'>
                  <HeadInput
                    value={newInternship[accordianIndex]?.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    heading={internshipHeadings.field3}
                    inputPlaceholder={internshipHeadings.field3}
                  />
                  <div className='generator-accordian-inputanddate-dateset'>
                    <span>{internshipHeadings.field4}</span>
                    <div className='generator-accordian-inputanddate-dateset-datedash'>
                      {/* <input
                      type={"date"}
                      dateFormat="MM/yyyy"
                      value={experiance[accordianIndex]?.startDate}
                      placeholderText="mm/yyyy"
                      onChange={(date) => {
                        console.log(
                          moment(date.target.value).format("MM/YYYY"),
                          "<=========================wowowwowoow"
                        );
                        handleChange("startDate", date.target.value);
                      }}
                    /> */}

                      <div style={{ width: '100%' }}>
                        <DatePicker
                          customInput={<CustomInput />}
                          dateFormat='MM/yyyy'
                          showMonthYearPicker
                          value={newInternship[accordianIndex]?.startDate}
                          // selected={ new Date(experiance[accordianIndex]?.startDate)}
                          onChange={(date) => {
                            handleChange(
                              'startDate',
                              moment(date).format('YYYY-MM')
                            )
                          }}
                        ></DatePicker>
                      </div>
                      <h6>-</h6>
                      {/* <input
                      type={"date"}
                      dateFormat="MM/yyyy"
                      value={experiance[accordianIndex]?.endDate}
                      placeholderText="mm/yyyy"
                      onChange={(date) => handleChange("endDate", date.target.value)}
                    /> */}

                      <div style={{ width: '100%' }}>
                        <DatePicker
                          //  selected={experiance[accordianIndex]?.toggle ?new Date() : new Date(experiance[accordianIndex]?.endDate)}
                          customInput={<CustomInput />}
                          minDate={
                            newInternship[accordianIndex]?.toggle
                              ? new Date()
                              : ''
                          }
                          maxDate={
                            newInternship[accordianIndex]?.toggle
                              ? new Date()
                              : ''
                          }
                          dateFormat='MM/yyyy'
                          showMonthYearPicker
                          value={
                            newInternship[accordianIndex]?.toggle
                              ? 'dags dato'
                              : newInternship[accordianIndex]?.endDate
                          }
                          onChange={(date) => {
                            if (newInternship[accordianIndex]?.toggle) {
                              handleChange(
                                'endDate',
                                moment().format('YYYY-MM')
                              )
                            } else {
                              handleChange(
                                'endDate',
                                moment(date).format('YYYY-MM')
                              )
                            }
                          }}
                        >
                          <div
                            style={{
                              padding: '5px',
                              display: 'flex',
                              gap: '5px',
                              alignItems: 'center',
                            }}
                          >
                            <Switch
                              onChange={onInternshipToggleChange}
                              onColor='#EEB856'
                              checked={newInternship[accordianIndex]?.toggle}
                              className='react-switch'
                            />

                            <span>Nåværende</span>
                          </div>
                        </DatePicker>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='generator-accordian-textareainput'>
                  <span>{internshipHeadings.field5}</span>
                  <textarea
                    value={newInternship[accordianIndex]?.additionalInformation}
                    onChange={(e) =>
                      handleChange('additionalInformation', e.target.value)
                    }
                  />
                  {/* <ReactQuill
                  value={experiance[accordianIndex]?.additionalInformation}
                  onChange={(content, delta, source, editor) => {
                    handleChange('additionalInformation', editor.getHTML()) // update state variable with new content
                  }}
                /> */}
                  {/* <QuillTextEditor4/> */}
                </div>
              </div>
            ) : (
              // <InternshipGeneratorAccordian
              //   headings={experianceHeadings}
              //   accordianIndex={accordianIndex}
              // />
              <ClosedInternshipGeneratorAccordian
                accordianIndex={accordianIndex}
              />
            )
          })}

          <div onClick={() => addNewInternship()} style={buttonDesign}>
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

          {newHobbies.map((item, accordianIndex) => {
            const handleChange = (field, value) => {
              let change = newHobbies.map((item, index) => {
                if (index === accordianIndex) {
                  return {
                    ...item,
                    [field]: value,
                  }
                }
                return item
              })
              dispatch(editNewHobbies(change))
            }
            return newHobbies[accordianIndex]?.enableAccordian ? (
              <div className='generator-accordian'>
                <div className='generator-accordian-heading'>
                  <span></span>
                  <img
                    src={arrowdown}
                    alt='arrowdown'
                    onClick={() => {
                      handleChange(
                        'enableAccordian',
                        !newHobbies[accordianIndex].enableAccordian
                      )
                    }}
                  />
                </div>

                <div className='generator-accordian-textfields'>
                  <HeadInput
                    value={newHobbies[accordianIndex]?.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    heading='hobbynavn'
                  />
                </div>
              </div>
            ) : (
              // <HobbyGeneratorAccordian accordianIndex={accordianIndex} />
              <ClosedHobbyGeneratorAccordian accordianIndex={accordianIndex} />
            )
          })}
          <div style={buttonDesign} onClick={() => addNewHobby()}>
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
      <div className='preview-button'>
        <button
          onClick={() => {
            updateStore()
            addEducation()
            addExperiance()
            addInternship()
            addToLanguage()
            addCourse()
            addHobby()
            addReference()
            addProperty()
            profileUpdate()
          }}
        >
          Oppdater Tekst
        </button>
      </div>
    </div>
  )
}

export default CvForm
