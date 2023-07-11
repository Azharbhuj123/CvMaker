import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getInternships, getNewInternships } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  editInternship,
  editNewInternship,
  removeInternship,
  removeNewInternship,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ClosedInternshipGeneratorAccordian = ({
  open,
  setOpen,
  title,
  accordianIndex,
  dataType,
}) => {
  const dispatch = useDispatch();
  const experiance = useSelector(getInternships);
  const newInternship = useSelector(getNewInternships);

  const handleChange = (field, value) => {
    let change = newInternship.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    console.log(change, "<====chasdasdangeeeee");
    dispatch(editNewInternship(change));
  };
  const handleDelete = (id) => {
    dispatch(removeNewInternship(id));
  };

  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>
          {newInternship[accordianIndex]?.jobTitle +
            " er hos " +
            newInternship[accordianIndex]?.employer}
        </span>
        {/* <img src={arrowdown} alt="arrowdown" /> */}
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
                  !newInternship[accordianIndex].enableAccordian
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

export default ClosedInternshipGeneratorAccordian;
