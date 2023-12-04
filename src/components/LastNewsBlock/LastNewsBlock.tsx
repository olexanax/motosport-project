import styles from "./styles.module.scss";
//compoennts
import NewsCard from "./NewsCard/NewsCard";
import classNames from "classnames";
import { getNews } from "@/actions/get-news";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes";
import { useTranslation } from "@/app/i18n";

const LastNewsBlock = async ({ lng }: I18ComponentProps) => {
  const { t } = await useTranslation(lng, "translation");
  const learnMoreText = t("content.news_learnMore");
  const news = await getNews(lng);

  return (
    <>
      <div className={classNames(styles.container, styles.desctop)}>
        {news &&
          news
            .slice(0, 3)
            .map((news, i) => (
              <NewsCard
                key={i}
                lng={lng}
                learnMoreText={learnMoreText}
                {...news}
              />
            ))}
      </div>
      <div className={classNames(styles.container, styles.mobile)}>
        {news &&
          news
            .slice(0, 2)
            .map((news, i) => (
              <NewsCard
                key={i}
                lng={lng}
                learnMoreText={learnMoreText}
                {...news}
              />
            ))}
      </div>
    </>
  );
};

export default LastNewsBlock;
