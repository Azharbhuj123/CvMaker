import React from "react";
import blogimg from "../assests/images/blogimg.png";
import calenderIcon from "../assests/icons/calendericon.png";

export const BlogInnerCard = (props) => {
  const { heading, content, date } = props;
  return (
    <div {...props} className="blogcard-container-wrapper-card">
      <div className="blogcard-container-wrapper-card-imgdiv">
        <img src={blogimg} alt="blogimg" />
      </div>
      <div className="blogcard-container-wrapper-card-content">
        <h1>{heading}</h1>
        <p>{content}</p>
        <div className="blogcard-container-wrapper-card-content-date">
          <img src={calenderIcon} alt="calenderIcon" />
          <h2>{date}</h2>
        </div>
      </div>
    </div>
  );
};
