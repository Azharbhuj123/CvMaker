 import React from "react";

const PrimaryInput = (props) => {
  return (
    <div className="primary-input">
      <p>{props.heading}</p>

      {props.description ? (
        <textarea
          name="Text1"
          cols="40"
          rows="5"
          {...props}
          className="primary-input-inputDescription"
        ></textarea>
      ) : (
        <input className="primary-input-input" {...props} />
      )}
    </div>
  );
};

export default PrimaryInput;

export const HeadInput = (props) => {
  const { heading, inputPlaceholder } = props;
  return (
    <div className="headinput-container">
      <span>{heading}</span>
      <input placeholder={inputPlaceholder} {...props} />
    </div>
  );
};

export const AltHeadInput = (props) => {
  const { heading, inputPlaceholder } = props;
  return (
    <div className="headinput-container-secondary">
      <span>{heading}</span>
      <input placeholder={inputPlaceholder} {...props} />
    </div>
  );
};

