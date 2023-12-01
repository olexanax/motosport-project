'use client'
//libs
import { useTranslation } from '@/app/i18n/client'
import { useEffect, useState } from "react";
import Image from "next/image";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//images
import closeIcon from './images/closeIcon.svg'



const Banner = ({ lng }: { lng: string }) => {
  const [isBanner, setIsBanner] = useState(false);
  const { t } = useTranslation(lng,"translation");


  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && !JSON.parse(localStorage.getItem("cookieProtectionMotosport"))) {
      setIsBanner(true)
    }

    //eslint-disable-next-line
  }, []);

  const btnCloseHandler = () => {
    localStorage.setItem("cookieProtectionMotosport", JSON.stringify(true))
    setIsBanner(false);
  }
  return (
    <>
      {isBanner &&
        <div className={styles.overlay}>
          <div className={`${styles.container}`}>
            <Image width={16} height={16} src={closeIcon} alt={"Close banner"} onClick={btnCloseHandler} className={styles.closeBtn} />
            <div className={styles.header}>
              <div className={`${styles.title}`}>
                {t("content.CoockieBannerTitle")}
              </div>
            </div>
            <div className={`${styles.text}`}>
              {t("content.CoockieBannerText")}
            </div>
            <div className={styles.btnContainer}>
              <div className={`${global.primaryButton} ${styles.acceptBtn}`} onClick={btnCloseHandler}>
                {t("content.CoockieBannerBtn1")}
              </div>
              <div className={`${global.primaryButton} ${styles.declineBtn}`} onClick={btnCloseHandler}>
                {t("content.CoockieBannerBtn2")}
              </div>
            </div>
          </div>
        </div>
      }
    </>

  );
};

export default Banner;
