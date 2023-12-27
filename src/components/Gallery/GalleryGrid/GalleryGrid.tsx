"use client";
//libs
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
import Image from "next/image";
//components
import { GalleryPhoto } from "@/actions/get-galery";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import GalleryCard from "../GalleryCard/GalleryCard";


interface GalleryGridProps {
  images: GalleryPhoto[] | undefined;
  moreButton: string
}
const GalleryGrid: React.FC<GalleryGridProps> = ({ images, moreButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openImageIndex, setOpenImageIndex] = useState<null | number>(0);
  const [firstMount, setFirstMount] = useState<boolean>(false);

  //we have bug in ImageViewer => splidejs : on first mount current slide was images[images.length - 1], so this code fix this problrm
  useEffect(() => {
    setFirstMount(true)
    setTimeout(() => {
      setFirstMount(false)
    }, 1000)
  }, [])

  return (
    <>
      {images && !!images.length && (
        <>
          <div className={styles.imagesList}>
            {(isOpen ? images : images.slice(0, 12)).map(
              (img, i) => <GalleryCard
                onClick={() => {
                  setIsModalOpen(true)
                  setOpenImageIndex(i)
                }}
                image={img.image}
                id={img.id}
                key={img.id} />)}
          </div>
          {!isOpen && images.length > 16 && (
            <div
              onClick={() => setIsOpen(true)}
              className={classNames(global.primaryButton, styles.btn)}
            >
              {moreButton}
            </div>
          )}
          {
            (isModalOpen && openImageIndex !== null) || (firstMount) ?
              <ImageViewer
                images={images}
                onClose={() => setIsModalOpen(false)}
                isModalOpen={isModalOpen}
                startFrom={openImageIndex || 0}
                firstMount={firstMount}
              /> : null
          }
        </>
      )}
    </>
  );
};

export default GalleryGrid;
