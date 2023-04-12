import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from "../assests/icons/logo.png";
import { CgClose } from "react-icons/cg";
import { HashLink, NavHashLink } from "react-router-hash-link";

const MobileScreenHeader = () => {
  let ref = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }

      // setOpen(true);
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [ref]);
  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="mobilescreenheader-container" >
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      {open ? (
        <CgClose id="closebtn" style={{ color: "#000",  }}   onClick={() => setOpen(false)} />
      ) : (
        <GiHamburgerMenu id="burerbtn"
          style={{ color: "#EEB856", }}
         
          onClick={() => setOpen(!open)}
        />
      )}

      {open ? (
        <div ref={ref} className="mobilescreenheader-container-bar">
          <Link style={{ textDecoration: "none", color: "black" }} to="/maler">
            <span onClick={() => setOpen(!open)}>Cv-maler</span>
          </Link>

          <a style={{ textDecoration: "none", color: "black" }} href="https://www.cvhjelperen-blogg.no/" target="_blank">
            <span onClick={() => setOpen(!open)}>Blogg</span>
          </a>
          <Link style={{ textDecoration: "none", color: "black" }} to="/omoss">
            <span onClick={() => setOpen(!open)}>Om oss</span>
          </Link>
          {/* <HashLink
            style={{ textDecoration: "none", color: "black" }}
            smooth
            to={"/#FAQ"}
          >
            <span onClick={() => setOpen(!open)}>FAQ</span>
          </HashLink> */}
          <HashLink style={{ textDecoration: "none", color: "black" }} smooth to={"/#FAQ"}>
            <span onClick={() => setOpen(!open)}>FAQ</span>
          </HashLink>
          <Link style={{ textDecoration: "none", color: "black" }} to="/gdpr">
            <span onClick={() => setOpen(!open)}>GDPR</span>
          </Link>

          <a style={{ textDecoration: "none", color: "black" }} href="https://cvhjelperen.recman.no/" target="_blank">
            <span onClick={() => setOpen(!open)}>Ledige stillinger</span>
          </a>
          <Link style={{ textDecoration: "none", color: "black" }} to="/maler">
            <button style={{ width: "100%" }} onClick={() => setOpen(!open)}>
              Lag gratis CV
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
export default MobileScreenHeader;
