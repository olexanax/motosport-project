//components
import VictoriesCard from "../VictoriesCard/VictoriesCard";
import DNDWrapper from "@/components/AdminPage/DNDWrapper/DNDWrapper";
//redux
import {
  fetchVictories,
  updateVictoriesOrder,
} from "@/redux/slices/victories.slice";
import { useDispatch, useSelector } from "react-redux";
//livs
import { useCallback, useEffect } from "react";
//styles
import styles from "./index.module.scss";
//types
import { AdminPageQuries } from "@/components/AdminPage/types";
import { AppDispatch, RootStateType } from "@/redux/types";
// libs
import { v4 as uuid } from "uuid";

const VictoriesList = ({ victoryAddNew, victoryId, lang }: AdminPageQuries) => {
  const victories = useSelector(
    (state: RootStateType) => state.victories.victories
  );
  const fetchVictoriesStatus = useSelector(
    (state: RootStateType) => state.victories.fetchVictoriesStatus
  );
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchVictories());
    //eslint-disable-next-line
  }, []);

  const moveItem = useCallback(
    (dragOrder: number, hoverOrder: number) => {
      const dragItem = victories.find((item) => item.order === dragOrder);
      const hoverItem = victories.find((item) => item.order === hoverOrder);

      if (dragItem && hoverItem) {
        dispatch(
          updateVictoriesOrder({
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
    [victories]
  );

  const content =
    victories && fetchVictoriesStatus === "idle"
      ? victories
          .filter((vict) => vict.language === lang?.toUpperCase())
          .sort((a, b) => a.order - b.order)
          .map((victory) => (
            <DNDWrapper moveItem={moveItem} target={victory} key={uuid()}>
              <VictoriesCard
                {...victory}
                query={{ victoryAddNew, victoryId, lang }}
              />
            </DNDWrapper>
          ))
      : null;
  const error = fetchVictoriesStatus === "error" ? <p>loading...</p> : null;
  const spinner = fetchVictoriesStatus === "error" ? <p>error...</p> : null;

  return (
    <div className={styles.vacanciesList}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default VictoriesList;
