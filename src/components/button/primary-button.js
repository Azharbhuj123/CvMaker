import React from "react";

const Primarybutton = (props) => {
  return (
    <button className="primary-button" {...props}>
      {props.title}
    </button>
  );
};

export default Primarybutton;
