//components
import classNames from "classnames";
import VictoriesList from "./VictoriesList/VictoriesList";
import VicoriesForm from "./VicoriesForm/VicoriesForm";
//libs
import { useRouter } from "next/navigation";
import Image from "next/image";
//types
import { AdminPageQuries } from "@/components/AdminPage/types";

//styles
import styles from "./index.module.scss";
import global from "@/styles/global.module.scss";
// //images
import smallPlus from "../../../../../public/images/icons/addIcon.svg";

const Victories = ({ victoryAddNew, victoryId, lang }: AdminPageQuries) => {
  const router = useRouter();
  const onAdd = () => {
    const query = new URLSearchParams();
    query.set("victoryAddNew", true.toString());
    lang && query.set("lang", lang);
    query.delete("victoryId");

    router.push(`${window.location.pathname}?${query.toString()}`);
  };

  if (victoryId || victoryAddNew)
    return <VicoriesForm {...{ victoryAddNew, victoryId, lang }} />;

  return (
    <div className={styles.container}>
      <div onClick={onAdd} className={classNames(styles.addBtn)}>
        <Image src={smallPlus} alt="add" />
        <p className={global.text1}>Add new</p>
      </div>
      <VictoriesList {...{ victoryAddNew, victoryId, lang }} />
    </div>
  );
};

export default Victories;
