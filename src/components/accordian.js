import React, { useState } from "react";
import arrowdown from "../assests/images/arrowdown.png";

const Accordian = (props) => {
  const { heading, content, link, linkText } = props;
  const [open, setOpen] = useState(true);
  return (
    <div className="accordian-container">
      <div
        className="accordian-container-headimg"
        onClick={() => setOpen(!open)}
      >
        <h1>{heading}</h1>
        <img
          style={open ? null : { transform: "rotate(180deg)" }}
          onClick={() => setOpen(!open)}
          src={arrowdown}
          alt="arrowdown"
        />
      </div>
      {open && !link ? <p>{content}</p> : null}
      {open && link ? (
        <div style={{display:"flex"}}>
          <p>{content}</p>
          <a href={link} target="_blank" style={{color:"black", marginLeft:8,fontSize:"1.2em"}}>{linkText}</a>
        </div>
      ) : null}
    </div>
  );
};

export default Accordian;
