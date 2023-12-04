import { FC } from "react";
//types
import { updateStaticContentFn } from "@/components/AdminPage/types";
//styles
import styles from "./styles.module.scss";
import TableRow from "./TableRow/TableRow";
//types
import { AdminPageQuries } from "@/components/AdminPage/types";

interface Props extends AdminPageQuries {
  data: { [key: string]: string }
  onUpdate: updateStaticContentFn,
  activeTableType: string
}


const MetaTable: FC<Props> = ({ data, activeTableType, onUpdate, lang }) => {


  return (
    <ul className={styles.table}>
      <li className={styles.titleRow}>
        <p>Meta Teg</p>
        <p>Content</p>
      </li>
      {
        Object.entries(data).map((headine, i) => (
          <TableRow lang={lang} activeTableType={activeTableType} key={i} onUpdate={(data: [string, string]) => {
            onUpdate({
              heading_tags: {},
              content: {},
              meta_tags: {
                [data[0]]: data[1]
              }
            })
          }} data={headine} />
        ))
      }
      {!Object.entries(data).length && (
        <p className={styles.message}>List are empty</p>
      )}
    </ul>
  );
};

export default MetaTable;
