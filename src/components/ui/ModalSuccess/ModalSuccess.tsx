import React from "react";
// styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";

interface ModalSuccessProps {}

const ModalSuccess: React.FC<ModalSuccessProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <h3 className={styles.title}>
          Your application has been successfully sent!
        </h3>
        <p className={styles.text}>We will get in contact with you soon!</p>
      </div>
      <div className={styles.submitBtn}>
        <button className={global.primaryButton}>Okay</button>
      </div>
    </div>
  );
};

export default ModalSuccess;
