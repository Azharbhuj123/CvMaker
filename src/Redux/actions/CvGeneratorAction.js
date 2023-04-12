import * as actionTypes from "../types/CvGeneratorTypes";

export const saveData = (payload) => {
  return {
    type: actionTypes.SAVEDATA,
    payload,
  };
};

export const cvGenerator = (payload) => {
  return {
    type: actionTypes.CVGENERATORDATA,
    payload,
  };
};

export const addEducationData = (payload) => {
  return {
    type: actionTypes.ADDEDUCATION,
    payload,
  };
};

export const removeEducationData = (payload) => {
  return {
    type: actionTypes.REMOVEEDUCATION,
    payload,
  };
};

export const editEducation = (payload) => {
  return {
    type: actionTypes.EDITEDUCATION,
    payload,
  };
};

export const addWorkExperiance = (payload) => {
  return {
    type: actionTypes.ADDWORKEXPERIANCE,
    payload,
  };
};

export const editWorkExperiance = (payload) => {
  return {
    type: actionTypes.EDITWORKEXPERIANCE,
    payload,
  };
};

export const removeWorkExperiance = (payload) => {
  return {
    type: actionTypes.REMOVEWORKEXPERIANCE,
    payload,
  };
};

export const addSlider = (payload) => {
  return {
    type: actionTypes.ADDSLIDER,
    payload,
  };
};

export const editSlider = (payload) => {
  return {
    type: actionTypes.EDITSLIDER,
    payload,
  };
};
export const deleteSlider = (payload) => {
  return {
    type: actionTypes.DELETESLIDER,
    payload,
  };
};

export const addLanguage = (payload) => {
  return {
    type: actionTypes.ADDLANGUAGE,
    payload,
  };
};

export const editLanguage = (payload) => {
  return {
    type: actionTypes.EDITLANGUAGE,
    payload,
  };
};
export const deleteLanguage = (payload) => {
  return {
    type: actionTypes.DELETELANGUAGE,
    payload,
  };
};

export const addProperty = (payload) => {
  return {
    type: actionTypes.ADDPROPERTY,
    payload,
  };
};

export const editProperty = (payload) => {
  return {
    type: actionTypes.EDITPROPERTY,
    payload,
  };
};

export const addCourse = (payload) => {
  return {
    type: actionTypes.ADDCOURSE,
    payload,
  };
};

export const editCourse = (payload) => {
  return {
    type: actionTypes.EDITCOURSE,
    payload,
  };
};

export const addReference = (payload) => {
  return {
    type: actionTypes.ADDREFERENCE,
    payload,
  };
};

export const editReference = (payload) => {
  return {
    type: actionTypes.EDITREFERENCE,
    payload,
  };
};

export const editConfig = (payload) => {
  return {
    type: actionTypes.EDITCONFIG,
    payload,
  };
};

export const editAdditonalAccordian = (payload) => {
  return {
    type: actionTypes.EDITADDITIONALACCORDIAN,
    payload,
  };
};

export const editInternship = (payload) => {
  return {
    type: actionTypes.EDITINTERNSHIPS,
    payload,
  };
};

export const editHobbies = (payload) => {
  return {
    type: actionTypes.EDITHOBBIES,
    payload,
  };
};

export const removeInternship = (payload) => {
  return {
    type: actionTypes.DELETEINTERNSHIP,
    payload,
  };
};

export const addToInternship = (payload) => {
  return {
    type: actionTypes.ADDINTERNSHIP,
    payload,
  };
};

export const editHobby = (payload) => {
  return {
    type: actionTypes.EDITHOBBIES,
    payload,
  };
};

export const addToHobby = (payload) => {
  return {
    type: actionTypes.ADDHOBBY,
    payload,
  };
};

export const deleteHobby = (payload) => {
  return {
    type: actionTypes.DELETEHOBBY,
    payload,
  };
};
export const refrenceToggle = (payload) => {
  console.log(payload,"-=======================refrence toggle");
  return {
    
    type: actionTypes.REFTOGGLE,
    payload,
  };
};
export const datePresent = (payload) => {
  
  return {
    
    type: actionTypes.DATEPRESENT,
    payload,
  };
};
export const updateEducationToggle = (payload) => {
  
  return {
    
    type: actionTypes.UPDATEEDUCATIONTOGGLE,
    payload,
  };
};
export const updateExperienceToggle = (payload) => {
  
  return {
    
    type: actionTypes.UPDATEEXPERIENCETOGGLE,
    payload,
  };
};
export const updateInternshipToggle = (payload) => {
  
  return {
    
    type: actionTypes.UPDATEINTERNSHIPTOGGLE,
    payload,
  };
};

// Cv generator action

export const saveDataAction = (payload) => {
  return async (dispatch) => {
    dispatch(saveData(payload));
  };
};
