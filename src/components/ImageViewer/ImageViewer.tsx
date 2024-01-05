"use client";
//styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles.module.scss";
//libs
import Image from "next/image";
import ReactDOM from "react-dom";
import { useEffect, FC } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import React from "react";
// @ts-ignore
import Slider from "react-slick";
//utils
import lockScroll from "@/utils/lockScroll";
import unlockScroll from "@/utils/unlockScroll";
//images
import closeImageModal from "../../../public/images/icons/closeImageModal.svg";
import { GalleryPhoto } from "@/actions/get-galery";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  images: GalleryPhoto[];
  startFrom: number;
}

const ImageViewer: FC<Props> = ({
  isModalOpen,
  onClose,
  images,
  startFrom,
}) => {
  useEffect(() => {
    if (isModalOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: startFrom,
    centerMode: true,
    adaptiveHeight: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    classNames: "TESTTEST",
    responsive: [
      {
        breakpoint: 500,
        settings: {
          centerMode: false,
        },
      },
    ],
  };

  const variants1 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
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
          className={classNames(styles.modal__window)}
        >
          <Slider {...settings} className={styles.slider}>
            {images.map((image) => (
              <div className={styles.slide} key={image.id}>
                <Image
                  className={styles.modalImage}
                  src={image.image}
                  width={800}
                  height={548}
                  alt=""
                />
              </div>
            ))}
          </Slider>
          <Image
            onClick={() => onClose()}
            width={46}
            height={46}
            className={styles.closeImageModal}
            src={closeImageModal}
            alt=""
          />
        </motion.div>
      </Portal>
    </>
  );
};

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const node = document.createElement("div");
  document.body.appendChild(node);

  return ReactDOM.createPortal(children, node);
};

type ArrowProps = {
  onClick?: () => void;
};
function CustomPrevArrow(props: ArrowProps) {
  return (
    <div
      className={classNames(styles.customArrow, styles.arrowPrev)}
      onClick={props.onClick}
    >
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="27.5" cy="27.5" r="27.5" fill="#A20F0F" />
        <path
          d="M30.7038 35.7488C31.0757 35.3922 31.1008 34.7877 30.7599 34.3986L25.152 28L30.7599 21.6014C31.0724 21.2447 31.0773 20.7071 30.7895 20.3452L30.7038 20.2512C30.3318 19.8946 29.754 19.9208 29.4131 20.3099L23.2401 27.3543C23.2362 27.3588 23.2323 27.3633 23.2285 27.3678L23.2962 27.2956C23.2544 27.3357 23.217 27.3789 23.1839 27.4246C23.1718 27.4416 23.1603 27.4588 23.1493 27.4762C23.1381 27.4938 23.1275 27.5121 23.1175 27.5306C23.1085 27.5475 23.1 27.5643 23.0921 27.5812C23.0828 27.6012 23.074 27.6219 23.066 27.6429C23.0588 27.6614 23.0522 27.6802 23.0462 27.6991C23.0404 27.7178 23.0351 27.7366 23.0303 27.7554C23.025 27.7763 23.0204 27.7975 23.0165 27.8187C23.0125 27.8405 23.0092 27.8625 23.0067 27.8846C23.0048 27.9006 23.0033 27.9169 23.0022 27.9333C23.0007 27.9558 23 27.9782 23 28.0006C23 28.0225 23.0008 28.0445 23.0022 28.0665C23.0033 28.0831 23.0048 28.0994 23.0067 28.1157C23.0092 28.1375 23.0125 28.1595 23.0165 28.1813C23.0204 28.2025 23.025 28.2237 23.0303 28.2447C23.0351 28.2634 23.0404 28.2822 23.0462 28.3007C23.0522 28.3198 23.0588 28.3386 23.066 28.3572C23.074 28.3781 23.0828 28.3988 23.0923 28.4192C23.1 28.4357 23.1085 28.4525 23.1174 28.469C23.1275 28.4879 23.1381 28.5062 23.1494 28.5241C23.1603 28.5412 23.1718 28.5584 23.184 28.5752C23.217 28.6211 23.2544 28.6643 23.2962 28.7044L23.2285 28.6322C23.2323 28.6367 23.2362 28.6412 23.2401 28.6457L29.4131 35.6901C29.754 36.0792 30.3318 36.1054 30.7038 35.7488Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

function CustomNextArrow(props: ArrowProps) {
  return (
    <div
      className={classNames(styles.customArrow, styles.arrowNext)}
      onClick={props.onClick}
    >
      <svg
        width="55"
        height="55"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="27.5" cy="27.5" r="27.5" fill="#A20F0F" />
        <path
          d="M23.2962 20.2512C22.9243 20.6078 22.8992 21.2123 23.2401 21.6014L28.848 28L23.2401 34.3986C22.9276 34.7553 22.9227 35.2929 23.2105 35.6548L23.2962 35.7488C23.6682 36.1054 24.246 36.0792 24.5869 35.6901L30.7599 28.6457C30.7638 28.6412 30.7677 28.6367 30.7715 28.6322L30.7038 28.7044C30.7456 28.6643 30.783 28.6211 30.8161 28.5754C30.8282 28.5584 30.8397 28.5412 30.8507 28.5238C30.8619 28.5062 30.8725 28.4879 30.8825 28.4694C30.8915 28.4525 30.9 28.4357 30.9079 28.4188C30.9172 28.3988 30.926 28.3781 30.934 28.3571C30.9412 28.3386 30.9478 28.3198 30.9538 28.3009C30.9596 28.2822 30.9649 28.2634 30.9697 28.2446C30.975 28.2237 30.9796 28.2025 30.9835 28.1813C30.9875 28.1595 30.9908 28.1375 30.9933 28.1154C30.9952 28.0994 30.9967 28.0831 30.9978 28.0667C30.9993 28.0442 31 28.0218 31 27.9994C31 27.9775 30.9992 27.9555 30.9978 27.9335C30.9967 27.9169 30.9952 27.9006 30.9933 27.8843C30.9908 27.8625 30.9875 27.8405 30.9835 27.8187C30.9796 27.7975 30.975 27.7763 30.9697 27.7553C30.9649 27.7366 30.9596 27.7178 30.9538 27.6993C30.9478 27.6802 30.9412 27.6614 30.934 27.6428C30.926 27.6219 30.9172 27.6012 30.9077 27.5808C30.9 27.5643 30.8915 27.5475 30.8826 27.531C30.8725 27.5121 30.8619 27.4938 30.8506 27.4759C30.8397 27.4588 30.8282 27.4416 30.816 27.4248C30.783 27.3789 30.7456 27.3357 30.7038 27.2956L30.7715 27.3678C30.7677 27.3633 30.7638 27.3588 30.7599 27.3543L24.5869 20.3099C24.246 19.9208 23.6682 19.8946 23.2962 20.2512Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default ImageViewer;
