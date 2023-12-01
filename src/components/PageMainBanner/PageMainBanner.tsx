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
import { useTranslation } from "@/app/i18n";



const PageMainBanner = async ({ lng }: I18ComponentProps) => {
  const { t } = await useTranslation(lng, "translation");
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={classNames(global.pageTitle)}>
            {t("heading_tags.h1__pageBannerTitle")}
          </h1>
          <p className={global.smallTitle}>
            {t("content.pageBannerSubTitle")}
          </p>
          <Link href={`/${lng}#become-a-partner`} className={classNames(global.primaryButton, styles.btn)}>
            {t("content.BecomePartner_button")}
          </Link>
        </div>
        <LastNewsBlock {...{ lng }} />
      </div>
    </div >
  )
}

export default PageMainBanner