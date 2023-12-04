import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
//styles
import styles from "./index.module.scss";
import classNames from "classnames";
// //redux
import { deleteAboutMe, updateAboutMe } from "@/redux/slices/aboutMe.slice";
import { AppDispatch } from "@/redux/types";
import { useDispatch, useSelector } from "react-redux";
// //components
import ImageUploader from "@/components/ImageUploader/ImageUploader";
// //type
import { AboutMeItemType } from "@/redux/types";
//images
import deleteBtn from "../../../../../../public/images/icons/deleteBtn.svg";
import editIcon from "../../../../../../public/images/icons/editIcon.svg";

import Image from "next/image";
import axios from "axios";

type Inputs = {
  image: File | string;
};

interface Props extends AboutMeItemType {
  imagesLength: number;
}

const AboutMeCard: FC<Props> = ({ image, imagesLength, order, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { control } = useForm<Inputs>({
    defaultValues: {
      image: image,
    },
  });

  const onDelete = () => {
    dispatch(deleteAboutMe(id));
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("order", order.toString());
      dispatch(updateAboutMe({ id, formData }));
    }
  };

  const required = imagesLength < 2;
  return (
    <div className={styles.card}>
      <div className={styles.imageBody}>
        <Controller
          name="image"
          control={control}
          rules={{ required: true }}
          defaultValue={image || ""}
          render={({ field }) => (
            <>
              <ImageUploader
                styles={{
                  borderRadius: "10px",
                }}
                width={272}
                id={id}
                height={200}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target instanceof HTMLInputElement && e.target.files) {
                    const file = e.target.files[0];
                    field.onChange(file);
                    onImageChange(e);
                  }
                }}
                src={
                  field.value instanceof Blob
                    ? URL.createObjectURL(field.value)
                    : image || ""
                }
              />
            </>
          )}
        />
      </div>
      <p
        onClick={onDelete}
        className={classNames(
          styles.deleteBtn,
          required ? styles.disabled : ""
        )}
      >
        <Image src={deleteBtn} width={36} height={36} alt="delete" />
      </p>
    </div>
  );
};

export default AboutMeCard;
