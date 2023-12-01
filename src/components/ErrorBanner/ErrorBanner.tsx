import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import alertIcon from "../../../public/images/icons/alertTriangle.svg";
import alertIconBlack from "../../../public/images/icons/alertTriangleBlack.png";
import classNames from "classnames";

interface ErrorBannerProps {
  theme?: "light" | "dark";
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ theme = "light" }) => {
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.content, {
          [styles.dark]: theme === "dark",
        })}
      >
        <h2 className={styles.title}>Oops, something went wrong!</h2>
        {theme === "light" ? (
          <Image src={alertIcon} alt="alertTriangle" width={80} height={80} />
        ) : (
          <Image
            src={alertIconBlack}
            alt="alertTriangle"
            width={80}
            height={80}
          />
        )}
        <p className={styles.subtitle}>
          Please reload the page or try again later.
        </p>
      </div>
    </div>
  );
};

export default ErrorBanner;
