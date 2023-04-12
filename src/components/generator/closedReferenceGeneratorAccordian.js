import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import arrowdown from "../../assests/images/arrowdown.png";
import PrimaryInput, { HeadInput } from "./primaryInput";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { referenceData } from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import { editReference } from "../../Redux/actions/CvGeneratorAction";
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
  const handleChange = (field, value) => {
    console.log(accordianIndex, "accordian index");
    console.log(field, "<=== field that going to change");
    console.log(value, "<=== value that going to change");
    let change = references.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    dispatch(editReference(change));
  };
  const handleDelete = (id) => {
    let change = references.filter((item, index) => {
      if (index !== accordianIndex) {
        return item;
      }
      return null;
    });
    dispatch(editReference(change));
  };
  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>
          {references[accordianIndex]?.name +
            " og " +
            references[accordianIndex]?.companyName +
            " på " +
            references[accordianIndex]?.email}
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
              onClick={() =>
                handleChange("enableAccordian", !references[accordianIndex].enableAccordian)
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

export default ClosedReferenceGeneratorAccordian;
