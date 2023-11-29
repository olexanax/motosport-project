"use client"
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
import classNames from "classnames"
//libs
import { useState } from "react"
import Image from "next/image"
//images
import img1 from "../../../public/images/gallery/Rectangle34.png"
import img2 from "../../../public/images/gallery/Rectangle35.png"
import img3 from "../../../public/images/gallery/Rectangle36.png"
import img4 from "../../../public/images/gallery/Rectangle37.png"


const IMAGES = [
  img1, img2, img3, img4, img1, img2, img3, img4, img1, img2, img3, img4, img1, img2, img3, img4, img1, img2, img3, img4, img1, img2, img3, img4
]

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          Gallery
        </h2>
        <div className={styles.imagesList}>
          {
            (isOpen ? IMAGES : IMAGES.slice(0, 16)).map((img, i) => <Image className={styles.image} key={i} src={img} alt='' />)
          }
        </div>
        {!isOpen &&
          <div onClick={() => setIsOpen(true)} className={classNames(global.primaryButton, styles.btn)}>
            More
          </div>
        }
      </div>
    </div>
  )
}

export default Gallery