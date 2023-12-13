//styles
import styles from "./index.module.scss";
import global from "@/styles/global.module.scss";
//redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNews, createNews, updateNews } from "@/redux/slices/news.slice";
//libs
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
//components
import ImageUploader from "@/components/ImageUploader/ImageUploader";
//types
import { AdminPageQuries } from "@/components/AdminPage/types";
import { AppDispatch, RootStateType, NewsItemType } from "@/redux/types";
import { CreateNewsItemType, UpdateNewsItemType } from "@/redux/types";

interface Inputs {
  image: string | File;
  title: string;
  description: string;
  short_description: string;
  meta_title: string
  meta_description: string
};

const NewsForm = ({ newsAddNew, newsId, lang }: AdminPageQuries) => {
  const news = useSelector(
    (state: RootStateType) => state.news.news
  );
  const fetchNewsStatus = useSelector(
    (state: RootStateType) =>
      state.news.fetchNewsStatus
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
    news &&
    fetchNewsStatus === "idle" &&
    newsId &&
    !newsAddNew &&
    !news.some((vac) => vac.id.toString() === newsId)
  ) {
    router.push("not-found");
  }

  useEffect(() => {
    if (!news.length) {
      dispatch(fetchNews());
    }
    //eslint-disable-next-line
  }, []);


  useEffect(() => {
    const editEmployee = news.find(
      (item) => item.id === Number(newsId)
    );
    if (editEmployee) {
      setValue("title", editEmployee.title);
      setValue("description", editEmployee.description);
      setValue("image", editEmployee.image);
      setValue("short_description", editEmployee.short_description);
      setValue("meta_title", editEmployee.meta_title);
      setValue("meta_description", editEmployee.meta_description);
    }
    //eslint-disable-next-line
  }, [news, newsId]);


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (newsAddNew && !newsId) {

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("short_description", data.short_description);
      formData.append("meta_description", data.meta_description);
      formData.append("meta_title", data.meta_title);
      lang && formData.append("language", lang.toUpperCase());

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      dispatch(createNews({ formData })).then(() => {
        reset();
        const query = new URLSearchParams();
        query.delete("newsAddNew");
        query.delete("newsId");
        lang && query.set("lang", lang);

        router.push(`${window.location.pathname}/?${query.toString()}`)
      });
    }
    if (newsId && !newsAddNew) {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("short_description", data.short_description);
      formData.append("meta_description", data.meta_description);
      formData.append("meta_title", data.meta_title);
      lang && formData.append("language", lang.toUpperCase());

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      dispatch(
        updateNews({
          id: Number(newsId),
          formData: formData,
        })
      ).then(() => {
        reset();
        const query = new URLSearchParams();
        query.delete("newsAddNew");
        query.delete("newsId");
        lang && query.set("lang", lang);

        router.push(`${window.location.pathname}/?${query.toString()}`)
      });
    }
  };

  const submitBtnValue = "Add";

  const editEmployee = news.find((item) => item.id === Number(newsId));

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
            render={({ field }) => <textarea className={styles.bigTextarea} {...field} />}
          />
          {errors.description && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        {" use <br/> for new paragraph"}
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
                  id={Number(newsId)}
                  width={433}
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
        <div className={classNames(global.inputBlock, styles.inputBlock)}>
          <span>Short Description*</span>
          <Controller
            name="short_description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <textarea {...field} />}
          />
          {errors.title && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <div className={classNames(global.inputBlock, styles.inputBlock)}>
          <span>Meta Title*</span>
          <Controller
            name="meta_title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <textarea  {...field} />}
          />
          {errors.title && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <div className={classNames(global.inputBlock, styles.inputBlock)}>
          <span>Meta Description*</span>
          <Controller
            name="meta_description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <textarea  {...field} />}
          />
          {errors.title && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <input
          type="submit"
          value={submitBtnValue}
          className={classNames(global.primaryButton, styles.submitBtn)}
        />
      </div>
    </form>
  );
};

export default NewsForm;
