"use client";
//styles
import classNames from "classnames";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
//libs
import { useRouter } from 'next/navigation'
//images
import banner from "../../../../../public/images/banners/mainBanner.jpeg";

interface PostOverviewProps {
  newsSlug: string;
}

const ClientWrapper: React.FC<PostOverviewProps> = ({ newsSlug }) => {
  const router = useRouter()

  console.log(newsSlug);
  return (
    <>
      <div className={styles.TopContainer}>
        <div className={styles.TopContent}>
          <p className={classNames(global.smallTitle, styles.date)}>
            September 17, 2023
          </p>
          <h1 className={classNames(global.pageTitle, styles.date)}>
            GTC Race Lausitzring
          </h1>
          <div className={styles.viewsBlock}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p className={classNames(global.smallTitle, styles.views)}>2,3k</p>
          </div>
        </div>
      </div>
      <div className={styles.BottomContainer}>
        <div className={styles.BottomContent}>
          <p>
            From June 2 to 4, 2023, the second stage of the German Gran Turismo Cup (GTC) took place at the Lausitzring. This is a multi-class championship, where several different classes of cars participate at the same time. The weekend consists of three main races: a 60-minute GT60 and two 30-minute sprint races.
          </p>
          <br />
          <p>
            From June 2 to 4, 2023, the second stage of the German Gran Turismo Cup (GTC) took place at the Lausitzring. This is a multi-class championship, where several different classes of cars participate at the same time. The weekend consists of three main races: a 60-minute GT60 and two 30-minute sprint races.
          </p>
          <br />
          <p>
            From June 2 to 4, 2023, the second stage of the German Gran Turismo Cup (GTC) took place at the Lausitzring. This is a multi-class championship, where several different classes of cars participate at the same time. The weekend consists of three main races: a 60-minute GT60 and two 30-minute sprint races.
          </p>
          <br />
          <p>
            From June 2 to 4, 2023, the second stage of the German Gran Turismo Cup (GTC) took place at the Lausitzring. This is a multi-class championship, where several different classes of cars participate at the same time. The weekend consists of three main races: a 60-minute GT60 and two 30-minute sprint races.
          </p>
          <br />
          <p>
            From June 2 to 4, 2023, the second stage of the German Gran Turismo Cup (GTC) took place at the Lausitzring. This is a multi-class championship, where several different classes of cars participate at the same time. The weekend consists of three main races: a 60-minute GT60 and two 30-minute sprint races.
          </p>
          <div
            onClick={() => router.back()}
            className={classNames(global.primaryButton, styles.btn)}>
            Back
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientWrapper;