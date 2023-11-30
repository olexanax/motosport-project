import { FC } from "react";
//styles
import styles from "./index.module.scss";
import global from "@/styles/global.module.scss";

import classNames from "classnames";

type Props = {
  onAddNew: (arg: React.ChangeEvent<HTMLInputElement>) => void;
};

const AboutMeForm: FC<Props> = ({ onAddNew }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageBody}>
        <p className={classNames(styles.title, global.smallTitle)}>Add</p>
        <input
          className={styles.file}
          type="file"
          id="photo-upload"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onAddNew(e)
            if (e.target) {
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default AboutMeForm;
