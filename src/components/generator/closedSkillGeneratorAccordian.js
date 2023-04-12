import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import arrowdown from "../../assests/images/arrowdown.png";
import PrimaryInput, { HeadInput } from "./primaryInput";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Experiance_Data, sliderData } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  deleteSlider,
  editSlider,
  editWorkExperiance,
  removeWorkExperiance,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const SkillClosedGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const skills = useSelector(sliderData);
  const handleChange = (field, value) => {
    let change = skills.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    dispatch(editSlider(change));
  };
  const handleDelete = (id) => {
    dispatch(deleteSlider(id));
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>
          {skills[accordianIndex]?.name + " på " + skills[accordianIndex]?.value + "%"}
        </span>
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
                handleChange("enableAccordian", !skills[accordianIndex].enableAccordian)
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

export default SkillClosedGeneratorAccordian;
