import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import arrowdown from "../../assests/images/arrowdown.png";
import PrimaryInput, { HeadInput } from "./primaryInput";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Education_DATA,
  Experiance_Data,
} from "../../Redux/reducers/CvGeneratorReducer";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  addEducationData,
  editEducation,
  removeEducationData,
} from "../../Redux/actions/CvGeneratorAction";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ClosedGeneratorAccordian = ({
  open,
  setOpen,
  title,
  accordianIndex,
  dataType,
}) => {
  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [editable, setEditable] = useState(true);
  const [test, setTest] = useState("");
  const dispatch = useDispatch();
  let education = useSelector(Education_DATA);
  const experiance = useSelector(Experiance_Data);
  const handleAdd = () => {
    if (education.length < 3) {
      dispatch(
        addEducationData({
          id: Math.floor(Math.random() * 1000),
          institute: institute,
          degree: degree,
          startDate: `${moment(startDate).format("MMM YYYY")}`,
          endDate: `${moment(endDate).format("MMM YYYY")}`,
        })
      );

      setDegree("");
      setInstitute("");
      setStartDate("");
      setEndDate("");
    } else {
      console.log("Only 3 add");
    }
  };
  if (dataType === "experience") {
    education = experiance;
  }
  const handleRemove = (id) => {
    dispatch(removeEducationData(id));
  };

  const handleEdit = (id) => {
    setEditable(false);
  };
  const handleChange = (field, value) => {
    console.log(accordianIndex, "accordian index");
    console.log(field, "<=== field that going to change");
    console.log(value, "<=== value that going to change");
    let change = education.map((item, index) => {
      if (index === accordianIndex) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    dispatch(editEducation(change));
  };
  const handleDelete = (id) => {
    dispatch(removeEducationData(id));
  };
  
  return (
    <div className="generator-accordian">
      <div className="generator-accordian-heading">
        <span>
          {education[accordianIndex]?.study +
            " og " +
            education[accordianIndex]?.school +
            " på " +
            education[accordianIndex]?.location}
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
                  !education[accordianIndex].enableAccordian
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

export default ClosedGeneratorAccordian;
