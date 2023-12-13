"use client"
//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import scale from "../../../public/images/icons/edit.png"
import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { FC } from "react"
import Image from "next/image";
//libs
import { motion } from 'framer-motion';
import { useSwipeable } from "react-swipeable";
//utils
import lockScroll from "@/utils/lockScroll";
import unlockScroll from "@/utils/unlockScroll";
//images
import sliderArr from "../../../public/images/icons/sliderArr.svg"
import closeImageModal from "../../../public/images/icons/closeImageModal.svg"
import classNames from "classnames";


interface Props {
  image: string
  isModalOpen: boolean
  onClose: () => void,
  onPrev: () => void
  onNext: () => void
  imageIndex?: "last" | "first"
}

const ImageViewer: FC<Props> = ({ image, isModalOpen, onClose, onNext, onPrev, imageIndex }) => {

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => imageIndex !== "last" && onNext(),
    onSwipedRight: (eventData) => imageIndex !== "first" && onPrev(),
  });

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
          {...handlers}
          initial="hidden"
          whileInView="visible"
          variants={variants1}
          viewport={{ once: true, amount: 0.8 }}
          className={styles.modal__window} >
          <Image width={800} height={548} className={styles.modalImage} src={image} alt="" />
          <Image onClick={() => onClose()} width={46} height={46} className={styles.closeImageModal} src={closeImageModal} alt="" />
          <div className={classNames(styles.prevBtn, imageIndex === 'first' ? styles.disabled : '')} onClick={onPrev}>
            <Image alt="prev" src={sliderArr} />
          </div>
          <div className={classNames(styles.nextBtn, imageIndex === 'last' ? styles.disabled : '')} onClick={onNext}>
            <Image alt="next" src={sliderArr} />
          </div>
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