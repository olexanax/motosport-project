import { useEffect } from "react";
//types

//styles
import styles from "./styles.module.scss";
import TableRow from "./TableRow/TableRow";

const ContentTable = () => {
  // useEffect(() => {
  //   dispatch(fetchPages());
  //   //eslint-disable-next-line
  // }, []);

  // const content = pages.find(
  //   (page) => page.page_name === currentPageName
  // )?.content;
  const content = {
    "content-1": "content-1",
    "content-2": "content-2",
    "content-3": "content-3",
    "content-4": "content-4",
    "content-5": "content-5",
  };

  const loading = false ? <p className={styles.message}>Loading...</p> : null;
  const error = false ? <p className={styles.message}>Error</p> : null;

  const onUpdate = (data: [string, string]) => {
    // dispatch(
    //   updateWebPage({
    //     id: currentWebPage?.id,
    //     data: {
    //       content: {
    //         [data[0]]: data[1],
    //       },
    //     },
    //   })
    // );
  };

  return (
    <ul className={styles.table}>
      <li className={styles.titleRow}>
        <p>Body</p>
        <p></p>
      </li>

      {content ? (
        Object.entries(content).map((item, i) => (
          <TableRow key={i} onUpdate={onUpdate} data={item} />
        ))
      ) : (
        <p className={styles.message}>Page not found</p>
      )}
      {content && !Object.entries(content).length && (
        <p className={styles.message}>List are empty</p>
      )}
      {loading}
      {error}
    </ul>
  );
};

export default ContentTable;
