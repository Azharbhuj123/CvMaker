import React, {useState} from "react";
import articleimg from "../../assests/images/articleimg.png";
import fb from "../../assests/icons/fb.png";
import email from "../../assests/icons/email.png";
import tw from "../../assests/icons/tw.png";
import { FacebookShareButton, TwitterShareButton , EmailShareButton} from "react-share";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
const ArticleBody = () => {
  const wow = window.location.href
  console.log(wow, ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
  return (
    <div className="articlebody-container">
      <div className="articlebody-container-wrapper">
        <div className="articlebody-container-wrapper-left">
          <h6>Innholdsfortegnelse</h6>
          <div className="articlebody-container-wrapper-left-heading">
            <Link to="#one" style={{textDecoration:"none"}}>
              <h5 onClick={"#one"} >
                1.<strong>Slik skriver du CV</strong>
              </h5>
            </Link>
          </div>
          <div className="articlebody-container-wrapper-left-heading">
            <Link to="#two" style={{textDecoration:"none"}}>
              <h5 onClick={"#two"}>
                2.<strong>Velg en god mal</strong>
              </h5>
            </Link>
          </div>
          <div className="articlebody-container-wrapper-left-heading">
            <Link to="#five" style={{textDecoration:"none"}}>
              <h5 onClick={"#five"}>
                3.<strong>Husk å les over flere ganger</strong>
              </h5>
            </Link>
          </div>

          <div className="articlebody-container-wrapper-left-heading">
            <Link to="#three  " style={{textDecoration:"none"}}>
              <h5 onClick={"#three"}>
                4.<strong>Slik skriver du CV</strong>
              </h5>
            </Link>
          </div>
        </div>
        <div className="articlebody-container-wrapper-content" id="one">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <div
            className="articlebody-container-wrapper-content-headingtwo"
            id="two"
          >
            <h2>Velg en god mal</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          </div>

          <div
            className="articlebody-container-wrapper-content-headingthree"
            id="three"
          >
            <h3>En profesjonell mal</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et
            </p>
          </div>

          <div
            className="articlebody-container-wrapper-content-headingfour"
            id="four"
          >
            <h3>En kreativ mal</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et
            </p>
          </div>

          <div
            className="articlebody-container-wrapper-content-headingfive"
            id="five"
          >
            <img src={articleimg} alt="articleimg" />
            <h4>Husk å les over flere ganger</h4>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          </div>
        </div>
        <div className="articlebody-container-wrapper-right">
          <h2>Del artikkelen</h2>
          <div className="articlebody-container-wrapper-right-icons">
            <FacebookShareButton
              url={wow}
              quote={"Articles Regarding the CV"}
              hashtag={"#CVArticles"}
              description={"This is articles is relate to CV building templates and techniques "}
              
            >
              <img src={fb} alt="fb" />
            </FacebookShareButton>
            <EmailShareButton
              url={wow}
              quote={"Articles Regarding the CV"}
              hashtag={"#CVArticles"}
              description={"This is articles is relate to CV building templates and techniques "}
              
            >
            <img src={email} alt="email" />
            </EmailShareButton>
            <TwitterShareButton  url={wow}
              quote={"Articles Regarding the CV"}
              hashtag={"#CVArticles"}
              description={"This is articles is relate to CV building templates and techniques "}> 
            <img src={tw} alt="tw" />
            </TwitterShareButton>
          </div>
          <Link to={"/cvmaker"} style={{textDecoration:"none"}}>
          <button
              style={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "180px",
                borderRadius: "5px",
                gap: "5px",
                background: "#F6F3F1",
                padding: "10px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                border: "1px solid #F6F3F1",
                backgroundColor: "#eeb856",
                margin: "10px",
              }}
            >
              Lag CV
            </button>
            </Link>
        </div>
        
      </div>
     
     <div style={{display:"flex", justifyContent:"center", width:"100%", alignItems:"center", padding:"20px"}}>
      <Link to={"/cvmaker"} style={{textDecoration:"none", width:"100%", alignItems:"center", display:"flex", justifyContent:"center"}}>
     <button
              style={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20%",
                borderRadius: "5px",
                gap: "5px",
                background: "#F6F3F1",
                padding: "10px",
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "16px",
                border: "1px solid #F6F3F1",
                backgroundColor: "#eeb856",
                margin: "10px",
                padding:"10px"
              
              }}
            >
              Lag CV
            </button>
            </Link>
     </div>
     
    </div>
    
  );
};

export default ArticleBody;
