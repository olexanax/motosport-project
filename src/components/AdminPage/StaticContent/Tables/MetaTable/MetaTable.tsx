import { useEffect } from "react";
//types
//redux

//styles
import styles from "./styles.module.scss";
import TableRow from "./TableRow/TableRow";

const MetaTable = () => {
  const loading = true ? <p className={styles.message}>Loading...</p> : null;
  const error = false ? <p className={styles.message}>Error</p> : null;

  const onUpdate = (
    value: string,
    keyName: "meta_description" | "meta_title"
  ) => {
    // if (page) {
    //   dispatch(
    //     updateWebPage({
    //       id: page.id,
    //       data: {
    //         meta_tags: {
    //           [keyName]: value,
    //         },
    //       },
    //     })
    //   );
    // }
  };

  return (
    <ul className={styles.table}>
      <li className={styles.titleRow}>
        <p>Meta Teg</p>
        <p>Content</p>
        <p>Word Count</p>
      </li>
      {true && (
        <TableRow
          keyName="meta_title"
          value={"test"}
          onUpdate={onUpdate}
        />
      )}
      {true && (
        <TableRow
          keyName="meta_description"
          value={"test"}
          onUpdate={onUpdate}
        />
      )}
      {false && <p className={styles.message}>Page not found</p>}
      {/* {loading}  */}
      {/* {error} */}
    </ul>
  );
};

export default MetaTable;
