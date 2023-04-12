import React from "react";
import { HiPlus } from "react-icons/hi";

const AddDetails = (props) => {
  const { heading } = props;
  return (
    <div {...props} className="add-detail-container">
      <HiPlus size={22} style={{ color: "#EEB856" }} />
      <span>{heading}</span>
    </div>
  );
};

export default AddDetails;
