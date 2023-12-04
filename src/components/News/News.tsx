import NewsSlider from "./NewsSlider/NewsSlider";
//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
//libs
import { FC } from "react";
import { getNews } from "@/actions/get-news";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n";

const News = async ({ lng }: I18ComponentProps) => {
  const { t } = await useTranslation(lng, "translation");
  const news = await getNews(lng);
  const learnMoreText = t("content.news_learnMore")
  
  return (
    <div id="news" className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          {t('heading_tags.h2__NewsTitle')}
        </h2>
        {news && !!news.length && <NewsSlider learnMoreText={learnMoreText} news={news} />}
      </div>
    </div>
  );
};

export default News;
