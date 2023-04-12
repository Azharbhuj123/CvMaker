import React from "react";
import { CVMakerHero } from "../components/cvmaker/cvmakerhero";
import VacanciesBody from "../components/vacancies/vacanciesbody";
import { useSelector, useDispatch } from "react-redux";
import { configData } from "../Redux/reducers/CvGeneratorReducer";
import { editConfig } from "../Redux/actions/CvGeneratorAction";

const Vacancies = () => {
  const dispatch = useDispatch();

  const config = useSelector(configData);
  if (config.footerEnabler === false) {
    dispatch(editConfig({ footerEnabler: true }));
  }

  return (
    <>
      <CVMakerHero heading="Ledige Stillinger" />
      <VacanciesBody />
    </>
  );
};

export default Vacancies;
