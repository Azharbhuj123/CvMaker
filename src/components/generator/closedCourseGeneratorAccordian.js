import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { coursesData, languageData } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  deleteLanguage,
  deleteSlider,
  editCourse,
  editLanguage,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import moment from "moment";

const CourseClosedGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const courses = useSelector(coursesData);
  const handleChange = (field, value) => {
    let change = courses.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    console.log(change, "<======");
    dispatch(editCourse(change));
  };
  const handleDelete = (id) => {
    let change = courses.filter((item, index) => {
      if (index !== accordianIndex) {
        return item;
      }
      return null;
    });
    dispatch(editCourse(change));
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>{courses[accordianIndex]?.name}</span>
        <div>
          <Popup
            arrow={false}
            trigger={
              <div>
                <BsThreeDotsVertical />
              </div>
            }
            position="center"
          >
            <div
              onClick={() =>
                handleChange("enableAccordian", !courses[accordianIndex].enableAccordian)
              }
            >
              Rediger tekst
            </div>
            <div style={{ color: "red" }} onClick={() => handleDelete(accordianIndex)}>
              Slett
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default CourseClosedGeneratorAccordian;
