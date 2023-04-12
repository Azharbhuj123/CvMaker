import React from "react";
import calenderIcon from "../../assests/icons/calendericon.png";

const ArticleHero = () => {
  return (
    <div className="article-container">
      <div className="article-container-wrapper">
        <h1>Slik skriver du CVen: En komplett guide for nybegynnere</h1>
      </div>
      <div className="article-container-date">
        <img src={calenderIcon} alt="calenderIcon" />
        <span>19. mars 2022</span>
      </div>
    </div>
  );
};

export default ArticleHero;
