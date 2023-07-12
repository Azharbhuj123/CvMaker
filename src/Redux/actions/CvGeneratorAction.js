import * as actionTypes from '../types/CvGeneratorTypes'

export const saveData = (payload) => {
  return {
    type: actionTypes.SAVEDATA,
    payload,
  }
}

export const cvGenerator = (payload) => {
  return {
    type: actionTypes.CVGENERATORDATA,
    payload,
  }
}
// NEW EDUCATION ACTONS ADDED
export const cvNewGenerator = (payload) => {
  return {
    type: actionTypes.CVNEWGENERATORDATA,
    payload,
  }
}
//
export const addEducationData = (payload) => {
  return {
    type: actionTypes.ADDEDUCATION,
    payload,
  }
}

export const removeEducationData = (payload) => {
  return {
    type: actionTypes.REMOVEEDUCATION,
    payload,
  }
}

export const editEducation = (payload) => {
  return {
    type: actionTypes.EDITEDUCATION,
    payload,
  }
}

// NEW EDUCATION ACTONS ADDED
export const addNewEducationData = (payload) => {
  return {
    type: actionTypes.ADDNEWEDUCATION,
    payload,
  }
}

export const removeNewEducationData = (payload) => {
  return {
    type: actionTypes.REMOVENEWEDUCATION,
    payload,
  }
}

export const editNewEducation = (payload) => {
  return {
    type: actionTypes.EDITNEWEDUCATION,
    payload,
  }
}

export const updateNewEducationToggle = (payload) => {
  return {
    type: actionTypes.UPDATENEWEDUCATIONTOGGLE,
    payload,
  }
}
//

export const addWorkExperiance = (payload) => {
  return {
    type: actionTypes.ADDWORKEXPERIANCE,
    payload,
  }
}

export const editWorkExperiance = (payload) => {
  return {
    type: actionTypes.EDITWORKEXPERIANCE,
    payload,
  }
}

export const removeWorkExperiance = (payload) => {
  return {
    type: actionTypes.REMOVEWORKEXPERIANCE,
    payload,
  }
}

// NEW EXPERIENCE ACTIONS ADDED
export const addNewWorkExperiance = (payload) => {
  return {
    type: actionTypes.ADDNEWWORKEXPERIANCE,
    payload,
  }
}

export const editNewWorkExperiance = (payload) => {
  return {
    type: actionTypes.EDITNEWWORKEXPERIANCE,
    payload,
  }
}

export const removeNewWorkExperiance = (payload) => {
  return {
    type: actionTypes.REMOVENEWWORKEXPERIANCE,
    payload,
  }
}

export const updateNewExperienceToggle = (payload) => {
  return {
    type: actionTypes.UPDATENEWEXPERIENCETOGGLE,
    payload,
  }
}
//

export const addSlider = (payload) => {
  return {
    type: actionTypes.ADDSLIDER,
    payload,
  }
}

export const editSlider = (payload) => {
  return {
    type: actionTypes.EDITSLIDER,
    payload,
  }
}
export const deleteSlider = (payload) => {
  return {
    type: actionTypes.DELETESLIDER,
    payload,
  }
}

export const addLanguage = (payload) => {
  return {
    type: actionTypes.ADDLANGUAGE,
    payload,
  }
}

export const editLanguage = (payload) => {
  return {
    type: actionTypes.EDITLANGUAGE,
    payload,
  }
}
export const deleteLanguage = (payload) => {
  return {
    type: actionTypes.DELETELANGUAGE,
    payload,
  }
}

// NEW LANGUAGE ACTIONS ADDED
export const addNewLanguage = (payload) => {
  return {
    type: actionTypes.ADDNEWLANGUAGE,
    payload,
  }
}

export const editNewLanguage = (payload) => {
  return {
    type: actionTypes.EDITNEWLANGUAGE,
    payload,
  }
}
export const deleteNewLanguage = (payload) => {
  return {
    type: actionTypes.DELETENEWLANGUAGE,
    payload,
  }
}
//
export const addProperty = (payload) => {
  return {
    type: actionTypes.ADDPROPERTY,
    payload,
  }
}

export const editProperty = (payload) => {
  return {
    type: actionTypes.EDITPROPERTY,
    payload,
  }
}
// NEW PROPERTY ACTIONS ADDED
export const addNewProperty = (payload) => {
  return {
    type: actionTypes.ADDNEWPROPERTY,
    payload,
  }
}

export const editNewProperty = (payload) => {
  return {
    type: actionTypes.EDITNEWPROPERTY,
    payload,
  }
}
//
export const addCourse = (payload) => {
  return {
    type: actionTypes.ADDCOURSE,
    payload,
  }
}

export const editCourse = (payload) => {
  return {
    type: actionTypes.EDITCOURSE,
    payload,
  }
}
// NEW LANGUAGE ACTIONS ADDED
export const addNewCourse = (payload) => {
  return {
    type: actionTypes.ADDNEWCOURSE,
    payload,
  }
}

export const editNewCourse = (payload) => {
  return {
    type: actionTypes.EDITNEWCOURSE,
    payload,
  }
}
//

export const addReference = (payload) => {
  return {
    type: actionTypes.ADDREFERENCE,
    payload,
  }
}

export const editReference = (payload) => {
  return {
    type: actionTypes.EDITREFERENCE,
    payload,
  }
}
export const refrenceToggle = (payload) => {
  console.log(payload, '-=======================refrence toggle')
  return {
    type: actionTypes.REFTOGGLE,
    payload,
  }
}
// NEW REFERNCE ACTIONS ADDED
export const addNewReference = (payload) => {
  return {
    type: actionTypes.ADDNEWREFERENCE,
    payload,
  }
}
export const editNewReference = (payload) => {
  return {
    type: actionTypes.EDITNEWREFERENCE,
    payload,
  }
}
export const refrencNewToggle = (payload) => {
  console.log(payload, '-=======================refrence toggle')
  return {
    type: actionTypes.REFNEWTOGGLE,
    payload,
  }
}
//
export const editConfig = (payload) => {
  return {
    type: actionTypes.EDITCONFIG,
    payload,
  }
}

export const editAdditonalAccordian = (payload) => {
  return {
    type: actionTypes.EDITADDITIONALACCORDIAN,
    payload,
  }
}

export const editInternship = (payload) => {
  return {
    type: actionTypes.EDITINTERNSHIPS,
    payload,
  }
}

export const editHobbies = (payload) => {
  return {
    type: actionTypes.EDITHOBBIES,
    payload,
  }
}
export const editHobby = (payload) => {
  return {
    type: actionTypes.EDITHOBBIES,
    payload,
  }
}

export const addToHobby = (payload) => {
  return {
    type: actionTypes.ADDHOBBY,
    payload,
  }
}
export const deleteHobby = (payload) => {
  return {
    type: actionTypes.DELETEHOBBY,
    payload,
  }
}
// NEW HOBBIES ACTIONS ADDED
export const editNewHobbies = (payload) => {
  return {
    type: actionTypes.EDITNEWHOBBIES,
    payload,
  }
}
export const editNewHobby = (payload) => {
  return {
    type: actionTypes.EDITNEWHOBBIES,
    payload,
  }
}

export const addNewToHobby = (payload) => {
  return {
    type: actionTypes.ADDNEWHOBBY,
    payload,
  }
}
export const deleteNewHobby = (payload) => {
  return {
    type: actionTypes.DELETENEWHOBBY,
    payload,
  }
}
//
export const removeInternship = (payload) => {
  return {
    type: actionTypes.DELETEINTERNSHIP,
    payload,
  }
}

export const addToInternship = (payload) => {
  return {
    type: actionTypes.ADDINTERNSHIP,
    payload,
  }
}

// NEW INTERNSHIP ACTIONS ADDED
export const removeNewInternship = (payload) => {
  return {
    type: actionTypes.DELETENEWINTERNSHIP,
    payload,
  }
}

export const addToNewInternship = (payload) => {
  return {
    type: actionTypes.ADDNEWINTERNSHIP,
    payload,
  }
}
export const editNewInternship = (payload) => {
  return {
    type: actionTypes.EDITNEWINTERNSHIPS,
    payload,
  }
}
export const updateNewInternshipToggle = (payload) => {
  return {
    type: actionTypes.UPDATENEWINTERNSHIPTOGGLE,
    payload,
  }
}
//

export const datePresent = (payload) => {
  return {
    type: actionTypes.DATEPRESENT,
    payload,
  }
}
export const updateEducationToggle = (payload) => {
  return {
    type: actionTypes.UPDATEEDUCATIONTOGGLE,
    payload,
  }
}
export const updateExperienceToggle = (payload) => {
  return {
    type: actionTypes.UPDATEEXPERIENCETOGGLE,
    payload,
  }
}
export const updateInternshipToggle = (payload) => {
  return {
    type: actionTypes.UPDATEINTERNSHIPTOGGLE,
    payload,
  }
}

// Cv generator action
export const saveDataAction = (payload) => {
  return async (dispatch) => {
    dispatch(saveData(payload))
  }
}
