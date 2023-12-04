import classNames from "classnames";
//components
import AboutMeSlider from "./AboutMeSlider/AboutMeSlider";
//styles
import global from "@/styles/global.module.scss";
import styles from "./styles.module.scss";
import { getAboutMe } from "@/actions/get-about-me";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes";
import { useTranslation } from "@/app/i18n";
import ErrorBanner from "../ErrorBanner/ErrorBanner";

const AboutMe = async ({ lng }: I18ComponentProps) => {
  const aboutMe = await getAboutMe();
  const { t } = await useTranslation(lng, "translation");

  const STAT_DATA = [
    {
      value: t("content.aboutMe_statistic_item1_value"),
      title: t("content.aboutMe_statistic_item1_text"),
    },
    {
      value: t("content.aboutMe_statistic_item2_value"),
      title: t("content.aboutMe_statistic_item2_text"),
    },
    {
      value: t("content.aboutMe_statistic_item3_value"),
      title: t("content.aboutMe_statistic_item3_text"),
    },
  ];

  return (
    <>
      <div id="about-us" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.divider}>
            <div className={styles.dividerFirstLine}></div>
            <div className={styles.dividerSecondLine}></div>
          </div>
          <div className={styles.infoBlock}>
            <h2 className={classNames(global.sectionTitle, styles.title)}>
              {t("heading_tags.h2__aboutMeTitle")}
            </h2>
            <div className={styles.textBlock}>
              <div className={classNames(styles.leftCol, global.text2)}>
                <p>{t("content.aboutMe_leftBlock_text1")}</p>
                <br />
                <div>
                  {t("content.aboutMe_leftBlock_text2")}
                  <div className={styles.list}>
                    <p className={styles.listItem}>
                      {t("content.aboutMe_leftBlock_text3")}
                    </p>
                    <p className={styles.listItem}>
                      {t("content.aboutMe_leftBlock_text4")}
                    </p>
                  </div>
                </div>
              </div>
              <ul className={classNames(styles.rightCol, global.text2)}>
                <li>
                  <span className={styles.boldtext}>
                    {t("content.aboutMe_rightBlock_text1_title")}
                  </span>{" "}
                  {t("content.aboutMe_rightBlock_text1_text")}
                </li>
                <li>
                  <span className={styles.boldtext}>
                    {t("content.aboutMe_rightBlock_text2_title")}
                  </span>{" "}
                  {t("content.aboutMe_rightBlock_text2_text")}
                </li>
                <li>
                  <span className={styles.boldtext}>
                    {t("content.aboutMe_rightBlock_text3_title")}
                  </span>{" "}
                  {t("content.aboutMe_rightBlock_text3_text")}
                </li>
                <li>
                  <span className={styles.boldtext}>
                    {t("content.aboutMe_rightBlock_text4_title")}
                  </span>{" "}
                  {t("content.aboutMe_rightBlock_text4_text")}
                </li>
                <li>
                  <span className={styles.boldtext}>
                    {t("content.aboutMe_rightBlock_text5_title")}
                  </span>{" "}
                  {t("content.aboutMe_rightBlock_text5_text")}
                </li>
                <li>
                  <span className={styles.boldtext}>
                    {t("content.aboutMe_rightBlock_text6_title")}
                  </span>
                  {t("content.aboutMe_rightBlock_text6_text")}
                </li>
                <li>
                  <span className={styles.boldtext}>
                    {t("content.aboutMe_rightBlock_text7_title")}
                  </span> {" "}
                  {t("content.aboutMe_rightBlock_text7_text")}
                </li>
              </ul>
            </div>
            <p className={classNames(styles.text, global.text2)}>
              {t("content.aboutMe_textAfterColums")}
            </p>
            <div className={styles.statBlock}>
              {STAT_DATA.map((item, i) => (
                <div key={i} className={styles.statItem}>
                  <div className={styles.statValue}>
                    <span>{item.value}</span>
                  </div>
                  <div className={classNames(styles.statName, global.text2)}>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {!aboutMe && <ErrorBanner {...{ lng }} />}
      <AboutMeSlider aboutMe={aboutMe} />
    </>
  );
};

export default AboutMe;
