import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Accordian from "../accordian";

const FAQ = ({ faqState }) => {
  const location = useLocation();
  const faqRef = useRef();

  // useEffect(() => {
  //   if (location.hash === "#FAQ") {
  //     console.log(faqRef.current, "CURREN FAQ");
  //     faqRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       // block: "nearest",
  //       inline: "end",
  //     });
  //   }
  // }, []);

  const ledgeLink = <a href="https://cvhjelperen.recman.no/">Ledige stillinger</a>

  return (
    <div className="faq-container" id="FAQ" ref={faqRef}>
      <div className="faq-container-wrapper">
        <div className="faq-container-wrapper-heading">
          <h1>Ofte stilte spørsmål</h1>
        </div>
        <div className="faq-container-wrapper-acc">
          <Accordian
            heading="Er CV hjelperen gratis?"
            content="Ja, CV hjelperen er helt gratis. Dette gjør det altså også helt risikofritt for deg å lage en jobbvinnende CV"
          />

          <Accordian
            heading="Kan Cv hjelperen hjelpe deg med å lage CV?"
            content="Vi har laget en rekke innlegg om Cv og jobb tips. Trykk her: "
            link="https://www.cvhjelperen-blogg.no/"
            linkText="Blogg"
         />

          <Accordian
            heading="Kan CV hjelperen hjelpe meg ut i jobb?"
            content="Ja. Vi har samlet en rekke ledige stillinger du kan søke på"
            link="https://cvhjelperen.recman.no/"
            linkText="Ledige stillinger"
          />

          <Accordian
            heading="Er du bedrift som ønsker samarbeid med CV hjelperen?"
            content="Ta kontakt på Post@cvhjelperen.no / 0047 97104135"
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
