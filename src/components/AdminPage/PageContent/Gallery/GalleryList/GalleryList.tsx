// //redux
import { fetchGallery, createGallery } from "@/redux/slices/gallery.slice";
import { useCallback, useEffect } from "react";
import { RootStateType, AppDispatch } from "@/redux/types";
import { useDispatch, useSelector } from 'react-redux'
//components
import GalleryCard from "../GalleryCard/GalleryCard";
import PhotoReviewForm from "../GalleryForm/GalleryForm";
// //types
// import { AppDispatch, RootStateType } from "types/index";
//styles
import styles from "./index.module.scss";

const GalleryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gallery = useSelector((state: RootStateType) => state.gallery.gallery)
  const fetchGalleryStatus = useSelector((state: RootStateType) => state.gallery.fetchGalleryStatus)
  console.log(gallery);


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
    //eslint-disable-next-line
  }, [])


  const content =
    gallery ? (
      <>
        {gallery.map((item, index) => (

          <GalleryCard
            imagesLength={gallery.length}
            key={index}
            {...item}
          />
        ))}
        <PhotoReviewForm {...{ onAddNew }} />
      </>
    ) : null;
  const error =
    fetchGalleryStatus === "error" ? <p>error...</p> : null;
  const spinner =
    fetchGalleryStatus === "loading" ? <p>loading...</p> : null;

  return (
    <div className={styles.list}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default GalleryList;
