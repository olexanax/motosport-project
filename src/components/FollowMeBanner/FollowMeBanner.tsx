//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
import classNames from "classnames"
//libs
import Image from "next/image"
import Link from "next/link"
//imafes
import img1 from "../../../public/images/followMe/image1.jpeg"
import img2 from "../../../public/images/followMe/image2.png"
import img3 from "../../../public/images/followMe//image3.png"


const FollowMeBanner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          Follow me on Instagram!
        </h2>
        <div className={styles.imagesContainer}>
          <Image width={386} height={318} src={img1} alt="" />
          <Image width={386} height={318} src={img2} alt="" />
          <Image width={386} height={318} src={img3} alt="" />
        </div>
        <Link
          href={"https://www.instagram.com/ivan.peklin/"}
          className={classNames(global.primaryButton, styles.btn)}>
          More
        </Link>
      </div>
    </div>
  )
}

export default FollowMeBanner