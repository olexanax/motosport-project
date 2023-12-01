//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//libs
import classNames from "classnames"
//components
import LastNewsBlock from "../LastNewsBlock/LastNewsBlock"
import Link from "next/link"
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"



const PageMainBanner = ({ lng }: I18ComponentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={classNames(global.pageTitle)}>
            Ivan Peklin
          </h1>
          <p className={styles.smallTitle}>
            “Racing is life. Anything before or after is just waiting.” – Steve McQueen
          </p>
          <Link href={`/${lng}#become-a-partner`} className={classNames(global.primaryButton, styles.btn)}>
            Become a Partner
          </Link>
        </div>
        <LastNewsBlock />
      </div>
    </div >
  )
}

export default PageMainBanner