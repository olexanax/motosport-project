"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "../../styles.module.scss";
import global from "@/styles/global.module.scss";

interface NewsButtonProps {
  buttonText: string;
  fromSection: "news" | "hero";
}

const NewsButton: React.FC<NewsButtonProps> = ({ buttonText, fromSection }) => {
  const router = useRouter();

  const onClick = () => {
    if (fromSection === "news") {
      router.replace(`/#news`);
    } else {
      router.replace(`/`);
    }
  };

  return (
    <button
      onClick={onClick}
      className={classNames(global.primaryButton, styles.btn)}
    >
      {buttonText}
    </button>
  );
};

export default NewsButton;
