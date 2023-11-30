import React from "react";
import styles from "./styles.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Oops! Page not found!</h2>
        <h1 className={styles.error}>404</h1>
        <p className={styles.subtitle}>
          But don't worry! You can always return to the home page or use the
          search bar to find what you're looking for.
        </p>
        <button className={styles.button}>Back</button>
      </div>
    </div>
  );
};

export default NotFound;
