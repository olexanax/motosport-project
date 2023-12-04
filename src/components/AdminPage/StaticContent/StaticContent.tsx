import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStateType } from "@/redux/types";
import {
  fetchStaticContent,
  updateStaticContent,
  generateWebpageData,
  getPending_changes_status,
} from "@/redux/slices/staticContent.slice";
import { updateStaticContentFn } from "@/components/AdminPage/types";
import { AdminPageQuries } from "@/components/AdminPage/types";
import HeadlinesTable from "./Tables/HeadlinesTable/HeadlinesTable";
import ContentTable from "./Tables/ContentTable/ContentTable";
import ImagesTable from "./Tables/ImagesTable/ImagesTable";
import MetaTable from "./Tables/MetaTable/MetaTable";
import PageTablesPicker from "./PageTablesPicker/PageTablesPicker";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import Button from "@/components/ui/Button/Button";
import DeploymentStatusBar from "../DeploymentStatusBar/DeploymentStatusBar";

interface StaticContentProps extends AdminPageQuries {}

const StaticContent: React.FC<StaticContentProps> = ({ lang }) => {
  const [activeTableType, setActiveTableType] = useState(
    localStorage.getItem("activeTab") || "Headlines"
  );
  const staticContent = useSelector(
    (state: RootStateType) => state.staticContent.staticContent
  );
  const pending_changes = useSelector(
    (state: RootStateType) => state.staticContent.pending_changes
  );
  const fetchStaticContentStatus = useSelector(
    (state: RootStateType) => state.staticContent.fetchStaticContentStatus
  );
  const generateWebpageDataStatus = useSelector(
    (state: RootStateType) => state.staticContent.generateWebpageDataStatus
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStaticContent());
    dispatch(getPending_changes_status());
  }, []);

  const currData = staticContent.find(
    (item) => item.language.toUpperCase() === lang?.toUpperCase()
  );

  const onTableTypeClick = (tableName: string) => {
    setActiveTableType(tableName);
    localStorage.setItem("activeTab", tableName);
  };

  const onTextContentUpdate: updateStaticContentFn = (data) => {
    if (currData) {
      dispatch(
        updateStaticContent({
          id: currData.id,
          data,
        })
      );
    }
  };

  const onSave = () => {
    dispatch(generateWebpageData()).then(() => setUpdateMoment());
  };
  const saveButtonValue =
    generateWebpageDataStatus === "loading"
      ? "Loading..."
      : generateWebpageDataStatus === "error"
      ? "error"
      : "Save";

  const setUpdateMoment = () => {
    localStorage.setItem("updateMoment", new Date().toISOString());
  };

  const tables: {
    [key: string]: JSX.Element;
  } = {
    Headlines: (
      <HeadlinesTable
        lang={lang}
        activeTableType={activeTableType}
        onUpdate={onTextContentUpdate}
        data={currData?.heading_tags || {}}
      />
    ),
    Content: (
      <ContentTable
        lang={lang}
        activeTableType={activeTableType}
        onUpdate={onTextContentUpdate}
        data={currData?.content || {}}
      />
    ),
    Images: <ImagesTable activeTableType={activeTableType} />,
    Meta: (
      <MetaTable
        lang={lang}
        activeTableType={activeTableType}
        onUpdate={onTextContentUpdate}
        data={currData?.meta_tags || {}}
      />
    ),
  };

  return (
    <div className={global.container}>
      <div className={global.content}>
        <div className={styles.head}>
          <PageTablesPicker
            activeTab={activeTableType}
            onTabClick={onTableTypeClick}
          />
          <div className={styles.headStatus}>
            <DeploymentStatusBar />
            {pending_changes && (
              <Button onClick={() => onSave()}>{saveButtonValue}</Button>
            )}
          </div>
        </div>
        {tables[activeTableType]}
      </div>
    </div>
  );
};

export default StaticContent;
