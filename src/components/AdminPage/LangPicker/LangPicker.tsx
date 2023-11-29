//styles
import styles from "./index.module.scss"
//libs
import React from "react"
//types
import { LangsTypeEnum } from "@/components/AdminPage/types/index"
import classNames from "classnames"




const LangPicker = ({ onTabClick, activeTab }: { onTabClick: (arg: LangsTypeEnum) => void, activeTab: LangsTypeEnum }) => {

  return (
    <div className={styles.container}>
      {
        Object.entries(LangsTypeEnum).map((page, i) => (
          <React.Fragment key={i}>
            <div className={classNames(styles.tab, activeTab === page[1] ? styles.activeTab : '')} onClick={() => onTabClick(page[1])} >{page[1]}</div>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default LangPicker