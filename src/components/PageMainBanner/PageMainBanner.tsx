//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//libs
import classNames from "classnames"
//components
import LastNewsBlock from "../LastNewsBlock/LastNewsBlock"




const PageMainBanner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={classNames(global.pageTitle)}>
            Ivan Peklin
          </h1>
          <p className={global.smallTitle}>
            “Racing is life. Anything before or after is just waiting.” – Steve McQueen
          </p>
          <div className={classNames(global.primaryButton, styles.btn)}>
            Become a Partner
          </div>
        </div>
        <LastNewsBlock />
      </div>
    </div >
  )
}

export default PageMainBanner