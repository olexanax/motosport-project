//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
import classNames from "classnames"
//components
import Image from "next/image"
//images
import img1 from "../../../public/images/partners/AC-logo.png"
import img2 from "../../../public/images/partners/Group 77.png"
import img3 from "../../../public/images/partners/Group.png"
import img4 from "../../../public/images/partners/Group75.png"
import img5 from "../../../public/images/partners/huragan.svg"
import img6 from "../../../public/images/partners/simhub.png"
import img7 from "../../../public/images/partners/logo7.svg"

const LOGOS = [img6, img7, img5, img4, img3, img2, img1]



const OurPartners = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          Our Partners
        </h2>
        <div className={styles.logoContainer}>
          {
            LOGOS.map((logo, i) => (
              <div key={i} className={styles.imageWrapper}>
                <Image className={styles.image} src={logo} alt='' />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default OurPartners