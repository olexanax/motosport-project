// //redux
import {
  fetchPartners,
  createPartners,
  updatePartnersOrder,
} from "@/redux/slices/partners.slice";
import { useCallback, useEffect } from "react";
import { RootStateType, AppDispatch } from "@/redux/types";
import { useDispatch, useSelector } from "react-redux";
//components
import PartnersCard from "../PartnersCard/PartnersCard";
import PhotoReviewForm from "../PartnersForm/PartnersForm";
import DNDWrapper from "@/components/AdminPage/DNDWrapper/DNDWrapper";
//styles
import styles from "./index.module.scss";
// libs
import { v4 as uuid } from "uuid";

const PartnersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const partners = useSelector(
    (state: RootStateType) => state.partners.partners
  );
  const fetchPartnersStatus = useSelector(
    (state: RootStateType) => state.partners.fetchPartnersStatus
  );

  const onAddNew = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("order", partners?.length.toString() || "1000");
      dispatch(createPartners({ formData }));
    }
  };

  useEffect(() => {
    dispatch(fetchPartners());
  }, []);

  const moveItem = useCallback(
    (dragOrder: number, hoverOrder: number) => {
      const dragItem = partners.find((item) => item.order === dragOrder);
      const hoverItem = partners.find((item) => item.order === hoverOrder);

      if (dragItem && hoverItem) {
        dispatch(
          updatePartnersOrder({
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
    [partners]
  );

  const content = partners ? (
    <>
      {partners.map((item) => (
        <DNDWrapper target={item} moveItem={moveItem} key={uuid()}>
          <PartnersCard imagesLength={partners.length} {...item} />
        </DNDWrapper>
      ))}
      <PhotoReviewForm {...{ onAddNew }} />
    </>
  ) : null;
  const error = fetchPartnersStatus === "error" ? <p>error...</p> : null;
  const spinner = fetchPartnersStatus === "loading" ? <p>loading...</p> : null;

  return (
    <div className={styles.list}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default PartnersList;
