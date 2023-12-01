import styles from "./styles.module.scss"
//components
import Image from "next/image"
import Link from "next/link"
//images
import logo from "../../../public/images/icons/logo.svg"
import instagramLogo from "../../../public/images/icons/instagramLogo.svg"
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n";



const Footer = async ({ lng }: I18ComponentProps) => {
  const { t } = await useTranslation(lng, "translation");

  const MENU_ITEMS = [
    {
      path: "#about-us",
      name: t("content.navigation_abotUs")
    },
    {
      path: "#couching",
      name: t("content.navigation_couching")
    },
    {
      path: "#news",
      name: t("content.navigation_news")
    },
    {
      path: "#gallery",
      name: t("content.navigation_gallery")
    },
    {
      path: "#become-a-partner",
      name: t("content.navigation_becomePartner")
    }
  ]

  return (
    <footer
      className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topRow}>
          <Image width={202} height={17} className={styles.logo} src={logo} alt="logo" />
          <Link className={styles.instLink} target="_blank" href={"https://www.instagram.com/ivan.peklin/"}>
            <Image width={24} height={24} className={styles.logo} src={instagramLogo} alt="instagram" />
          </Link>
        </div>
        <nav className={styles.nav}>
          {
            MENU_ITEMS.map((item, i) => (
              <Link className={styles.navItem} key={i} href={item.path}>
                {item.name}
              </Link>
            ))
          }
        </nav>
        <div className={styles.bottomBlock}>
          <Link className={styles.phoneLink} href="tel:+491605747347">+491605747347</Link>
          <div className={styles.textRow}>
            <p className={styles.bottomRowText}>
              Copyright © 2023 Moto. All rights reserved.
            </p>
            <Link className={styles.bottomRowText} target="_blank" href={"mailto:ivan.peklin.enquiries@gmail.com"}>
              ivan.peklin.enquiries@gmail.com
            </Link>
          </div>
        </div>
        {
          //MOBILE BLOCKs
        }
        <div className={styles.mobileContactsBlock}>
          <Link className={styles.mobileinstLink} target="_blank" href={t("content.instagram_link")}>
            <Image width={24} height={24} className={styles.logo} src={instagramLogo} alt="instagram" />
          </Link>
          <Link className={styles.phoneLink} href={`tel:${t("content.phone_number")}`}>
            {t("content.phone_number")}
          </Link>
          <Link className={styles.bottomRowText} target="_blank" href={`mailto::${t("content.email")}`}>
            {t("content.email")}
          </Link>
        </div>
        <div className={styles.mobileBottomBlock}>
          <p className={styles.bottomRowText}>
            Copyright © 2023 Moto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer