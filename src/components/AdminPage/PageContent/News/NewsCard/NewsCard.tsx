import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
//styles
import styles from "./index.module.scss";
import global from "@/styles/global.module.scss";
//redux
import { useDispatch, useSelector } from "react-redux";
import { deleteNews } from "@/redux/slices/news.slice";
// //type
import { NewsItemType } from "@/redux/types";
import { AppDispatch, RootStateType } from "@/redux/types";
import { AdminPageQuries } from '@/components/AdminPage/types';

interface Props extends NewsItemType {
  query: AdminPageQuries
}

const NewsCard: FC<Props> = ({ id, image, short_description, title, query: { lang } }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [deleteBtnValue, setDeleteBtnValue] = useState<"loading..." | "Delete">(
    "Delete"
  );

  const onEdit = () => {
    const query = new URLSearchParams();
    query.set("newsId", id.toString());
    lang && query.set("lang", lang);
    query.delete("newsAddNew");

    router.push(`${window.location.pathname}?${query.toString()}`)
  };
  const onDelete = () => {
    setDeleteBtnValue("loading...");
    dispatch(deleteNews(id));
  };

  return (
    <div className={styles.card}>
      <div className={styles.dataBlock}>
        <Image width={235} height={123} className={styles.image} alt={title} src={image} />
        <div className={styles.textBlock}>
          <h5 className={styles.title}>{title}</h5>
          <p className={styles.position}>{short_description}</p>
        </div>
      </div>
      <div className={styles.btnsBlock}>
        <div onClick={onDelete} className={global.primaryButton}>
          {deleteBtnValue}
        </div>
        <div onClick={onEdit} className={global.secondaryButton}>
          Edit
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
