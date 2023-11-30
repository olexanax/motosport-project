'use client';
//components
import Link from "next/link"
import Image from "next/image";
import Hamburger from 'hamburger-react'
import { FC } from "react";
//libs
import { usePathname } from 'next/navigation'
import classNames from "classnames"
import { useState } from "react";
//styles
import styles from "./styles.module.scss"
//images
import instagramLogo from "../../../public/images/icons/instagramLogo.svg"
import arrow from "../../../public/images/icons/dropdownArr.svg"
//i18n
import { languages } from "@/app/i18n/settings"


type Props = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (arg: boolean) => void;
  lng: string;
}


const MobileMenu: FC<Props> = ({ isMobileMenuOpen, setIsMobileMenuOpen, lng }) => {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const pathname = usePathname()

  const NAV_ITEMS = [
    {
      path: "#about-Us",
      name: "About Us"
    },
    {
      path: "#couching",
      name: "Couching"
    },
    {
      path: "#news",
      name: "News"
    },
    {
      path: "#gallery",
      name: "Gallery"
    },
    {
      path: "#become-a-partner",
      name: "Become a Partner"
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
    <div className={styles.container}>
      <div className={styles.topBlock}>
        <div className={classNames(styles.langPicker)}>
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
        <Hamburger size={24} toggled={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(false)} />
      </div>
      <nav className={styles.navBlock}>
        {
          NAV_ITEMS.map(({ name, path }, i) => (
            <Link key={i} href={`/${lng}${path}`} className={classNames(styles.navItem, getClassName(path))}>
              {name}
            </Link>
          ))
        }
      </nav>
      <div className={styles.bottomBlock}>
        <Link className={styles.instLink} target="_blank" href={"https://www.instagram.com/ivan.peklin/"}>
          <Image width={24} height={24} className={styles.logo} src={instagramLogo} alt="instagram" />
        </Link>
        <Link className={styles.bottomRowText} href="tel:+491605747347">
          +491605747347
        </Link>
        <Link className={styles.bottomRowText} target="_blank" href={"mailto:ivan.peklin.enquiries@gmail.com"}>
          ivan.peklin.enquiries@gmail.com
        </Link>
      </div>
    </div>
  )
}

export default MobileMenu