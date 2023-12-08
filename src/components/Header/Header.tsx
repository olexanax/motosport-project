"use client"
//components
import Image from "next/image"
import Link from "next/link"
import DesctopMenu from "../DesctopMenu/DesctopMenu"
import MobileMenu from "../MobileMenu/MobileMenu"
import Hamburger from 'hamburger-react'
//libs
import { useEffect, useState } from "react"
import classNames from "classnames"
import { usePathname } from "next/navigation"
import lockScroll from "@/utils/lockScroll"
import unlockScroll from "@/utils/unlockScroll"

//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//images
import logo from "../../../public/images/icons/logo.svg"
import arrow from "../../../public/images/icons/dropdownArr.svg"
//i18n
import { languages } from "@/app/i18n/settings"
import { I18ComponentProps } from "@/types/i18NextTypes"

function Header({ lng }: I18ComponentProps) {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    if (isMobileMenuOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    unlockScroll
    setIsMobileMenuOpen(false)
  }, [pathname])


  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.logoLink} href={`/`}>
          <Image priority width={202} height={17} src={logo} alt="logo" />
        </Link>
        <div className={styles.DesctopMenuContainer}>
          <DesctopMenu lng={lng} />
        </div>
        <div className={styles.mopbileMenuToggler}>
          {
            !isMobileMenuOpen &&
            <Hamburger size={24} toggled={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(prev => !prev)} />
          }
        </div>
        <div className={classNames(global.Body3Medium, styles.langPicker)}>
          <div
            onClick={() => setIsLangOpen(prev => !prev)}
            className={classNames(styles.currLocale, styles.localeItem)}>
            {lng.toUpperCase()}
            <Image width={24} height={24} style={{ transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} src={arrow}
              alt="pick language" />
          </div>
          {isLangOpen && <div className={styles.dropdown}>
            {languages.filter((l) => lng !== l).map((loc, i) =>
              <Link
                href={`/${loc}/${pathname.slice(4)}`}
                key={i}
                className={classNames(styles.localeItem)}
              >{loc.toUpperCase()}
              </Link>)}
          </div>}
        </div>
      </div>
      {isMobileMenuOpen && <MobileMenu {...{ isMobileMenuOpen, setIsMobileMenuOpen }} lng={lng} />}
    </header>
  )
}

export default Header