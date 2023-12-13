"use client"
//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import "@splidejs/react-splide/css";
import scale from "../../../public/images/icons/edit.png"
import { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { FC } from "react"
import Image from "next/image";
//libs
import { motion } from 'framer-motion';
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
//utils
import lockScroll from "@/utils/lockScroll";
import unlockScroll from "@/utils/unlockScroll";
//images
import closeImageModal from "../../../public/images/icons/closeImageModal.svg"
import { GalleryPhoto } from "@/actions/get-galery";


interface Props {
  isModalOpen: boolean
  onClose: () => void,
  images: GalleryPhoto[],
  startFrom: number
}

const ImageViewer: FC<Props> = ({ isModalOpen, onClose, images, startFrom }) => {
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
          <Splide
            options={{
              rewind: true,
              type: "loop",
              perPage: 1,
              pagination: false,
              start: startFrom
            }}
            className={styles.slider}
          >
            {images.map((image) => (
              <SplideSlide className={styles.slide} key={image.id}>
                <Image className={styles.modalImage} src={image.image} width={800} height={548} alt="" />
              </SplideSlide>
            ))}
          </Splide>
          <Image onClick={() => onClose()} width={46} height={46} className={styles.closeImageModal} src={closeImageModal} alt="" />
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