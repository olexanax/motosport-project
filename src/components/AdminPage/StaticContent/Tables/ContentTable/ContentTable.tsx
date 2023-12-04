import { FC } from "react";
//types
import { updateStaticContentFn } from "@/components/AdminPage/types";
//styles
import styles from "./styles.module.scss";
import TableRow from "./TableRow/TableRow";
//types
import { AdminPageQuries } from "@/components/AdminPage/types";


interface Props extends AdminPageQuries {
  data: { [key: string]: string },
  onUpdate: updateStaticContentFn,
  activeTableType: string
}

const ContentTable: FC<Props> = ({ data, onUpdate, activeTableType, lang }) => {

  return (
    <ul className={styles.table}>
      <li className={styles.titleRow}>
        <p>Body</p>
        <p></p>
      </li>
      {
        Object.entries(data).map((headine, i) => (
          <TableRow lang={lang} key={i} activeTableType={activeTableType} onUpdate={(data: [string, string]) => {
            onUpdate({
              heading_tags: {},
              content: {
                [data[0]]: data[1]
              },
              meta_tags: {}
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

export default ContentTable;
