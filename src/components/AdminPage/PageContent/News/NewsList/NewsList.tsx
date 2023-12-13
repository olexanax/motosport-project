//components
import NewsCard from "../NewsCard/NewsCard";
import DNDWrapper from "@/components/AdminPage/DNDWrapper/DNDWrapper";
//redux
import { fetchNews, updateNewsOrder } from "@/redux/slices/news.slice";
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

const NewsList = ({ newsAddNew, newsId, lang }: AdminPageQuries) => {
  const news = useSelector((state: RootStateType) => state.news.news);
  const fetchNewsStatus = useSelector(
    (state: RootStateType) => state.news.fetchNewsStatus
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNews());
    //eslint-disable-next-line
  }, []);

  const moveItem = useCallback(
    (dragOrder: number, hoverOrder: number) => {
      const dragItem = news.find((item) => item.order === dragOrder);
      const hoverItem = news.find((item) => item.order === hoverOrder);

      if (dragItem && hoverItem) {
        dispatch(
          updateNewsOrder({
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
    [news]
  );

  const content =
    news && fetchNewsStatus === "idle"
      ? news
        .filter((vict) => vict.language === lang?.toUpperCase())
        .sort((a, b) => a.order - b.order)
        .map((news) => (
          <DNDWrapper moveItem={moveItem} target={news} key={uuid()}>
            <NewsCard {...news} query={{ newsAddNew, newsId, lang }} />
          </DNDWrapper>
        ))
      : null;
  const error = fetchNewsStatus === "error" ? <p>loading...</p> : null;
  const spinner = fetchNewsStatus === "error" ? <p>error...</p> : null;

  return (
    <div className={styles.vacanciesList}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default NewsList;
