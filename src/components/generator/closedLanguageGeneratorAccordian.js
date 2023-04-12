import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { languageData } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  deleteLanguage,
  deleteSlider,
  editLanguage,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const LanguageClosedGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const languages = useSelector(languageData);
  const handleChange = (field, value) => {
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
  const handleDelete = (id) => {
    let change = languages.filter((item, index) => {
      if (index !== accordianIndex) {
        return item;
      }
      return null;
    });
    dispatch(editLanguage(change));
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>{languages[accordianIndex]?.name}</span>
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
                handleChange("enableAccordian", !languages[accordianIndex].enableAccordian)
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

export default LanguageClosedGeneratorAccordian;
