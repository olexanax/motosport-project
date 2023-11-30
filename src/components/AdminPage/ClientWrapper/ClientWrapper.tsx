"use client"
//types
import { AdminPageQuries } from '@/components/AdminPage/types';
//libs
import { useRouter } from 'next/navigation';
import classNames from "classnames";
import { ReactNode, useState, useEffect } from "react";
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
//components
import Gallery from '../PageContent/Gallery';
import AboutMe from '@/components/AdminPage/PageContent/AboutMe';
import Partners from '@/components/AdminPage/PageContent/Partners';
import Victories from '@/components/AdminPage/PageContent/Victories';
import MyStory from '@/components/AdminPage/PageContent/MyStory';
import StaticContent from "../StaticContent/StaticContent";


const ClientWrapper = ({ victoryId, victoryAddNew, lang, myStoryAddNew, myStoryId }: AdminPageQuries) => {
  const [currTable, setCurrTable] = useState<IAdminPagesType>(IAdminPagesType['Gallery'])
  const [currLang, setCurrLang] = useState<LangsTypeEnum>(LangsTypeEnum['en'])


  const content: Record<IAdminPagesType, ReactNode> = {
    [IAdminPagesType.Gallery]: <Gallery />,
    [IAdminPagesType["About Me"]]: <AboutMe />,
    [IAdminPagesType.News]: <p>TEST</p>,
    [IAdminPagesType.Victories]: <Victories {...{ victoryAddNew, victoryId, lang }} />,
    [IAdminPagesType["Static Info"]]: <StaticContent />,
    [IAdminPagesType.Partners]: <Partners />,
    [IAdminPagesType['My story']]: <MyStory {...{ victoryAddNew, victoryId, lang }} />
  };

  const router = useRouter();

  useEffect(() => {
    localStorage.getItem('currTable') && setCurrTable(localStorage.getItem('currTable') as IAdminPagesType)
    localStorage.getItem('currLang') && setCurrLang(localStorage.getItem('currLang') as LangsTypeEnum)
    const query = new URLSearchParams();
    query.set("lang", localStorage.getItem('currLang') || currLang);
    router.push(`${window.location.pathname}?${query.toString()}`)
  }, [])

  const onTableClick = (arg: IAdminPagesType) => {
    localStorage.setItem('currTable', arg)
    const query = new URLSearchParams();
    query.delete("victoryAddNew");
    query.delete("victoryId");
    lang && query.set("lang", lang);
    router.push(`${window.location.pathname}?${query.toString()}`)
    setCurrTable(arg)
  }
  const onLangClick = (arg: LangsTypeEnum) => {
    localStorage.setItem('currLang', arg)
    setCurrLang(arg)
    const query = new URLSearchParams();
    victoryId && query.set("victoryId", victoryId)
    victoryAddNew && query.set("victoryAddNew", victoryAddNew.toString())
    query.set("lang", arg)
    router.push(`${window.location.pathname}?${query.toString()}`)
  }


  useEffect(() => {
    localStorage.getItem("currTable") &&
      setCurrTable(localStorage.getItem("currTable") as IAdminPagesType);
    localStorage.getItem("currLang") &&
      setCurrLang(localStorage.getItem("currLang") as LangsTypeEnum);
  }, []);


  return (
    <div className={styles.container} >
      <div className={styles.content}>
        <div className={styles.topRow}>
          <h1 className={classNames(global.pageTitle, styles.title)}>
            {currTable}
          </h1>
          <LangPicker {...{ activeTab: currLang, onTabClick: onLangClick }} />
        </div>
        <PagePicker {...{ activeTab: currTable, onTabClick: onTableClick }} />
        {content[currTable]}
      </div>
    </div >
  );
}

export default ClientWrapper
