"use client"
//types
import { Metadata } from 'next';
//libs
"use client"
import classNames from 'classnames';
import { ReactNode, useState, useEffect } from 'react';
//components
import PagePicker from '../PagePicker/PagePicker';
import LangPicker from '../LangPicker/LangPicker';
//styles
import global from '@/styles/global.module.scss'
import styles from './styles.module.scss'
//types
import { IAdminPagesType, LangsTypeEnum } from "@/components/AdminPage/types/index"
//components
import Gallery from '../PageContent/Gallery';

const content: Record<IAdminPagesType, ReactNode> = {
  // Тут ви можете визначити значення для кожного ключа з IAdminPagesType
  // Наприклад:
  [IAdminPagesType.Gallery]: <Gallery />,
  [IAdminPagesType['About Me']]: <p>TEST</p>,
  [IAdminPagesType.News]: <p>TEST</p>,
  [IAdminPagesType.Victories]: <p>TEST</p>,
  [IAdminPagesType['Static Info']]: <p>TEST</p>,

};



const ClientWrapper = () => {
  const [currTable, setCurrTable] = useState<IAdminPagesType>(IAdminPagesType['Gallery'])
  const [currLang, setCurrLang] = useState<LangsTypeEnum>(LangsTypeEnum['en'])

  useEffect(() => {
    localStorage.getItem('currTable') && setCurrTable(localStorage.getItem('currTable') as IAdminPagesType)
    localStorage.getItem('currLang') && setCurrLang(localStorage.getItem('currLang') as LangsTypeEnum)
  }, [])

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
        {
          content[currTable]
        }
      </div>
    </div>
  )
}

export default ClientWrapper
