import Image from "next/image";
import React from "react";
import contactPhoto from "../../../public/images/contactFormPhoto.png";
// styles
import styles from "./styles.module.scss";
import ContactUsForm from "../ContactUsForm/ContactUsForm";

interface CoachingModalProps {
  onSuccess: () => void;
}

const CoachingModal: React.FC<CoachingModalProps> = ({ onSuccess }) => {
  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>Contact us!</h2>
      <div className={styles.formContainer}>
        <div className={styles.formLeft}>
          <Image
            src={contactPhoto}
            alt="Contact Form Photo"
            width={383}
            height={409}
          />
          <h3 className={styles.formName}>Ivan Peklin</h3>
          <p className={styles.formSubtitle}>Lorem ipsum dolor sit amet</p>
        </div>
        <div className={styles.formRight}>
          <ContactUsForm onSuccess={onSuccess} type="coaching" />
        </div>
      </div>
    </div>
  );
};

export default CoachingModal;
