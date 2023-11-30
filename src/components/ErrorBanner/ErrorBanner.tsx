
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import alert from "../../../public/images/icons/alertTriangle.svg";

const ErrorBanner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Oops, something went wrong!</h2>
        <Image src={alert} alt="alertTriangle" width={120} height={120} />
        <p className={styles.subtitle}>
          Please reload the page or try again later.
        </p>
        <button className={styles.button}>Back</button>
      </div>
    </div>
  );
};

export default ErrorBanner;
