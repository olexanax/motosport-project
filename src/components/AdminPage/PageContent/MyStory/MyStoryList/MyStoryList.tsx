//components
import VictoriesCard from "../MyStoryCard/MyStoryCard";
//redux
import { fetchMyStory } from "@/redux/slices/myStory.slice";
import { useDispatch, useSelector } from "react-redux";
//livs
import { useCallback, useEffect } from "react";
//styles
import styles from "./index.module.scss";
//types
import { AdminPageQuries } from '@/components/AdminPage/types';
import { AppDispatch, RootStateType } from "@/redux/types";

const MyStoryList = ({ myStoryAddNew, myStoryId, lang }: AdminPageQuries) => {
  const myStory = useSelector(
    (state: RootStateType) => state.myStory.myStory
  );
  const fetchMyStoryStatus = useSelector(
    (state: RootStateType) =>
      state.myStory.fetchMyStoryStatus
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMyStory());
    //eslint-disable-next-line
  }, []);


  const content =
    myStory && fetchMyStoryStatus === "idle"
      ? myStory.filter(vict => vict.language === lang?.toUpperCase()).map((vacancy, index) => (
        <VictoriesCard key={index} {...vacancy} query={{ myStoryAddNew, myStoryId, lang }} />
      ))
      : null;
  const error =
    fetchMyStoryStatus === "error" ? <p>loading...</p> : null;
  const spinner =
    fetchMyStoryStatus === "error" ? <p>error...</p> : null;

  return (
    <div className={styles.vacanciesList}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default MyStoryList;
