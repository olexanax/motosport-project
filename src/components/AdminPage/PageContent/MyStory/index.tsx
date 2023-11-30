//components
import classNames from "classnames";
import MyStoryList from "./MyStoryList/MyStoryList";
import MyStoryForm from "./MyStoryForm/MyStoryForm";
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

const MyStory = ({ lang, myStoryAddNew, myStoryId }: AdminPageQuries) => {
  const router = useRouter();
  const onAdd = () => {
    const query = new URLSearchParams();
    query.set("myStoryAddNew", true.toString());
    lang && query.set("lang", lang);
    query.delete("myStoryId");

    router.push(`${window.location.pathname}?${query.toString()}`)
  };

  if (myStoryId || myStoryAddNew) return <MyStoryForm {...{ myStoryAddNew, myStoryId, lang }} />;

  return (
    <div className={styles.container}>
      <div
        onClick={onAdd}
        className={classNames(styles.addBtn)}
      >
        <Image src={smallPlus} alt="add" />
        <p className={global.text1}>Add new</p>
      </div>
      <MyStoryList {...{ myStoryAddNew, myStoryId, lang }} />
    </div>
  );
};

export default MyStory;
