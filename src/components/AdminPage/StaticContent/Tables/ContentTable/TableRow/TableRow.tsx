import styles from "./styles.module.scss";
//libs
import { useState, FC, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
//types
import { AdminPageQuries } from "@/components/AdminPage/types";


interface Props extends AdminPageQuries {
  data: [string, string];
  onUpdate: (arg: [string, string]) => void;
  activeTableType: string
};

const TableRow: FC<Props> = ({ data, onUpdate, activeTableType, lang }) => {
  const [inputValue, setInputValue] = useState(data[1]);
  const debauncedInputValue = useDebounce(inputValue, 500);
  const inputsChangesCounter = useRef(0);


  useEffect(() => {
    setInputValue(data[1]);
    inputsChangesCounter.current = 0;
    //eslint-disable-next-line
  }, [activeTableType, lang]);

  useEffect(() => {
    if (inputsChangesCounter.current) {
      onUpdate([data[0], debauncedInputValue]);
    }
    //eslint-disable-next-line
  }, [debauncedInputValue]);

  return (
    <li className={styles.row}>
      <div className={styles.cell}>{data[0]}</div>
      <div className={styles.cell}>
        <textarea
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            inputsChangesCounter.current++;
          }}
        />
      </div>
    </li>
  );
};

export default TableRow;
