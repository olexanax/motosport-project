"use client";

import React, { useState } from "react";

// styles
import classNames from "classnames";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
// components
import Image from "next/image";
import ModalWindow from "../ui/Modal/Modal";
import ModalSuccess from "../ui/ModalSuccess/ModalSuccess";
import CoachingModal from "../CoachingModal/CoachingModal";
// images
import instagramLogo from "../../../public/images/icons/instagramLogoRed.png";
import instagramLogoHovered from "../../../public/images/icons/instagramLogoRedHovered.png";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n/client";



interface CoachingHeroProps extends I18ComponentProps {
  title: string;
  text: string;
}

const CoachingHero: React.FC<CoachingHeroProps> = ({ text, title, lng }) => {
  const { t } = useTranslation(lng, "translation");
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [isInstLogoHovered, setIsInstLogoHovered] = useState<boolean>(false);

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

  const onClickOkay = () => {
    setIsModal(false);
    setIsSuccess(false);
  };

  return (
    <div id="couching" className={classNames(global.container, styles.wrapper)}>
      <div className={global.content}>
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
          <div className={styles.buttonWrapper}>
            <button onClick={openModal} className={global.primaryButton}>
              {t("content.coaching_startButton")}
            </button>
          </div>
          <div className={styles.buttonWrapper}>
            <a
              target="_blank"
              href={t("content.instagram_link")}
              className={styles.instagramLogo}
              onMouseOver={() => setIsInstLogoHovered(true)}
              onMouseOut={() => setIsInstLogoHovered(false)}
            >
              <Image
                className={styles.instagramLogoIcon}
                src={isInstLogoHovered ? instagramLogoHovered : instagramLogo}
                width={52}
                height={52}
                alt="Instagram Logo"
              />
            </a>
          </div>
        </div>
      </div>
      {isModal && (
        <ModalWindow onClose={closeModal}>
          <CoachingModal {...{ lng }} onSuccess={onFormSuccess} />
        </ModalWindow>
      )}
      {isSuccess && (
        <ModalWindow onClose={() => setIsSuccess(false)}>
          <ModalSuccess {...{ lng }} onSuccess={onClickOkay} />
        </ModalWindow>
      )}
    </div>
  );
};

export default CoachingHero;
