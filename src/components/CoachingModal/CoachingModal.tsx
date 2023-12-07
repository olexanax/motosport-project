import Image from "next/image";
import React from "react";
import contactPhoto from "../../../public/images/contactFormPhoto.png";
// styles
import styles from "./styles.module.scss";
import ContactUsForm from "../ContactUsForm/ContactUsForm";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n/client";


interface CoachingModalProps extends I18ComponentProps {
  onSuccess: () => void;
}

const CoachingModal: React.FC<CoachingModalProps> = ({ onSuccess, lng }) => {
  const { t } = useTranslation(lng, "translation");

  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>
        {t("content.coaching_form_title")}
      </h2>
      <div className={styles.formContainer}>
        <div className={styles.formLeft}>
          <Image
            src={contactPhoto}
            alt="Contact Form Photo"
            width={383}
            height={409}
          />
          <h3 className={styles.formName}>
            {t("content.coaching_form_name")}
          </h3>
        </div>
        <div className={styles.formRight}>
          <ContactUsForm {...{ lng }} onSuccess={onSuccess} type="coaching" />
        </div>
      </div>
    </div>
  );
};

export default CoachingModal;
