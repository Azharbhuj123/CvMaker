import React from "react";

export const CVMakerHero = (props) => {
  const {heading} = props;
  return (
    <div className="cvmaker-hero-container">
      <div className="cvmaker-hero-container-wrapper">
        <h1>{heading}</h1>
      </div>
    </div>
  );
};
