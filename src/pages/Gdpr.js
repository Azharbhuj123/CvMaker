import React from "react";
import GdprBody from "../components/gdpr/gdprbody";
import GdprHero from "../components/gdpr/gdprhero";
import { useSelector, useDispatch } from "react-redux";
import { configData } from "../Redux/reducers/CvGeneratorReducer";
import { editConfig } from "../Redux/actions/CvGeneratorAction";

const Gdpr = () => {
  const dispatch = useDispatch();

  const config = useSelector(configData);
  if (config.footerEnabler === false) {
    dispatch(editConfig({ footerEnabler: true }));
  }

  return (
    <>
      <GdprHero />
      <GdprBody />
    </>
  );
};

export default Gdpr;
