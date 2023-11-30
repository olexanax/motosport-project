import { useEffect } from "react";
//styles
import styles from "./styles.module.scss";
import TableRow from "./TableRow/TableRow";

const images = [
  {
    id: 1,
    image_name: "image_name",
    format: "format",
    weight: "weight",
    image: "image",
    alt_text: "alt_text",
    web_page: 1,
  },
];

const ImagesTable = () => {
  const loading = false ? <p className={styles.message}>Loading...</p> : null;
  const error = false ? <p className={styles.message}>Error</p> : null;

  return (
    <ul className={styles.table}>
      <li className={styles.titleRow}>
        <p>Image</p>
        <p>Alt text</p>
        <p>Weight</p>
      </li>

      {images ? (
        images.map((image) => <TableRow key={image.id} {...image} />)
      ) : (
        <p className={styles.message}>Page not found</p>
      )}
      {images && !images.length && (
        <p className={styles.message}>List are empty</p>
      )}
      {loading}
      {error}
    </ul>
  );
};

export default ImagesTable;
