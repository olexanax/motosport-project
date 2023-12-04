"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { GalleryPhoto } from "@/actions/get-galery";

interface GalleryGridProps {
  images: GalleryPhoto[] | undefined;
  moreButton: string
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, moreButton }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {images && !!images.length && (
        <>
          <div className={styles.imagesList}>
            {(isOpen ? images : images.slice(0, 16)).map(
              (img) =>
                img.image && (
                  <Image
                    className={styles.image}
                    width={272}
                    quality={100}
                    height={200}
                    key={img.id}
                    src={img.image}
                    alt=""
                  />
                )
            )}
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
