
import React, { useEffect, useState, FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import ImageViewer from "@/components/ImageViewer/ImageViewer";


const GalleryCard: FC<{ image: string, id: number, }> = ({ image, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.imageWrapper}
      key={id}
      onClick={() => {
        if (!isModalOpen) setIsModalOpen(true)
      }
      }>
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
      {
        isModalOpen ?
          <ImageViewer
            onClose={() => setIsModalOpen(false)}
            image={image}
            isModalOpen={isModalOpen}
          /> : null
      }
    </div >
  )
}

export default GalleryCard