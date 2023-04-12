import React from "react";
import { BiBorderRadius } from "react-icons/bi";

const ProgressBar = (props) => {
  const {
    title,
    percentage,
    color,
    backgroundcolor,
    dashed,
    borderradius,
    wrapperColor,
    height,
    maxWidth,
    fontSize,
    fontFamily,
  } = props;
  return (
    <div className="progress-bar">
      <p style={{ fontSize: fontSize, fontFamily: fontFamily }}>{title}</p>
      <div
        className="progress-bar-fuel"
        style={{
          borderRadius: `${borderradius}`,
          backgroundColor: `${wrapperColor}`,
          height: `${height}`,
          width: `${maxWidth}%`,
        }}
      >
        <div
          className="progress-bar-fuel-wrapper"
          style={{
            width: `${percentage}%`,
            color: `${color}`,
            borderBottom: `${dashed}`,
            backgroundColor: `${backgroundcolor}`,
            borderRadius: `${borderradius}`,
            height: `${height}`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
