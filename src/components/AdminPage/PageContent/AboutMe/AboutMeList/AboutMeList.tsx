//redux
import {
  fetchAboutMe,
  createAboutMe,
  updateAboutMeOrder,
} from "@/redux/slices/aboutMe.slice";
import { useCallback, useEffect } from "react";
import { RootStateType, AppDispatch } from "@/redux/types";
import { useDispatch, useSelector } from "react-redux";
//components
import AboutMeCard from "../AboutMeCard/AboutMeCard";
import AboutMeForm from "../AboutMeForm/AboutMeForm";
import DNDWrapper from "../../../DNDWrapper/DNDWrapper";
//styles
import styles from "./index.module.scss";
// libs
import { v4 as uuid } from "uuid";

const AboutMeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const aboutMe = useSelector((state: RootStateType) => state.aboutMe.aboutMe);
  const fetchAboutMeStatus = useSelector(
    (state: RootStateType) => state.aboutMe.fetchAboutMeStatus
  );

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
  }, []);

  const moveItem = useCallback(
    (dragOrder: number, hoverOrder: number) => {
      const dragItem = aboutMe.find((item) => item.order === dragOrder);
      const hoverItem = aboutMe.find((item) => item.order === hoverOrder);

      if (dragItem && hoverItem) {
        dispatch(
          updateAboutMeOrder({
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
    [aboutMe]
  );

  const content = aboutMe ? (
    <>
      {aboutMe.map((item, index) => (
        <DNDWrapper target={item} moveItem={moveItem} key={uuid()}>
          <AboutMeCard imagesLength={aboutMe.length} {...item} />
        </DNDWrapper>
      ))}
      <AboutMeForm {...{ onAddNew }} />
    </>
  ) : null;
  const error = fetchAboutMeStatus === "error" ? <p>error...</p> : null;
  const spinner = fetchAboutMeStatus === "loading" ? <p>loading...</p> : null;

  return (
    <div className={styles.list}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default AboutMeList;
