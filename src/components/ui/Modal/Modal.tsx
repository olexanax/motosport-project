"use client";
import { StaticImageData } from "next/image";
import { FC, useEffect } from "react";
import { motion } from "framer-motion";
//components
import Image from "next/image";
//styles
import styles from "./styles.module.scss";
//images
import closeIcon from "../../../../public/images/icons/close.png";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: FC<Props> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.overlay}
    >
      <div className={styles.container}>
        <Image
          width={24}
          height={24}
          onClick={onClose}
          className={styles.closeIcon}
          alt="close"
          src={closeIcon}
        />
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;
