"use client"
//components
import Link from "next/link"
//libs
import { usePathname, useRouter } from 'next/navigation'
import classNames from "classnames"
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//i18n
import { languages } from "@/app/i18n/settings"
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n/client";


const DesctopMenu = ({ lng }: I18ComponentProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation(lng, "translation");


  const NAV_ITEMS = [
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
  const getClassName = (path: string) => {
    if (path === "/") {
      return pathname === "/en" || pathname === "/de" || pathname === "/" ? styles.activeLink : ''
    } else if (pathname.includes(path)) {
      return styles.activeLink
    } else return ''
  }


  return (
    <nav className={styles.content}>
      {
        NAV_ITEMS.map(({ path, name }, i) => (
          <Link
            className={classNames(global.Body3Medium, getClassName(path))}
            key={i}
            href={`/${lng}/${path}`}>{name}</Link>
        ))
      }
    </nav>
  )
}

export default DesctopMenu