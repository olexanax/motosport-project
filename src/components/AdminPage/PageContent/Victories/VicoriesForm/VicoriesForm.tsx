//styles
import styles from "./index.module.scss";
import global from "@/styles/global.module.scss";
//redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchVictories, createVictories, updateVictories } from "@/redux/slices/victories.slice";
//libs
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
//components
import ImageUploader from "@/components/ImageUploader/ImageUploader";
//types
import { AdminPageQuries } from "@/components/AdminPage/types";
import { AppDispatch, RootStateType, VictoriesItemType } from "@/redux/types";
import { CreateVictoriesItemType, UpdateVictoriesItemType } from "@/redux/types";

interface Inputs {
  image: string | File;
  title: string;
  description: string;
};

const VicoriesForm = ({ victoryAddNew, victoryId, lang }: AdminPageQuries) => {
  const victories = useSelector(
    (state: RootStateType) => state.victories.victories
  );
  const fetchVictoriesStatus = useSelector(
    (state: RootStateType) =>
      state.victories.fetchVictoriesStatus
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  if (
    victories &&
    fetchVictoriesStatus === "idle" &&
    victoryId &&
    !victoryAddNew &&
    !victories.some((vac) => vac.id.toString() === victoryId)
  ) {
    router.push("not-found");
  }

  useEffect(() => {
    if (!victories.length) {
      dispatch(fetchVictories());
    }
    //eslint-disable-next-line
  }, []);


  useEffect(() => {
    const editEmployee = victories.find(
      (item) => item.id === Number(victoryId)
    );
    if (editEmployee) {
      setValue("title", editEmployee.title);
      setValue("description", editEmployee.description);
      setValue("image", editEmployee.image);
      // setValue("meta_description", editVacancy.meta_description)
    }
    //eslint-disable-next-line
  }, [victories, victoryId]);


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (victoryAddNew && !victoryId) {

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      lang && formData.append("language", lang.toUpperCase());

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      dispatch(createVictories({ formData })).then(() => {
        reset();
        const query = new URLSearchParams();
        query.delete("victoryAddNew");
        query.delete("victoryId");
        lang && query.set("lang", lang);

        router.push(`${window.location.pathname}/?${query.toString()}`)
      });
    }
    if (victoryId && !victoryAddNew) {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      lang && formData.append("language", lang.toUpperCase());

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      dispatch(
        updateVictories({
          id: Number(victoryId),
          formData: formData,
        })
      ).then(() => {
        reset();
        const query = new URLSearchParams();
        query.delete("victoryAddNew");
        query.delete("victoryId");
        lang && query.set("lang", lang);

        router.push(`${window.location.pathname}/?${query.toString()}`)
      });
    }
  };

  const submitBtnValue = "Add";

  const editEmployee = victories.find((item) => item.id === Number(victoryId));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.conatiner}>
      <div className={styles.leftCol}>
        <div className={classNames(global.inputBlock, styles.inputBlock)}>
          <span>Title*</span>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input type="text" {...field} />}
          />
          {errors.title && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <div className={classNames(global.inputBlock, styles.inputBlock)}>
          <span>Text*</span>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <input type="text" {...field} />}
          />
          {errors.description && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <input
          type="submit"
          value={submitBtnValue}
          className={classNames(global.primaryButton, styles.submitBtn)}
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.imageBlock}>
          <span>Image*</span>
          <Controller
            name="image"
            control={control}
            rules={{ required: true }}
            defaultValue={editEmployee?.image || ""}
            render={({ field }) => (
              <>
                <ImageUploader
                  id={Number(victoryId)}
                  width={250}
                  height={173}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (
                      e.target instanceof HTMLInputElement &&
                      e.target.files
                    ) {
                      const file = e.target.files[0];
                      field.onChange(file);
                    }
                  }}
                  src={
                    field.value instanceof Blob
                      ? URL.createObjectURL(field.value)
                      : editEmployee?.image || ""
                  }
                />
              </>
            )}
          />
          {errors.image && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default VicoriesForm;
