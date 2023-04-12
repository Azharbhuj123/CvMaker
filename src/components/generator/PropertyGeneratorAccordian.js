import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import arrowdown from "../../assests/images/arrowdown.png";
import { useDispatch, useSelector } from "react-redux";
import { propertiesData } from "../../Redux/reducers/CvGeneratorReducer";
import { editProperty } from "../../Redux/actions/CvGeneratorAction";
import { HeadInput } from "./primaryInput";

const PropertyGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const properties = useSelector(propertiesData);

  const handleChange = (field, value) => {
    console.log(field, value, accordianIndex);
    let change = properties.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    dispatch(editProperty(change));
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
              !properties[accordianIndex].enableAccordian
            );
          }}
        />
      </div>

      <div className="generator-accordian-textfields">
        <HeadInput
          value={properties[accordianIndex]?.name}
          onChange={(e) => handleChange("name", e.target.value)}
          heading="ferdighetsnavn"
        />
        <input
          className="generator-accordian-rangefield"
          step={10}
          max={100}
          min={10}
          type="range"
          value={properties[accordianIndex]?.value}
          onChange={(e) => handleChange("value", e.target.value)}
          heading="Level"
        />
      </div>
    </div>
  );
};

export default PropertyGeneratorAccordian;
