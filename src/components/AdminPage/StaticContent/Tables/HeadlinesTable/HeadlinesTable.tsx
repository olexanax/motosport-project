import { useEffect } from "react";
//types
//styles
import styles from "./styles.module.scss";
import TableRow from "./TableRow/TableRow";

const HeadlinesTable = () => {
  const loading = false ? <p className={styles.message}>Loading...</p> : null;
  const error = false ? <p className={styles.message}>Error</p> : null;

  const headlines = {
    H1__Title: "Headline 1",
    H2__Title: "Headline 1",
    H3__Title: "Headline 1",
    H4__Title: "Headline 1",
    H5__Title: "Headline 1",
  };

  const onUpdate = (data: [string, string]) => {
    // if (currentWebPage) {
    //   dispatch(
    //     updateWebPage({
    //       id: currentWebPage?.id,
    //       data: {
    //         heading_tags: {
    //           [data[0]]: data[1],
    //         },
    //       },
    //     })
    //   );
    // }
  };

  return (
    <ul className={styles.table}>
      <li className={styles.titleRow}>
        <p>Header Tags</p>
        <p>Name</p>
        <p>Text</p>
      </li>

      {true ? (
        Object.entries(headlines).map((headine, i) => (
          <TableRow key={i} onUpdate={onUpdate} data={headine} />
        ))
      ) : (
        <p className={styles.message}>Page not found</p>
      )}
      {true && !Object.entries(headlines).length && (
        <p className={styles.message}>List are empty</p>
      )}
      {loading}
      {error}
    </ul>
  );
};

export default HeadlinesTable;
