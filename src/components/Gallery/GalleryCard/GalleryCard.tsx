
import React, { useEffect, useState, FC } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Image from "next/image";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import { number } from "zod";
import { motion } from 'framer-motion';


interface Props {
  image: string
  id: number,
  onClick: () => void
}

const GalleryCard: FC<Props> = ({ image, id, onClick }) => {


  const variants = {
    hidden: { opacity: 0, scale: 0.2 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={{ once: true, amount: 0.8 }}
      onClick={onClick}
      className={classNames(styles.imageWrapper)}>
      {
        image && (
          <Image
            className={styles.image}
            width={272}
            quality={100}
            height={200}
            key={id}
            src={image}
            alt=""
          />
        )
      }

    </motion.div >
  )
}

export default GalleryCard