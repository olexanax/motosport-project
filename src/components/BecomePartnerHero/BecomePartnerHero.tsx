"use client";

import React from "react";
import Link from "next/link";
// styles
import classNames from "classnames";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
// components
import Image from "next/image";
import ModalWindow from "../ui/Modal/Modal";
// images
import instagramLogo from "../../../public/images/icons/instagramLogoRed.png";
import ModalSuccess from "../ui/ModalSuccess/ModalSuccess";
import CoachingModal from "../CoachingModal/CoachingModal";
import ContactUsForm from "../ContactUsForm/ContactUsForm";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n/client";

interface BecomePartnerProps extends I18ComponentProps {
  title: string;
  text: string;
}

const BecomePartner: React.FC<BecomePartnerProps> = ({ text, title, lng }) => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const { t } = useTranslation(lng, "translation");

  const onFormSuccess = () => {
    setIsSuccess(true);
  };

  const onClickOkay = () => {
    setIsSuccess(false);
  };

  return (
    <div id="become-a-partner" className={classNames(global.container, styles.wrapper)}>
      <div className={styles.overlay}>
        <div className={global.content}>
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
            <div className={styles.buttonWrapper}>
              <Link href={t("content.becomePartnerPDF")} className={global.primaryButton}>
                {t("content.BecomePartner_PDFbutton")}
              </Link>
            </div>
            <div className={styles.formWrapper}>
              <ContactUsForm {...{ lng }} onSuccess={onFormSuccess} type="partner" />
            </div>
          </div>
        </div>
      </div>
      {isSuccess && (
        <ModalWindow onClose={() => setIsSuccess(false)}>
          <ModalSuccess {...{ lng }} onSuccess={onClickOkay} />
        </ModalWindow>
      )}
    </div>
  );
};

export default BecomePartner;
