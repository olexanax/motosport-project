//styles
import Button from "@/components/ui/Button/Button";
import styles from "./styles.module.scss";
import React from "react";
import { AdminPageQuries } from "../../types";
import global from "@/styles/global.module.scss";
import { useForm } from "react-hook-form";
import { AppDispatch, RootStateType } from "@/redux/types";
import { useDispatch, useSelector } from "react-redux";
import {
  createBecomePartner,
  fetchBecomePartner,
  updateBecomePartner,
} from "@/redux/slices/becomePartnet.slice";
import classNames from "classnames";
import { useRouter } from "next/navigation";
//conmpoments

interface UploadPDF {
  fileUpload: FileList;
}

const BecomePartner: React.FC<AdminPageQuries> = ({ lang }) => {
  const [targetFile, setTargetFile] = React.useState<string>();

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const currentFile = useSelector(
    (state: RootStateType) => state.becomePartner.file
  );

  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
    watch,
  } = useForm<UploadPDF>();

  const submitForm = (data: UploadPDF) => {
    const files = data.fileUpload;

    if (!!files.length && currentFile) {
      const file = files[0];
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("id", currentFile?.id.toString());
      formData.append("language", lang?.toLocaleUpperCase() as "EN" | "UA");

      dispatch(
        updateBecomePartner({
          id: currentFile?.id,
          formData,
        })
      ).then(() => router.refresh());
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setTargetFile(file.name);
    }
  };

  React.useEffect(() => {
    dispatch(fetchBecomePartner(lang === "en" ? 1 : 2));
  }, [lang]);

  return (
    <div className={global.content}>
      <div className={styles.inner}>
        {currentFile ? (
          <>
            <div className={styles.fileDownload}>
              <h3 className={styles.fileDownloadTitle}>File</h3>
              <div className={styles.fileDownloadButtonWrapper}>
                <a
                  href={currentFile?.pdf}
                  target="_blank"
                  className={classNames(
                    styles.fileDownloadButton,
                    global.primaryButton
                  )}
                >
                  Download
                </a>
                <span className={styles.fileDownloadLabel}>
                  {currentFile?.pdf.split("/").pop() || "Upload"}
                </span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(submitForm)}
              className={styles.fileCard}
            >
              <div className={styles.fileCardUpload}>
                <input
                  {...register("fileUpload", { required: true })}
                  type="file"
                  id="fileUpload"
                  className={styles.inputFile}
                  onChange={onChangeInput}
                />
                <label htmlFor="fileUpload" className={styles.fileCardButton}>
                  {targetFile ? targetFile : currentFile?.pdf.split("/").pop()}
                </label>
              </div>
              <Button>Update</Button>
            </form>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BecomePartner;
