import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import arrowdown from "../../assests/images/arrowdown.png";
import PrimaryInput, { HeadInput } from "./primaryInput";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { newReferenceData, referenceData } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import { editNewReference, editReference } from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ClosedReferenceGeneratorAccordian = ({
  open,
  setOpen,
  title,
  accordianIndex,
  dataType,
}) => {
  const dispatch = useDispatch();
  const references = useSelector(referenceData);
  const newReferences = useSelector(newReferenceData);
  const handleChange = (field, value) => {
    console.log(accordianIndex, "accordian index");
    console.log(field, "<=== field that going to change");
    console.log(value, "<=== value that going to change");
    let change = newReferences.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    dispatch(editNewReference(change));
  };
  const handleDelete = (id) => {
    let change = newReferences.filter((item, index) => {
      if (index !== accordianIndex) {
        return item;
      }
      return null;
    });
    dispatch(editNewReference(change));
  };
  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>
          {newReferences[accordianIndex]?.name +
            " og " +
            newReferences[accordianIndex]?.companyName +
            " på " +
            newReferences[accordianIndex]?.email}
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
            style={{cursor: "pointer"}}
              onClick={() =>
                handleChange("enableAccordian", !newReferences[accordianIndex].enableAccordian)
              }
            >
              Rediger tekst
            </div>
            <div style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(accordianIndex)}>
              Slett
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default ClosedReferenceGeneratorAccordian;
