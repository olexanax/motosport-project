import styles from "./styles.module.scss";
//libs
import { useState, FC, useEffect, useRef } from "react";

type Props = {
  onUpdate: (
    string: string,
    keyName: "meta_description" | "meta_title"
  ) => void;
  value: string;
  keyName: "meta_description" | "meta_title";
};

const TableRow: FC<Props> = ({ onUpdate, value, keyName }) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <li className={styles.row}>
      <div className={styles.cell}>{keyName}</div>
      <div className={styles.cell}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className={styles.cell}>{inputValue.trim().split(" ").length}</div>
    </li>
  );
};

export default TableRow;
