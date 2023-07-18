import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getHobbies, getNewHobbies } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  deleteHobby,
  deleteNewHobby,
  editHobbies,
  editNewHobbies,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ClosedHobbyGeneratorAccordian = ({ accordianIndex }) => {
  const dispatch = useDispatch();
  const skills = useSelector(getHobbies);
  const newHobbies = useSelector(getNewHobbies);
  const handleChange = (field, value) => {
    let change = newHobbies.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    dispatch(editNewHobbies(change));
  };
  const handleDelete = (id) => {
    dispatch(deleteNewHobby(id));
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>{newHobbies[accordianIndex]?.name}</span>
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
                  !newHobbies[accordianIndex].enableAccordian
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

export default ClosedHobbyGeneratorAccordian;
