"use client"
//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import scale from "../../../public/images/icons/edit.png"
import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { FC } from "react"
import Image from "next/image";
import closeImageModal from "../../../public/images/icons/closeImageModal.svg"
//libs
//libs
import { motion } from 'framer-motion';
//utils
import lockScroll from "@/utils/lockScroll";
import unlockScroll from "@/utils/unlockScroll";

interface Props {
  image: string
  isModalOpen: boolean
  onClose: () => void
}

const ImageViewer: FC<Props> = ({ image, isModalOpen, onClose }) => {

  useEffect(() => {
    if (isModalOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isModalOpen])

  useEffect(() => {
    return () => {
      unlockScroll()
    }
  }, [])

  const variants1 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    },
  };

  return (
    <>
      <Portal>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={variants1}
          viewport={{ once: true, amount: 0.8 }}
          className={styles.modal__window} >
          <Image width={800} height={548} className={styles.modalImage} src={image} alt="" />
          <Image onClick={() => onClose()} width={24} height={24} className={styles.closeImageModal} src={closeImageModal} alt="" />
        </motion.div>
      </Portal>
    </>
  )
}

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const node = document.createElement("div");
  document.body.appendChild(node);

  return ReactDOM.createPortal(children, node);
};
export default ImageViewer