//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
//libs
import { useState } from "react";
import Image from "next/image";
//images
import img1 from "../../../public/images/gallery/Rectangle34.png";
import img2 from "../../../public/images/gallery/Rectangle35.png";
import img3 from "../../../public/images/gallery/Rectangle36.png";
import img4 from "../../../public/images/gallery/Rectangle37.png";
import GalleryGrid from "./GalleryGrid/GalleryGrid";
import { getGallery } from "@/actions/get-galery";

const Gallery = async () => {
  const images = await getGallery();

  return (
    <div id="gallery" className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          Gallery
        </h2>
        <GalleryGrid images={images} />
      </div>
    </div>
  );
};

export default Gallery;
