"use client"
//components
import Link from "next/link"
//libs
import { usePathname } from 'next/navigation'
import classNames from "classnames"
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"



const DesctopMenu = ({ lng }: { lng: string }) => {
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
    <nav className={styles.content}>
      {
        NAV_ITEMS.map(({ path, name }, i) => (
          <Link className={classNames(global.Body3Medium, getClassName(path))} key={i} href={`/${path}`}>{name}</Link>
        ))
      }
    </nav>
  )
}

export default DesctopMenu