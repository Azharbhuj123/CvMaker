import * as actionTypes from '../types/CvGeneratorTypes'
const initialState = {
  config: {
    footerEnabler: true,
  },
  cvData: {
    firstName: 'Fornavn',
    lastName: 'Etternavn',
    email: '',
    jobTitle: '',
    physicalAddress: '',
    country: '',
    zipCode: '',
    phone: '+090078601',
    drivingLicense: '',
    profileImage: '',
    DOB: '2022 01 01',
    twitter: 'www.twitter.com/',
    linkedin: 'www.linkedin.com/',
    github: 'www.github.com/',
    stackOverflow: 'www.stackoverflow.com/',
    website: 'www.link-to-your-portfolio.com/',
    saveAs: 'Skriv inn CV-navn',
    lastModified: '2022 01 01',
    cvScreenShot: 'my inital state',
    displayProgressBar: false,
    telephone: 'Telefon:',
  },
  newCvData: {
    firstName: 'Fornavn',
    lastName: 'Etternavn',
    email: '',
    jobTitle: '',
    physicalAddress: '',
    country: '',
    zipCode: '',
    phone: '+090078601',
    drivingLicense: '',
    profileImage: '',
    DOB: '2022 01 01',
    twitter: 'www.twitter.com/',
    linkedin: 'www.linkedin.com/',
    github: 'www.github.com/',
    stackOverflow: 'www.stackoverflow.com/',
    website: 'www.link-to-your-portfolio.com/',
    saveAs: 'Skriv inn CV-navn',
    lastModified: '2022 01 01',
    cvScreenShot: 'my inital state',
    displayProgressBar: false,
    telephone: 'Telefon:',
  },
  saveData: '',
  
  newSaveData: '',
  education: [
    // {
    //   school: "",
    //   study: "",
    //   location: "",
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   additionalInformation: "",
    //   enableAccordian: true,
    // },
  ],
  newEducation: [],
  experiance: [
    // {
    //   jobTitle: "",
    //   employer: "",
    //   location: "",
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   additionalInformation: "",
    //   enableAccordian: true,
    // },
  ],
  newExperiance: [],
  sliderData: [{ name: '', value: 50, enableAccordian: true }],
  language: [{ name: '', value: '', enableAccordian: true }],
  newLanguage: [{ name: '', value: '', enableAccordian: true }],
  properties: [{ name: '', value: 50, enableAccordian: true }],
  newProperties: [{ name: '', value: 50, enableAccordian: true }],
  courses: [
    // { name: "", startDate: "", endDate: "", enableAccordian: true },
  ],
  newCourses: [
    // { name: "", startDate: "", endDate: "", enableAccordian: true },
  ],
  references: [{ name: '', companyName: '', email: '', enableAccordian: true }],
  newReferences: [
    { name: '', companyName: '', email: '', enableAccordian: true },
  ],
  additionalAccordian: {
    Kurs: false,
    Praksisplasser: false,
    Hobbyer: false,
    Referanser: false,
  },
  internships: [
    // {
    //   jobTitle: "",
    //   companyName: "",
    //   location: "",
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   additionalInformation: "",
    //   enableAccordian: true,
    // },
  ],
  newInternship: [],
  hobbies: [{ name: '', value: 50, enableAccordian: true }],
  newHobbies: [{ name: '', value: 50, enableAccordian: true }],
  refrenceToggle: false,
  newRefrenceToggle: false,
  datePresent: false,
}

export const CV_DATA = (state) => state.CvGeneratorReducer.cvData
export const New_CV_DATA = (state) => state.CvGeneratorReducer.newCvData
export const Education_DATA = (state) => state.CvGeneratorReducer.education
export const New_Education_Data = (state) =>
  state.CvGeneratorReducer.newEducation
export const Experiance_Data = (state) => state.CvGeneratorReducer.experiance
export const New_Experiance_Data = (state) =>
  state.CvGeneratorReducer.newExperiance
export const sliderData = (state) => state.CvGeneratorReducer.sliderData
export const languageData = (state) => state.CvGeneratorReducer.language
export const newLanguageData = (state) => state.CvGeneratorReducer.newLanguage
export const propertiesData = (state) => state.CvGeneratorReducer.properties
export const newPropertiesData = (state) =>
  state.CvGeneratorReducer.newProperties
export const coursesData = (state) => state.CvGeneratorReducer.courses
export const NewCoursesData = (state) => state.CvGeneratorReducer.newCourses
export const profileRichTextData = (state) => state.CvGeneratorReducer.saveData
export const newProfileRichTextData = (state) => state.CvGeneratorReducer.newSaveData
export const referenceData = (state) => state.CvGeneratorReducer.references
export const newReferenceData = (state) =>
  state.CvGeneratorReducer.newReferences
export const configData = (state) => state.CvGeneratorReducer.config
export const getAdditionalAccordian = (state) =>
  state.CvGeneratorReducer.additionalAccordian
export const getInternships = (state) => state.CvGeneratorReducer.internships
export const getNewInternships = (state) =>
  state.CvGeneratorReducer.newInternship
export const getHobbies = (state) => state.CvGeneratorReducer.hobbies
export const getNewHobbies = (state) => state.CvGeneratorReducer.newHobbies
export const getRefToggle = (state) => state.CvGeneratorReducer.refrenceToggle
export const getNewRefToggle = (state) =>
  state.CvGeneratorReducer.newRefrenceToggle
export const getPresentDate = (state) => state.CvGeneratorReducer.datePresent

export default function CvGeneratorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CVGENERATORDATA:
      action.payload.lastModified = new Date()
      return {
        ...state,
        cvData: action.payload,
      }
      // NEW CVGENERATOR REDUCER
      case actionTypes.CVNEWGENERATORDATA:
        action.payload.lastModified = new Date()
        return {
          ...state,
          newCvData: action.payload,
        }
    case actionTypes.ADDEDUCATION:
      return {
        ...state,
        education: [...state.education, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITEDUCATION:
      return {
        ...state,
        education: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.REMOVEEDUCATION:
      return {
        ...state,
        education: state.education.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }

    // NEW EDUCATION REDUCERS ADDED
    case actionTypes.ADDNEWEDUCATION:
      return {
        ...state,
        newEducation: [...state.newEducation, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }

    case actionTypes.EDITNEWEDUCATION:
      return {
        ...state,
        newEducation: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }

    case actionTypes.REMOVENEWEDUCATION:
      return {
        ...state,
        newEducation: state.newEducation.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }

    case actionTypes.UPDATENEWEDUCATIONTOGGLE:
      return {
        ...state,
        newEducation: state.newEducation.map((item, index) =>
          index === action.payload.accordianIndex
            ? { ...item, toggle: action.payload.nextChecked }
            : item
        ),
      }

    //

    case actionTypes.ADDWORKEXPERIANCE:
      return {
        ...state,
        experiance: [...state.experiance, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITWORKEXPERIANCE:
      return {
        ...state,
        experiance: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.REMOVEWORKEXPERIANCE:
      return {
        ...state,
        experiance: state.experiance.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.UPDATEEXPERIENCETOGGLE:
      return {
        ...state,
        experiance: state.experiance.map((item, index) =>
          index === action.payload.accordianIndex
            ? { ...item, toggle: action.payload.nextChecked }
            : item
        ),
      }

    // NEW EXPERIENCE REDUCERS ADDED
    case actionTypes.ADDNEWWORKEXPERIANCE:
      return {
        ...state,
        newExperiance: [...state.newExperiance, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITNEWWORKEXPERIANCE:
      return {
        ...state,
        newExperiance: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.REMOVENEWWORKEXPERIANCE:
      return {
        ...state,
        newExperiance: state.newExperiance.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.UPDATENEWEXPERIENCETOGGLE:
      return {
        ...state,
        newExperiance: state.newExperiance.map((item, index) =>
          index === action.payload.accordianIndex
            ? { ...item, toggle: action.payload.nextChecked }
            : item
        ),
      }
    //

    case actionTypes.ADDSLIDER:
      return {
        ...state,
        sliderData: [...state.sliderData, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.DELETESLIDER:
      return {
        ...state,
        sliderData: state.sliderData.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITSLIDER:
      return {
        ...state,
        sliderData: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.ADDLANGUAGE:
      return {
        ...state,
        language: [...state.language, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITLANGUAGE:
      return {
        ...state,
        language: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case action.DELETELANGUAGE:
      return {
        ...state,
        language: state.language.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }

    // NEW language REDUCERS ADDED
    case actionTypes.ADDNEWLANGUAGE:
      return {
        ...state,
        newLanguage: [...state.newLanguage, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITNEWLANGUAGE:
      return {
        ...state,
        newLanguage: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case action.DELETENEWLANGUAGE:
      return {
        ...state,
        newLanguage: state.newLanguage.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    //
    case actionTypes.ADDPROPERTY:
      return {
        ...state,
        properties: [...state.properties, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITPROPERTY:
      return {
        ...state,
        properties: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    // NEW PROPERTY REDUCERS ADDED
    case actionTypes.ADDNEWPROPERTY:
      return {
        ...state,
        newProperties: [...state.newProperties, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITNEWPROPERTY:
      return {
        ...state,
        newProperties: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    //
    case actionTypes.ADDCOURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITCOURSE:
      return {
        ...state,
        courses: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }

    // NEW Courses REDUCERS ADDED
    case actionTypes.ADDNEWCOURSE:
      return {
        ...state,
        newCourses: [...state.newCourses, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITNEWCOURSE:
      return {
        ...state,
        newCourses: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.SAVEDATA:
      return {
        ...state,
        saveData: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
       // NEW PROFILE REDUCERS ADDED
    case actionTypes.NEWSAVEDATA:
      return {
        ...state,
        newSaveData: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.ADDREFERENCE:
      return {
        ...state,
        references: [...state.references, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITREFERENCE:
      return {
        ...state,
        references: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.REFTOGGLE:
      return {
        ...state,
        refrenceToggle: action.payload,
      }
    // NEW REFERENCE REDUCERS ADDED
    case actionTypes.ADDNEWREFERENCE:
      return {
        ...state,
        newReferences: [...state.newReferences, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITNEWREFERENCE:
      return {
        ...state,
        newReferences: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.REFNEWTOGGLE:
      return {
        ...state,
        newRefrenceToggle: action.payload,
      }
    //
    case actionTypes.EDITCONFIG:
      return {
        ...state,
        config: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITADDITIONALACCORDIAN:
      return {
        ...state,
        additionalAccordian: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.EDITHOBBIES:
      return {
        ...state,
        hobbies: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.DELETEHOBBY:
      return {
        ...state,
        hobbies: state.hobbies.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.ADDHOBBY:
      return {
        ...state,
        hobbies: [...state.hobbies, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    // NEW HOBBIES REDUCERS ADDED
    case actionTypes.EDITNEWHOBBIES:
      return {
        ...state,
        newHobbies: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.DELETENEWHOBBY:
      return {
        ...state,
        newHobbies: state.newHobbies.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.ADDNEWHOBBY:
      return {
        ...state,
        newHobbies: [...state.newHobbies, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    //
    case actionTypes.EDITINTERNSHIPS:
      return {
        ...state,
        internships: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.DELETEINTERNSHIP:
      return {
        ...state,
        internships: state.internships.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.ADDINTERNSHIP:
      return {
        ...state,
        internships: [...state.internships, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }

    case actionTypes.UPDATEINTERNSHIPTOGGLE:
      return {
        ...state,
        internships: state.internships.map((item, index) =>
          index === action.payload.accordianIndex
            ? { ...item, toggle: action.payload.nextChecked }
            : item
        ),
      }

    // NEW INTERNSHIP REDUCERS ADDED
    case actionTypes.EDITNEWINTERNSHIPS:
      return {
        ...state,
        newInternship: action.payload,
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.DELETENEWINTERNSHIP:
      return {
        ...state,
        newInternship: state.newInternship.filter(
          (item, index) => index !== action.payload
        ),
        cvData: { ...state.cvData, lastModified: new Date() },
      }
    case actionTypes.ADDNEWINTERNSHIP:
      return {
        ...state,
        newInternship: [...state.newInternship, action.payload],
        cvData: { ...state.cvData, lastModified: new Date() },
      }

    case actionTypes.UPDATENEWINTERNSHIPTOGGLE:
      return {
        ...state,
        newInternship: state.newInternship.map((item, index) =>
          index === action.payload.accordianIndex
            ? { ...item, toggle: action.payload.nextChecked }
            : item
        ),
      }
    //

    case actionTypes.DATEPRESENT:
      return {
        ...state,
        datePresent: action.payload,
      }

    default:
      return state
  }
}
