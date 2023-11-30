//components
import classNames from "classnames";
import VictoriesList from "./NewsList/NewsList";
import NewsForm from "./NewsForm/NewsForm";
//libs
import { useRouter } from "next/navigation";
import Image from "next/image";
//types
import { AdminPageQuries } from '@/components/AdminPage/types';

//styles
import styles from "./index.module.scss";
import global from "@/styles/global.module.scss";
// //images
import smallPlus from "../../../../../public/images/icons/addIcon.svg";

const News = ({ newsAddNew, newsId, lang }: AdminPageQuries) => {
  const router = useRouter();
  const onAdd = () => {
    const query = new URLSearchParams();
    query.set("newsAddNew", true.toString());
    lang && query.set("lang", lang);
    query.delete("victoryId");


    router.push(`${window.location.pathname}?${query.toString()}`)
  };

  if (newsAddNew || newsId) return <NewsForm {...{ newsAddNew, newsId, lang }} />;

  return (
    <div className={styles.container}>
      <div
        onClick={onAdd}
        className={classNames(styles.addBtn)}
      >
        <Image src={smallPlus} alt="add" />
        <p className={global.text1}>Add new</p>
      </div>
      <VictoriesList {...{ newsAddNew, newsId, lang }} />
    </div>
  );
};

export default News;
