//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
//components
import Image from "next/image";
import classNames from "classnames";
// types
import { FC } from "react";
import { MyStory } from "@/actions/get-my-story";

interface Props extends MyStory {}

const MyStoryCard: FC<Props> = ({ image, description, id, order, title }) => {
  return (
    <div className={styles.card}>
      <div className={styles.textBlock}>
        <h6 className={classNames(styles.title, global.text1)}>{title}</h6>
        <p className={classNames(styles.text, global.text2)}>{description}</p>
      </div>
      <Image
        width={412}
        height={333}
        src={image}
        alt="image"
        className={styles.image}
      />
    </div>
  );
};

export default MyStoryCard;
