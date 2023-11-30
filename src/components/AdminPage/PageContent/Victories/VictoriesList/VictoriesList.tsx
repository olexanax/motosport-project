//components
import VictoriesCard from "../VictoriesCard/VictoriesCard";
//redux
import { fetchVictories } from "@/redux/slices/victories.slice";
import { useDispatch, useSelector } from "react-redux";
//livs
import { useCallback, useEffect } from "react";
//styles
import styles from "./index.module.scss";
//types
import { AdminPageQuries } from '@/components/AdminPage/types';
import { AppDispatch, RootStateType } from "@/redux/types";

const VictoriesList = ({ victoryAddNew, victoryId, lang }: AdminPageQuries) => {
  const victories = useSelector(
    (state: RootStateType) => state.victories.victories
  );
  const fetchVictoriesStatus = useSelector(
    (state: RootStateType) =>
      state.victories.fetchVictoriesStatus
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchVictories());
    //eslint-disable-next-line
  }, []);



  const content =
    victories && fetchVictoriesStatus === "idle"
      ? victories.filter(vict => vict.language === lang?.toUpperCase()).map((vacancy, index) => (
        <VictoriesCard key={index} {...vacancy} query={{ victoryAddNew, victoryId, lang }} />
      ))
      : null;
  const error =
    fetchVictoriesStatus === "error" ? <p>loading...</p> : null;
  const spinner =
    fetchVictoriesStatus === "error" ? <p>error...</p> : null;

  return (
    <div className={styles.vacanciesList}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default VictoriesList;
