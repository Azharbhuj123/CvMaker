import React, { useState } from "react";
import CvMaler from "../components/home/cvmaler";
import { useSelector, useDispatch } from "react-redux";
import EasySteps from "../components/home/easysteps";
import FAQ from "../components/home/faq";
import Illustration from "../components/home/illustration";
import { configData } from "../Redux/reducers/CvGeneratorReducer";
import FixTheCv from "../components/home/fixthecv";
import Hero from "../components/home/hero";
import JobWiningResume from "../components/home/jobwiningresume";
import RecruitmentAgencies from "../components/home/recruitmentAgencies";
import { editConfig } from "../Redux/actions/CvGeneratorAction";

const Home = ({ faqState, setFaqState }) => {
  const config = useSelector(configData);
  const dispatch = useDispatch();
  if (config.footerEnabler === false) {
    dispatch(editConfig({ footerEnabler: true }));
  }
  return (
    <>
      <Hero />
      <JobWiningResume />
      <EasySteps />
      <RecruitmentAgencies />
      <Illustration />
      <FixTheCv />
      <CvMaler />
      <FAQ setFaqState={setFaqState} faqState={faqState} />
    </>
  );
};

export default Home;
