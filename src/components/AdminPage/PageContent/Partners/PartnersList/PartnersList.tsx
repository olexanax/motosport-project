// //redux
import { fetchPartners, createPartners } from "@/redux/slices/partners.slice";
import { useCallback, useEffect } from "react";
import { RootStateType, AppDispatch } from "@/redux/types";
import { useDispatch, useSelector } from 'react-redux'
//components
import PartnersCard from "../PartnersCard/PartnersCard";
import PhotoReviewForm from "../PartnersForm/PartnersForm";
// //types
// import { AppDispatch, RootStateType } from "types/index";
//styles
import styles from "./index.module.scss";

const PartnersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const partners = useSelector((state: RootStateType) => state.partners.partners)
  const fetchPartnersStatus = useSelector((state: RootStateType) => state.partners.fetchPartnersStatus)


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
    //eslint-disable-next-line
  }, [])


  const content =
    partners ? (
      <>
        {partners.map((item, index) => (

          <PartnersCard
            imagesLength={partners.length}
            key={index}
            {...item}
          />
        ))}
        <PhotoReviewForm {...{ onAddNew }} />
      </>
    ) : null;
  const error =
    fetchPartnersStatus === "error" ? <p>error...</p> : null;
  const spinner =
    fetchPartnersStatus === "loading" ? <p>loading...</p> : null;

  return (
    <div className={styles.list}>
      {content}
      {error}
      {spinner}
    </div>
  );
};

export default PartnersList;
