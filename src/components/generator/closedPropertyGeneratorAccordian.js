import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { propertiesData } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  deleteLanguage,
  deleteSlider,
  editCourse,
  editLanguage,
  editProperty,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import moment from "moment";

const PropertyClosedGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const properties = useSelector(propertiesData);
  const handleChange = (field, value) => {
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
  const handleDelete = (id) => {
    let change = properties.filter((item, index) => {
      if (index !== accordianIndex) {
        return item;
      }
      return null;
    });
    dispatch(editProperty(change));
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>{properties[accordianIndex]?.name}</span>
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
                handleChange(
                  "enableAccordian",
                  !properties[accordianIndex].enableAccordian
                )
              }
            >
              Rediger tekstF
            </div>
            <div
              style={{ color: "red" }}
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
