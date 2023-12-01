"use client"
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import alertIcon from "../../../public/images/icons/alertTriangle.svg";
import alertIconBlack from "../../../public/images/icons/alertTriangleBlack.png";
import classNames from "classnames";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n/client";


interface ErrorBannerProps extends I18ComponentProps {
  theme?: "light" | "dark";
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ theme = "light", lng }) => {
  const { t } = useTranslation(lng, "translation");

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.content, {
          [styles.dark]: theme === "dark",
        })}
      >
        <h2 className={styles.title}>
          {t("content.errorBanner_title")}
        </h2>
        {theme === "light" ? (
          <Image src={alertIcon} alt="alertTriangle" width={80} height={80} />
        ) : (
          <Image
            src={alertIconBlack}
            alt="alertTriangle"
            width={80}
            height={80}
          />
        )}
        <p className={styles.subtitle}>
          {t("content.errorBanner_text")}
        </p>
      </div>
    </div>
  );
};

export default ErrorBanner;
