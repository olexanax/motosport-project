//component
import Link from "next/link";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
import { getNewsBySlug } from "@/actions/get-new-by-slug";

interface PostOverviewProps {
  params: {
    newsSlug: string;
  };
}

const NewsPage: React.FC<PostOverviewProps> = async ({
  params: { newsSlug },
}) => {
  const news = await getNewsBySlug(newsSlug);

  return (
    <>
      {news && (
        <>
          <div className={styles.TopContainer}>
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
              {news.description}
              <Link
                href={"/"}
                className={classNames(global.primaryButton, styles.btn)}
              >
                Back
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NewsPage;
