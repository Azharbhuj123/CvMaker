import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import arrowdown from "../../assests/images/arrowdown.png";
import { useDispatch, useSelector } from "react-redux";
import { coursesData, sliderData } from "../../Redux/reducers/CvGeneratorReducer";
import { editCourse } from "../../Redux/actions/CvGeneratorAction";
import { HeadInput, AltHeadInput } from "./primaryInput";
import DatePicker from "react-datepicker";
import { MdDateRange } from "react-icons/md";
import moment from "moment";

const CourseGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const courses = useSelector(coursesData);

  const handleChange = (field, value) => {
    console.log(field, value, accordianIndex);
    let change = courses.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    dispatch(editCourse(change));
  };
  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span></span>
        <img
          src={arrowdown}
          alt="arrowdown"
          onClick={() => {
            handleChange("enableAccordian", !courses[accordianIndex].enableAccordian);
          }}
        />
      </div>

      {/* <div className="generator-accordian-textfields">
        <div className="headinput-container">
          <span>Startdato</span>
          <input
            type={"month"}
            value={courses[accordianIndex]?.startDate}
            onChange={(date) => handleChange("startDate", date.target.value)}
          />
        </div>
        <div className="headinput-container">
          <span>Enddato</span>
          <input
            type={"month"}
            value={courses[accordianIndex]?.endDate}
            onChange={(date) => handleChange("endDate", date.target.value)}
          />
        </div>
      </div> */}
      <AltHeadInput
        value={courses[accordianIndex]?.name}
        onChange={(e) => handleChange("name", e.target.value)}
        heading="kursnavn"
      />
    </div>
  );
};

export default CourseGeneratorAccordian;
