// //redux
import { fetchAboutMe, createAboutMe } from "@/redux/slices/aboutMe.slice";
import { useCallback, useEffect } from "react";
import { RootStateType, AppDispatch } from "@/redux/types";
import { useDispatch, useSelector } from 'react-redux'
//components
import AboutMeCard from "../AboutMeCard/AboutMeCard";
import AboutMeForm from "../AboutMeForm/AboutMeForm";
// //types
// import { AppDispatch, RootStateType } from "types/index";
//styles
import styles from "./index.module.scss";

const AboutMeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const aboutMe = useSelector((state: RootStateType) => state.aboutMe.aboutMe)
  const fetchAboutMeStatus = useSelector((state: RootStateType) => state.aboutMe.fetchAboutMeStatus)


  const onAddNew = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("order", aboutMe?.length.toString() || "1000");
      dispatch(createAboutMe({ formData }));
    }
  };

  useEffect(() => {
    dispatch(fetchAboutMe());
    //eslint-disable-next-line
  }, [])


  const content =
    aboutMe ? (
      <>
        {aboutMe.map((item, index) => (

          <AboutMeCard
            imagesLength={aboutMe.length}
            key={index}
            {...item}
          />
        ))}
        <AboutMeForm {...{ onAddNew }} />
      </>
    ) : null;
  const error =
    fetchAboutMeStatus === "error" ? <p>error...</p> : null;
  const spinner =
    fetchAboutMeStatus === "loading" ? <p>loading...</p> : null;

  return (
    <div className={styles.list}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default AboutMeList;
