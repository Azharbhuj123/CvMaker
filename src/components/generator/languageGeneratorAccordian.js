import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import arrowdown from "../../assests/images/arrowdown.png";
import { useDispatch, useSelector } from "react-redux";
import { languageData } from "../../Redux/reducers/CvGeneratorReducer";
import {
  editLanguage,
  editSlider,
  editWorkExperiance,
  removeWorkExperiance,
} from "../../Redux/actions/CvGeneratorAction";
import { HeadInput } from "./primaryInput";

const LanguageGeneratorAccordian = ({ accordianIndex }) => {
  const data = [" Morsmål", " Veldig God kunnskap", " God kunnskap", " Litt kunnskap"];

  const dispatch = useDispatch();
  const languages = useSelector(languageData);

  const handleRemove = (id) => {
    dispatch(removeWorkExperiance(id));
  };
  const handleChange = (field, value) => {
    console.log(field, "<==== field");
    console.log(value, "<==== value");
    console.log(accordianIndex, "<=== index");
    let change = languages.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    dispatch(editLanguage(change));
  };

  const selectTextSize = {
    fontWeight: 600,
    fontSize: "12px",
    color: "grey",
    marginBottom: "5px",
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span></span>
        <img
          src={arrowdown}
          alt="arrowdown"
          onClick={() => {
            handleChange("enableAccordian", !languages[accordianIndex].enableAccordian);
          }}
        />
      </div>

      <div className="generator-accordian-textfields">
        <HeadInput
          value={languages[accordianIndex]?.name}
          onChange={(e) => handleChange("name", e.target.value)}
          heading="språknavn"
          //   inputPlaceholder={headings.field1}
        />
        {/* <input
          className="generator-accordian-rangefield"
          step={10}
          type="range"
          max={100}
          min={10}
          value={languages[accordianIndex]?.value}
          onChange={(e) => handleChange("value", e.target.value)}
          accordianIndex={accordianIndex}
          heading="ferdigheter"
        /> */}
        <div
          className="heading-container"
          style={{ height: "100%", display: "flex", flexDirection: "column", width: "100%" }}
        >
          <label style={selectTextSize} for="select">
            nivå
          </label>
          <select
            value={languages[accordianIndex]?.value}
            id="select"
            style={{
              height: "55px",
              border: "none",
              marginTop: "3px",
              borderRadius: "5px",
              width: "100%",
              backgroundColor: "white",
            }}
            onChange={(e) => handleChange("value", e.target.value)}
          >
            <option value={""}></option>
            {data.map((item, index) => (
              <option key={index} value={": " + item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default LanguageGeneratorAccordian;
