"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { GalleryPhoto } from "@/actions/get-galery";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import GalleryCard from "../GalleryCard/GalleryCard";


interface GalleryGridProps {
  images: GalleryPhoto[] | undefined;
  moreButton: string
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, moreButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log({ setIsOpen })
  return (
    <>
      {images && !!images.length && (
        <>
          <div className={styles.imagesList}>
            {(isOpen ? images : images.slice(0, 16)).map(
              (img) => <GalleryCard image={img.image} id={img.id} key={img.id} />)}
          </div>
          {!isOpen && images.length && 16 && (
            <div
              onClick={() => setIsOpen(true)}
              className={classNames(global.primaryButton, styles.btn)}
            >
              {moreButton}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GalleryGrid;
