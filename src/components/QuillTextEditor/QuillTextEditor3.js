import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { addWorkExperiance } from "../../Redux/actions/CvGeneratorAction";
import { Experiance_Data } from "../../Redux/reducers/CvGeneratorReducer";

const QuillTextEditor3 = (props) => {
  const dispatch = useDispatch();
  const experienceData = useSelector(Experiance_Data);
  console.log(experienceData,"pppp")
  const [value, setValue] = useState("");

  const onChange = (value) => {
    console.log(experienceData, "<===== data");
    dispatch(addWorkExperiance(value));
  };
  return <ReactQuill {...props} theme="snow" value={experienceData} onChange={onChange} />;
};

export default QuillTextEditor3;
