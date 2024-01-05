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
import { I18ComponentProps } from "@/types/i18NextTypes";
import { useTranslation } from "@/app/i18n/client";
import axios from "axios";
import { serverDomain } from "@/services/API";

interface BecomePartnerProps extends I18ComponentProps {
  title: string;
  text: string;
}

const BecomePartner: React.FC<BecomePartnerProps> = ({ text, title, lng }) => {
  const [pdfUrl, setPdfUrl] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const { t } = useTranslation(lng, "translation");

  const onFormSuccess = () => {
    setIsSuccess(true);
  };

  const onClickOkay = () => {
    setIsSuccess(false);
  };

  const getPdf = async () => {
    try {
      const { data } = await axios.get(
        `${serverDomain}/become-partner-pdf/${lng === "en" ? 1 : 2}`
      );

      return data as {
        id: number;
        pdf: string;
        language: "EN" | "UA";
      };
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getPdf().then((data) => {
      if (data) {
        setPdfUrl(data?.pdf);
        setIsLoading(false);
      }
    });
  }, [lng]);

  return (
    <div
      id="become-a-partner"
      className={classNames(global.container, styles.wrapper)}
    >
      <div className={styles.overlay}>
        <div className={global.content}>
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
            <div className={styles.buttonWrapper}>
              <Link
                href={pdfUrl}
                className={classNames(global.primaryButton, {
                  [styles.loadingButton]: isLoading,
                })}
              >
                {t("content.BecomePartner_PDFbutton")}
              </Link>
            </div>
            <div className={styles.formWrapper}>
              <ContactUsForm
                {...{ lng }}
                onSuccess={onFormSuccess}
                type="partner"
              />
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
