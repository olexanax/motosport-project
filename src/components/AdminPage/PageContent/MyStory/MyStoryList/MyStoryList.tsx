//components
import VictoriesCard from "../MyStoryCard/MyStoryCard";
import DNDWrapper from "@/components/AdminPage/DNDWrapper/DNDWrapper";
//redux
import { fetchMyStory, updateMyStoryOrder } from "@/redux/slices/myStory.slice";
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

const MyStoryList = ({ myStoryAddNew, myStoryId, lang }: AdminPageQuries) => {
  const myStory = useSelector((state: RootStateType) => state.myStory.myStory);
  const fetchMyStoryStatus = useSelector(
    (state: RootStateType) => state.myStory.fetchMyStoryStatus
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMyStory());
  }, []);

  const moveItem = useCallback(
    (dragOrder: number, hoverOrder: number) => {
      const dragItem = myStory.find((item) => item.order === dragOrder);
      const hoverItem = myStory.find((item) => item.order === hoverOrder);

      if (dragItem && hoverItem) {
        dispatch(
          updateMyStoryOrder({
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
    [myStory]
  );

  const content =
    myStory && fetchMyStoryStatus === "idle"
      ? myStory
          .filter((vict) => vict.language === lang?.toUpperCase())
          .map((story) => (
            <DNDWrapper moveItem={moveItem} target={story} key={uuid()}>
              <VictoriesCard
                {...story}
                query={{ myStoryAddNew, myStoryId, lang }}
              />
            </DNDWrapper>
          ))
      : null;
  const error = fetchMyStoryStatus === "error" ? <p>loading...</p> : null;
  const spinner = fetchMyStoryStatus === "error" ? <p>error...</p> : null;

  return (
    <div className={styles.vacanciesList}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default MyStoryList;
