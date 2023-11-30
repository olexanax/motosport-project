"use client";

import React from "react";

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

interface BecomePartnerProps {
  title: string;
  text: string;
}

const BecomePartner: React.FC<BecomePartnerProps> = ({ text, title }) => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

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
              <button onClick={() => { }} className={global.primaryButton}>
                Download
              </button>
            </div>

            <div className={styles.formWrapper}>
              <ContactUsForm onSuccess={onFormSuccess} type="partner" />
            </div>
          </div>
        </div>
      </div>
      {isSuccess && (
        <ModalWindow onClose={() => setIsSuccess(false)}>
          <ModalSuccess onSuccess={onClickOkay} />
        </ModalWindow>
      )}
    </div>
  );
};

export default BecomePartner;
