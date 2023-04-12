import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { addEducationData } from "../../Redux/actions/CvGeneratorAction";
import { Education_DATA } from "../../Redux/reducers/CvGeneratorReducer";

const QuillTextEditor4 = (props) => {
  const dispatch = useDispatch();
  const educationData = useSelector(Education_DATA);
  const [value, setValue] = useState("");

  const onChange = (value) => {
    console.log(educationData, "<===== data");
    dispatch(addEducationData(value));
  };
  return <ReactQuill {...props} theme="snow" value={educationData} onChange={onChange} />;
};

export default QuillTextEditor4;
