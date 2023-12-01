// //redux
import {
  fetchGallery,
  createGallery,
  updateGalleryOrder,
} from "@/redux/slices/gallery.slice";
import { useCallback, useEffect } from "react";
import { RootStateType, AppDispatch } from "@/redux/types";
import { useDispatch, useSelector } from "react-redux";
//components
import GalleryCard from "../GalleryCard/GalleryCard";
import PhotoReviewForm from "../GalleryForm/GalleryForm";
// //types
// import { AppDispatch, RootStateType } from "types/index";
//styles
import styles from "./index.module.scss";
import DNDWrapper from "@/components/AdminPage/DNDWrapper/DNDWrapper";

const GalleryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gallery = useSelector((state: RootStateType) => state.gallery.gallery);
  const fetchGalleryStatus = useSelector(
    (state: RootStateType) => state.gallery.fetchGalleryStatus
  );

  const onAddNew = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("order", gallery?.length.toString() || "1000");
      dispatch(createGallery({ formData }));
    }
  };

  useEffect(() => {
    dispatch(fetchGallery());
  }, []);

  const moveItem = useCallback(
    (dragOrder: number, hoverOrder: number) => {
      const dragItem = gallery.find((item) => item.order === dragOrder);
      const hoverItem = gallery.find((item) => item.order === hoverOrder);
      console.log(dragOrder, hoverOrder);

      if (dragItem && hoverItem) {
        dispatch(
          updateGalleryOrder({
            dragItem: {
              id: dragItem.id,
              order: dragOrder,
            },
            hoverItem: {
              id: hoverItem.id,
              order: hoverOrder,
            },
          })
        );
      }
    },
    [gallery]
  );

  const content = gallery ? (
    <>
      {gallery.map((item, index) => (
        <DNDWrapper target={item} moveItem={moveItem}>
          <GalleryCard imagesLength={gallery.length} key={index} {...item} />
        </DNDWrapper>
      ))}
      <PhotoReviewForm {...{ onAddNew }} />
    </>
  ) : null;
  const error = fetchGalleryStatus === "error" ? <p>error...</p> : null;
  const spinner = fetchGalleryStatus === "loading" ? <p>loading...</p> : null;

  return (
    <div className={styles.list}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default GalleryList;
