//styles
import styles from "./styles.module.scss";
//libs
import React from "react";
//types
import classNames from "classnames";
import { WebPagesTableType } from "../Tables/types";

const PageTablesPicker = ({
  onTabClick,
  activeTab,
}: {
  onTabClick: (arg: string) => void;
  activeTab: string;
}) => {
  return (
    <div className={styles.container}>
      {Object.entries(WebPagesTableType).map((page, i) => (
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
          {i !== Object.entries(WebPagesTableType).length - 1 && (
            <span className={styles.divider}></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PageTablesPicker;
