// //redux
import { useGetGalleryQuery, useCreateGalleryItemMutation } from "@/redux/api/gallery/slice";
import { useCallback, useEffect } from "react";
//components
import GalleryCard from "../GalleryCard/GalleryCard";
import PhotoReviewForm from "../GalleryForm/GalleryForm";
// //types
// import { AppDispatch, RootStateType } from "types/index";
//styles
import styles from "./index.module.scss";

const GalleryList = () => {
  const { data: gallery, isLoading, isError, isSuccess, isFetching } = useGetGalleryQuery({});
  const [createMutate, { isLoading: createLoading, isError: createError }] = useCreateGalleryItemMutation();

  // console.log({ gallery });


  const onAddNew = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("order", gallery?.length.toString() || "1000");
      fetch("http://164.90.230.225/api/v1/gallery/", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", 'accept': 'application/json'
        }
      })
      createMutate({
        formData: formData,
      });
    }
  };


  const content =
    gallery && gallery && isSuccess ? (
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
    isLoading || isFetching ? <p>loading...</p> : null;
  const spinner =
    isError ? <p>error...</p> : null;

  return (
    <div className={styles.list}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default GalleryList;
