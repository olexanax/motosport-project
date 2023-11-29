import React from "react";
// styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";

interface ModalSuccessProps {
  onSuccess: () => void;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({ onSuccess }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <h3 className={styles.title}>
          Your application has been successfully sent!
        </h3>
        <p className={styles.text}>We will get in contact with you soon!</p>
      </div>
      <div className={styles.submitBtn}>
        <button className={global.primaryButton} onClick={onSuccess}>
          Okay
        </button>
      </div>
    </div>
  );
};

export default ModalSuccess;
