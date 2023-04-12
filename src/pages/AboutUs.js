import React, { useState } from "react";
import AboutusBody from "../components/aboutus/aboutusBody";
import AboutusHero from "../components/aboutus/aboutushero";
import { useSelector, useDispatch } from "react-redux";
import { configData } from "../Redux/reducers/CvGeneratorReducer";
import { editConfig } from "../Redux/actions/CvGeneratorAction";

const AboutUs = () => {
  const dispatch = useDispatch();

  const config = useSelector(configData);
  if (config.footerEnabler === false) {
    dispatch(editConfig({ footerEnabler: true }));
  }

  return (
    <>
      <AboutusHero />
      <AboutusBody />
    </>
  );
};

export default AboutUs;
