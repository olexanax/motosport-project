"use client";
//components
import Link from "next/link";
import Image from "next/image";
import Hamburger from "hamburger-react";
import { FC } from "react";
//libs
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useState } from "react";
import { motion } from "framer-motion";
//styles
import styles from "./styles.module.scss";
//images
import instagramLogo from "../../../public/images/icons/instagramLogo.svg";
import arrow from "../../../public/images/icons/dropdownArr.svg";
//i18n
import { languages } from "@/app/i18n/settings";
import { I18ComponentProps } from "@/types/i18NextTypes";
import { useTranslation } from "@/app/i18n/client";

interface Props extends I18ComponentProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (arg: boolean) => void;
}

const MobileMenu: FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  lng,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation(lng, "translation");

  const NAV_ITEMS = [
    {
      path: "#about-us",
      name: t("content.navigation_abotUs"),
    },
    {
      path: "#couching",
      name: t("content.navigation_couching"),
    },
    {
      path: "#news",
      name: t("content.navigation_news"),
    },
    {
      path: "#gallery",
      name: t("content.navigation_gallery"),
    },
    {
      path: "#become-a-partner",
      name: t("content.navigation_becomePartner"),
    },
  ];

  const getClassName = (path: string) => {
    if (path === "/") {
      return pathname === "/en" || pathname === "/de" || pathname === "/"
        ? styles.activeLink
        : "";
    } else if (pathname.includes(path)) {
      return styles.activeLink;
    } else return "";
  };

  return (
    <div onClick={() => setIsMobileMenuOpen(false)} className={styles.overlay}>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.topBlock}>
          <div className={classNames(styles.langPicker)}>
            <div
              onClick={() => setIsLangOpen((prev) => !prev)}
              className={classNames(styles.currLocale, styles.localeItem)}
            >
              {lng.toUpperCase()}
              <Image
                width={24}
                height={24}
                style={{
                  transform: isLangOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                src={arrow}
                alt="pick language"
              />
            </div>
            {isLangOpen && (
              <div className={styles.dropdown}>
                {languages
                  .filter((l) => lng !== l)
                  .map((loc, i) => (
                    <Link
                      href={`/${loc}/${pathname.slice(4)}`}
                      key={i}
                      className={classNames(styles.localeItem)}
                    >
                      {loc.toUpperCase()}
                    </Link>
                  ))}
              </div>
            )}
          </div>
          <Hamburger
            size={24}
            toggled={isMobileMenuOpen}
            toggle={() => setIsMobileMenuOpen(false)}
          />
        </div>
        <nav className={styles.navBlock}>
          {NAV_ITEMS.map(({ name, path }, i) => (
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              key={i}
              href={`/${lng}${path}`}
              className={classNames(styles.navItem, getClassName(path))}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className={styles.bottomBlock}>
          <Link
            className={styles.instLink}
            target="_blank"
            href={t("content.instagram_link")}
          >
            <Image
              width={24}
              height={24}
              className={styles.logo}
              src={instagramLogo}
              alt="instagram"
            />
          </Link>
          <Link
            className={styles.bottomRowText}
            href={`tel:${t("content.phone_number")}`}
          >
            {t("content.phone_number")}
          </Link>
          <Link
            className={styles.bottomRowText}
            target="_blank"
            href={`mailto::${t("content.email")}`}
          >
            {t("content.email")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
