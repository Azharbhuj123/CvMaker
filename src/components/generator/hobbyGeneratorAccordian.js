import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import arrowdown from "../../assests/images/arrowdown.png";
import { useDispatch, useSelector } from "react-redux";
import { getHobbies } from "../../Redux/reducers/CvGeneratorReducer";
import { editHobbies, editSlider } from "../../Redux/actions/CvGeneratorAction";
import { HeadInput } from "./primaryInput";

const HobbyGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const skills = useSelector(getHobbies);

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
    dispatch(editHobbies(change));
  };
  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span></span>
        <img
          src={arrowdown}
          alt="arrowdown"
          onClick={() => {
            handleChange(
              "enableAccordian",
              !skills[accordianIndex].enableAccordian
            );
          }}
        />
      </div>

      <div className="generator-accordian-textfields">
        <HeadInput
          value={skills[accordianIndex]?.name}
          onChange={(e) => handleChange("name", e.target.value)}
          heading="hobbynavn"
        />
        {/* <input
          className="generator-accordian-rangefield"
          step={10}
          type="range"
          max={100}
          min={10}
          value={skills[accordianIndex]?.value}
          onChange={(e) => handleChange("value", e.target.value)}
          accordianIndex={accordianIndex}
          // heading="ferdigheter"
        ></input> */}
      </div>
    </div>
  );
};

export default HobbyGeneratorAccordian;
