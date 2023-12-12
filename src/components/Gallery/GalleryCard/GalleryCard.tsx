
import React, { useEffect, useState, FC } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Image from "next/image";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import { number } from "zod";

interface Props {
  image: string
  id: number,
  onClick: () => void
}

const GalleryCard: FC<Props> = ({ image, id, onClick }) => {


  return (
    <div onClick={onClick} className={classNames(styles.imageWrapper)}
      key={id}>
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

    </div >
  )
}

export default GalleryCard