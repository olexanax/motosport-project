import { useEffect, FC } from "react";
import { fetchStaticImages } from "@/redux/slices/staticContent.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStateType } from "@/redux/types";
//styles
import styles from "./styles.module.scss";
import TableRow from "./TableRow/TableRow";

type Props = {
  activeTableType: string;
}
const ImagesTable: FC<Props> = ({ activeTableType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const staticImages = useSelector(
    (state: RootStateType) => state.staticContent.staticImages
  );
  const fetchStaticImagesStatus = useSelector(
    (state: RootStateType) => state.staticContent.fetchStaticImagesStatus
  );
  const loading = fetchStaticImagesStatus === "loading" ? <p className={styles.message}>Loading...</p> : null;
  const error = fetchStaticImagesStatus === "error" ? <p className={styles.message}>Error</p> : null;

  useEffect(() => {
    dispatch(fetchStaticImages());
  }, [])

  return (
    <ul className={styles.table}>
      <li className={styles.titleRow}>
        <p>Image</p>
        <p>Alt text</p>
      </li>

      {staticImages ? (
        staticImages.map((image) => <TableRow activeTableType={activeTableType} key={image.id} {...image} />)
      ) : (
        <p className={styles.message}>Page not found</p>
      )}
      {staticImages && !staticImages.length && (
        <p className={styles.message}>List are empty</p>
      )}
      {loading}
      {error}
    </ul>
  );
};

export default ImagesTable;
