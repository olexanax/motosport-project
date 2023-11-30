import NewsSlider from "./NewsSlider/NewsSlider";
//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
//libs
import { FC } from "react";
import { getNews } from "@/actions/get-news";

const News: FC = async () => {
  const news = await getNews();
  return (
    <div id="news" className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>News</h2>
        {news && !!news.length && <NewsSlider news={news} />}
      </div>
    </div>
  );
};

export default News;
