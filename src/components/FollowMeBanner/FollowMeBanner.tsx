//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
import classNames from "classnames"
//libs
import Image from "next/image"
import Link from "next/link"
//imafes
import { baseDynamicImageURL } from "@/services/API"
const img1 = `${baseDynamicImageURL}inst_img1_8fewfcw.webp`
const img2 = `${baseDynamicImageURL}inst_img2_8fhivcwevfiuwe.webp`
const img3 = `${baseDynamicImageURL}inst_img3_8fhiuwfiuwe.webp`
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n";

const FollowMeBanner = async ({ lng }: I18ComponentProps) => {
  const { t } = await useTranslation(lng, "translation");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          {t('heading_tags.h2__FollowMeTitle')}
        </h2>
        <div className={styles.imagesContainer}>
          <Image className={styles.instImage} width={386} height={318} src={img1} alt={t("alt_tags.inst_img1_8fewfcw.webp")} />
          <Image className={styles.instImage} width={386} height={318} src={img2} alt={t("alt_tags.inst_img2_8fhivcwevfiuwe.webp")} />
          <Image className={styles.instImage} width={386} height={318} src={img3} alt={t("alt_tags.inst_img3_8fhiuwfiuwe.webp")} />
        </div>
        <Link
          href={"https://www.instagram.com/ivan.peklin/"}
          className={classNames(global.primaryButton, styles.btn)}>
          {t("content.followMe_button")}
        </Link>
      </div>
    </div>
  )
}

export default FollowMeBanner