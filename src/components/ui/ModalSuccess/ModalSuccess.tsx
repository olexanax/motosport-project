"use client"
import React from "react";
// styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n/client";


interface ModalSuccessProps extends I18ComponentProps {
  onSuccess: () => void;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({ onSuccess, lng }) => {
  const { t } = useTranslation(lng, "translation");

  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <h3 className={styles.title}>
          {t("content.ModalSuccess_title")}
        </h3>
        <p className={styles.text}>
          {t("content.ModalSuccess_text")}
        </p>
      </div>
      <div className={styles.submitBtn}>
        <button className={global.primaryButton} onClick={onSuccess}>
          {t("content.ModalSuccess_button")}
        </button>
      </div>
    </div>
  );
};

export default ModalSuccess;
