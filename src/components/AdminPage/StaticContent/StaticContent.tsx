import React, { useState } from "react";
import HeadlinesTable from "./Tables/HeadlinesTable/HeadlinesTable";
import ContentTable from "./Tables/ContentTable/ContentTable";
import ImagesTable from "./Tables/ImagesTable/ImagesTable";
import MetaTable from "./Tables/MetaTable/MetaTable";
import PageTablesPicker from "./PageTablesPicker/PageTablesPicker";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import Button from "@/components/ui/Button/Button";

interface StaticContentProps { }

const StaticContent: React.FC<StaticContentProps> = ({ }) => {
  const [activeTableType, setActiveTableType] = useState(
    localStorage.getItem("activeTab") || "Headlines"
  );

  const tables: {
    [key: string]: JSX.Element;
  } = {
    Headlines: <HeadlinesTable />,
    Content: <ContentTable />,
    Images: <ImagesTable />,
    Meta: <MetaTable />,
  };

  const onTableTypeClick = (tableName: string) => {
    setActiveTableType(tableName);
    localStorage.setItem("activeTab", tableName);
  };

  return (
    <div className={global.container}>
      <div className={global.content}>
        <div className={styles.head}>
          <PageTablesPicker
            activeTab={activeTableType}
            onTabClick={onTableTypeClick}
          />
          <Button>Save</Button>
        </div>
        {tables[activeTableType]}
      </div>
    </div>
  );
};

export default StaticContent;

