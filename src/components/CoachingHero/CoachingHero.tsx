"use client";

import React from "react";

// styles
import classNames from "classnames";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
// components
import Image from "next/image";
import ModalWindow from "../ui/Modal/Modal";
import ContactUsForm from "../ContactUsForm/ContactUsForm";
// images
import instagramLogo from "../../../public/images/icons/instagramLogoRed.png";
import ModalSuccess from "../ui/ModalSuccess/ModalSuccess";

interface CoachingHeroProps {
  title: string;
  text: string;
}

const CoachingHero: React.FC<CoachingHeroProps> = ({ text, title }) => {
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const onFormSuccess = () => {
    setIsModal(false);
    setIsSuccess(true);
  };

  return (
    <div className={classNames(global.container, styles.wrapper)}>
      <div className={styles.overlay}>
        <div className={global.content}>
          <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
            <div className={styles.buttonWrapper}>
              <button onClick={openModal} className={global.primaryButton}>
                Start
              </button>
            </div>
            <div className={styles.buttonWrapper}>
              <a
                href="https://www.instagram.com/ivan.peklin.racing?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
                className={styles.instagramLogo}
              >
                <Image
                  src={instagramLogo}
                  width={52}
                  height={52}
                  alt="Instagram Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      {isModal && (
        <ModalWindow onClose={closeModal}>
          <ContactUsForm onSuccess={onFormSuccess} />
        </ModalWindow>
      )}
      {isSuccess && (
        <ModalWindow onClose={() => setIsSuccess(false)}>
          <ModalSuccess/>
        </ModalWindow>
      )}
    </div>
  );
};

export default CoachingHero;
