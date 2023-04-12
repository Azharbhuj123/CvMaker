import React from "react";
import ArticleBody from "../components/article/articleBody";
import ArticleHero from "../components/article/articlehero";
import { useSelector, useDispatch } from "react-redux";
import { editConfig } from "../Redux/actions/CvGeneratorAction";
import { configData } from "../Redux/reducers/CvGeneratorReducer";

const Article = () => {
  const dispatch = useDispatch();
  const config = useSelector(configData);
  if (config.footerEnabler === false) {
    dispatch(editConfig({ footerEnabler: true }));
  }

  return (
    <>
      <ArticleHero />
      <ArticleBody />
    </>
  );
};

export default Article;
