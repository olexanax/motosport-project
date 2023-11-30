"use client"

//styles
import styles from "./index.module.scss";
//libs
import React from "react";
//types
import { IAdminPagesType } from "@/components/AdminPage/types/index";
import classNames from "classnames";

const PagePicker = ({
  onTabClick,
  activeTab,
}: {
  onTabClick: (arg: IAdminPagesType) => void;
  activeTab: IAdminPagesType;
}) => {
  return (
    <div className={styles.container}>
      {Object.entries(IAdminPagesType).map((page, i) => (
        <React.Fragment key={i}>
          <div
            className={classNames(
              styles.tab,
              activeTab === page[1] ? styles.activeTab : ""
            )}
            onClick={() => onTabClick(page[1])}
          >
            {page[1]}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PagePicker;
