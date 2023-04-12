import React from "react";
import CVMakerBody from "../components/cvmaker/cvmakerbody";
import { CVMakerHero } from "../components/cvmaker/cvmakerhero";
import { editConfig } from "../Redux/actions/CvGeneratorAction";
import { configData } from "../Redux/reducers/CvGeneratorReducer";
import { useSelector, useDispatch } from "react-redux";

const CVMaker = () => {
  const dispatch = useDispatch();

  const config = useSelector(configData);
  if (config.footerEnabler === false) {
    dispatch(editConfig({ footerEnabler: true }));
  }
  return (
    <>
      <CVMakerHero heading="Alle våre CV-maler" />
      <CVMakerBody />
    </>
  );
};

export default CVMaker;
