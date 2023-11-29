"use client"
//types
import { Metadata } from 'next';
//libs
"use client"
import classNames from 'classnames';
import { useState } from 'react';
//components
import PagePicker from '../PagePicker/PagePicker';
import LangPicker from '../LangPicker/LangPicker';
//styles
import global from '@/styles/global.module.scss'
import styles from './styles.module.scss'
//types
import { IAdminPagesType, LangsTypeEnum } from "@/components/AdminPage/types/index"


const ClientWrapper = () => {
  const [currTable, setCurrTable] = useState<IAdminPagesType>(
    typeof window !== "undefined" && localStorage.getItem('currTable') as IAdminPagesType || IAdminPagesType['About Me'])
  const [currLang, setCurrLang] = useState<LangsTypeEnum>(
    typeof window !== "undefined" && localStorage.getItem('currLang') as LangsTypeEnum || LangsTypeEnum['en'])

  const onTableClick = (arg: IAdminPagesType) => {
    localStorage.setItem('currTable', arg)
    setCurrTable(arg)
  }
  const onLangClick = (arg: LangsTypeEnum) => {
    localStorage.setItem('currLang', arg)
    setCurrLang(arg)
  }
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
      </div>
    </div>
  )
}

export default ClientWrapper
