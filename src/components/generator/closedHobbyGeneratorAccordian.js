import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getHobbies } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  deleteHobby,
  editHobbies,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ClosedHobbyGeneratorAccordian = ({ accordianIndex }) => {
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
  const handleDelete = (id) => {
    dispatch(deleteHobby(id));
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>{skills[accordianIndex]?.name}</span>
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
                  !skills[accordianIndex].enableAccordian
                )
              }
            >
              Rediger tekst
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

export default ClosedHobbyGeneratorAccordian;
