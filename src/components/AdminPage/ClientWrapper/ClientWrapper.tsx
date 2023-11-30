"use client";

//types
import { Metadata } from "next";
//libs
import classNames from "classnames";
import { useEffect, useState } from "react";
//components
import PagePicker from "../PagePicker/PagePicker";
import LangPicker from "../LangPicker/LangPicker";
//styles
import global from "@/styles/global.module.scss";
import styles from "./styles.module.scss";
//types
import {
  IAdminPagesType,
  LangsTypeEnum,
} from "@/components/AdminPage/types/index";
import StaticContent from "../StaticContent/StaticContent";

const ClientWrapper = () => {
  const [currTable, setCurrTable] = useState<IAdminPagesType>(
    IAdminPagesType["About Me"]
  );
  const [currLang, setCurrLang] = useState<LangsTypeEnum>(LangsTypeEnum["en"]);

  const onTableClick = (arg: IAdminPagesType) => {
    localStorage.setItem("currTable", arg);
    setCurrTable(arg);
  };
  const onLangClick = (arg: LangsTypeEnum) => {
    localStorage.setItem("currLang", arg);
    setCurrLang(arg);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrLang(localStorage.getItem("currLang") as LangsTypeEnum);
      setCurrTable(localStorage.getItem("currTable") as IAdminPagesType);
    }
  }, []);

  return (
    <div id="about-us" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topRow}>
          <h1 className={classNames(global.pageTitle, styles.title)}>
            {currTable}
          </h1>
          <LangPicker {...{ activeTab: currLang, onTabClick: onLangClick }} />
        </div>
        <PagePicker {...{ activeTab: currTable, onTabClick: onTableClick }} />
        <StaticContent/>
      </div>
    </div>
  );
};

export default ClientWrapper;
