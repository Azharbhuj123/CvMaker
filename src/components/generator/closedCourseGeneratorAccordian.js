import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { NewCoursesData, coursesData, languageData } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  deleteLanguage,
  deleteSlider,
  editCourse,
  editLanguage,
  editNewCourse,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import moment from "moment";

const CourseClosedGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const courses = useSelector(coursesData);
  const newCourses = useSelector(NewCoursesData);
  const handleChange = (field, value) => {
    let change = newCourses.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    console.log(change, "<======");
    dispatch(editNewCourse(change));
  };
  const handleDelete = (id) => {
    let change = newCourses.filter((item, index) => {
      if (index !== accordianIndex) {
        return item;
      }
      return null;
    });
    dispatch(editNewCourse(change));
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>{newCourses[accordianIndex]?.name}</span>
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
                handleChange("enableAccordian", !newCourses[accordianIndex].enableAccordian)
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
