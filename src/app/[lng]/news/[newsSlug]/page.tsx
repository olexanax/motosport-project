//component
import Link from "next/link";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
import { getNewsBySlug } from "@/actions/get-new-by-slug";
import { Metadata } from "next";
import { redirect } from "next/navigation";
//utils
import makePargraphs from "@/utils/makePargraphs";
//i18n
import { I18PageProps } from "@/types/i18NextTypes";
import { useTranslation } from "../../../i18n";

export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = "force-dynamic";

interface PostOverviewProps {
  params: {
    newsSlug: string;
    lng: I18PageProps['params']['lng']
  };
}

const NewsPage: React.FC<PostOverviewProps> = async ({
  params: { newsSlug, lng },
}) => {
  const news = await getNewsBySlug(newsSlug);
  const { t } = await useTranslation(lng, "translation");

  return (
    <>
      {news && (
        <>
          <div className={styles.TopContainer} style={{ background: `url(${news.image})` }}>
            <div className={styles.overlay}></div>
            <div className={styles.TopContent}>
              <p className={classNames(global.smallTitle, styles.date)}>
                {news.date}
              </p>
              <h1 className={classNames(global.pageTitle, styles.date)}>
                {news.title}
              </h1>
              <div className={styles.viewsBlock}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className={classNames(global.smallTitle, styles.views)}>
                  {news.views}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.BottomContainer}>
            <div className={styles.BottomContent}>
              {makePargraphs(news.description, { [global.text2]: true })}
              <Link
                href={"/"}
                className={classNames(global.primaryButton, styles.btn)}
              >
                {t("content.news_backButon")}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export async function generateMetadata({
  params,
}: PostOverviewProps): Promise<Metadata> {
  const news = await getNewsBySlug(params.newsSlug);


  if (!news) {
    redirect("/not-found");
  }

  const { meta_description, meta_title } = news;

  return {
    title: meta_title,
    description: meta_description,
  };
}

export default NewsPage;
