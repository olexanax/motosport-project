import styles from "./styles.module.scss";
//libs
import { useState, FC, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStateType } from "@/redux/types";
//types
//components
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { StaticImagesItemType } from "@/redux/types";
import editIcon from "../../../../../../../public/images/icons/edit.png";
import Image from "next/image";
import { updateStaticImage } from "@/redux/slices/staticContent.slice";

interface Props extends StaticImagesItemType {
  activeTableType: string;
}


const TableRow: FC<Props> = ({ image, alt_text, weight, id, activeTableType }) => {
  const [altInputValue, setAltInputValue] = useState(alt_text);
  const [fileInputValue, setFileInputValue] = useState<File | null>(null);

  const debauncedAltInputValue = useDebounce(altInputValue, 500);
  const inputsChangesCounter = useRef(0);
  const filesChangesCounter = useRef(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setAltInputValue(alt_text);
    inputsChangesCounter.current = 0;
    //eslint-disable-next-line
  }, [activeTableType]);

  useEffect(() => {
    if (inputsChangesCounter.current) {
      const formdata = new FormData();
      formdata.append("alt_text", debauncedAltInputValue);
      dispatch(
        updateStaticImage({
          id,
          formData: formdata,
        })
      );
    }
  }, [debauncedAltInputValue]);

  useEffect(() => {
    if (filesChangesCounter.current) {
      {
        const formdata = new FormData();
        formdata.append("image", fileInputValue as File);
        dispatch(
          updateStaticImage({
            id,
            formData: formdata,
          })
        );
      }
    }
  }, [fileInputValue]);

  return (
    <li className={styles.row}>
      <div className={styles.cell}>
        <div className={styles.editWrapper}>
          Edit
          <Image src={editIcon} width={33} height={33} alt="Edit icon" />
        </div>
        <div className={styles.imageUploader}>
          <ImageUploader
            id={id}
            width={307}
            height={226}
            propForUpdate={Math.random()}
            styles={{
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
            }}
            src={
              fileInputValue instanceof Blob
                ? URL.createObjectURL(fileInputValue)
                : image || ""
            }
            srcType={fileInputValue instanceof Blob ? "file" : "string"}
            cahce={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target instanceof HTMLInputElement && e.target.files) {
                const file = e.target.files[0];
                filesChangesCounter.current++;
                setFileInputValue(file);
              }
            }}
          />
        </div>
      </div>
      <div className={styles.cell}>
        <textarea
          value={altInputValue}
          onChange={(e) => {
            setAltInputValue(e.target.value);
            inputsChangesCounter.current++;
          }}
        />
      </div>
    </li>
  );
};

export default TableRow;
