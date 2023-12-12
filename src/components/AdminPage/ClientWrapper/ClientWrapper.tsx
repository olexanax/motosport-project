"use client";
//types
import { AdminPageQuries } from "@/components/AdminPage/types";
//libs
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { ReactNode, useState, useEffect } from "react";
//styles
import global from "@/styles/global.module.scss";
import styles from "./styles.module.scss";
//types
import {
  IAdminPagesType,
  LangsTypeEnum,
} from "@/components/AdminPage/types/index";
//components
import PagePicker from "../PagePicker/PagePicker";
import LangPicker from "../LangPicker/LangPicker";
import Gallery from "../PageContent/Gallery";
import AboutMe from "@/components/AdminPage/PageContent/AboutMe";
import Partners from "@/components/AdminPage/PageContent/Partners";
import Victories from "@/components/AdminPage/PageContent/Victories";
import MyStory from "@/components/AdminPage/PageContent/MyStory";
import StaticContent from "../StaticContent/StaticContent";
import News from "../PageContent/News";
import withAuth from "@/services/AuthWrapper";

const ClientWrapper = ({
  victoryId,
  victoryAddNew,
  lang,
  myStoryAddNew,
  myStoryId,
  newsAddNew,
  newsId,
}: AdminPageQuries) => {
  const [currTable, setCurrTable] = useState<IAdminPagesType>(
    IAdminPagesType["Gallery"]
  );
  const [currLang, setCurrLang] = useState<LangsTypeEnum>(LangsTypeEnum["en"]);
  const content: Record<IAdminPagesType, ReactNode> = {
    [IAdminPagesType.Gallery]: <Gallery />,
    [IAdminPagesType["About Me"]]: <AboutMe />,
    [IAdminPagesType.News]: <News {...{ newsAddNew, newsId, lang }} />,
    [IAdminPagesType.Victories]: (
      <Victories {...{ victoryAddNew, victoryId, lang }} />
    ),
    [IAdminPagesType["Static Info"]]: <StaticContent lang={lang} />,
    [IAdminPagesType.Partners]: <Partners />,
    [IAdminPagesType["My story"]]: (
      <MyStory {...{ myStoryAddNew, myStoryId, lang }} />
    ),
  };

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    localStorage.getItem("currTable") &&
      setCurrTable(localStorage.getItem("currTable") as IAdminPagesType);
    localStorage.getItem("currLang") &&
      setCurrLang(localStorage.getItem("currLang") as LangsTypeEnum);
    const query = new URLSearchParams();
    query.set("lang", localStorage.getItem("currLang") || currLang);
    victoryAddNew && query.set("victoryAddNew", victoryAddNew.toString());
    victoryId && query.set("victoryId", victoryId);
    newsAddNew && query.set("newsAddNew", newsAddNew.toString());
    newsId && query.set("newsId", newsId);
    myStoryAddNew && query.set("myStoryAddNew", myStoryAddNew.toString());
    myStoryId && query.set("myStoryId", myStoryId);
    router.push(`${pathname}?${query.toString()}`);
  }, []);

  const onTableClick = (arg: IAdminPagesType) => {
    localStorage.setItem("currTable", arg);
    const query = new URLSearchParams();
    query.delete("victoryAddNew");
    query.delete("victoryId");
    lang && query.set("lang", lang);
    router.push(`${pathname}?${query.toString()}`);
    setCurrTable(arg);
  };
  const onLangClick = (arg: LangsTypeEnum) => {
    localStorage.setItem("currLang", arg);
    setCurrLang(arg);
    const query = new URLSearchParams();
    victoryId && query.set("victoryId", victoryId);
    victoryAddNew && query.set("victoryAddNew", victoryAddNew.toString());
    query.set("lang", arg);
    router.push(`${pathname}?${query.toString()}`);
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default withAuth(ClientWrapper);
// export default ClientWrapper;

