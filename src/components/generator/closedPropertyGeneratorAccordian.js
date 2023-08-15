import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { newPropertiesData, propertiesData } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  deleteLanguage,
  deleteSlider,
  editCourse,
  editLanguage,
  editNewProperty,
  editProperty,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import moment from "moment";

const PropertyClosedGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const properties = useSelector(propertiesData);
  const newProperties = useSelector(newPropertiesData);
  const handleChange = (field, value) => {
    let change = newProperties.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    dispatch(editNewProperty(change));
  };
  const handleDelete = (id) => {
    let change = newProperties.filter((item, index) => {
      if (index !== accordianIndex) {
        return item;
      }
      return null;
    });
    dispatch(editNewProperty(change));
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>{newProperties[accordianIndex]?.name}</span>
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
            style={{cursor: "pointer"}}
              onClick={() =>
                handleChange(
                  "enableAccordian",
                  !newProperties[accordianIndex].enableAccordian
                )
              }
            >
              Rediger tekst
            </div>
            <div
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(accordianIndex)}
            >
              Slett
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default PropertyClosedGeneratorAccordian;
