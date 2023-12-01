//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n";
import GalleryGrid from "./GalleryGrid/GalleryGrid";
import { getGallery } from "@/actions/get-galery";
import ErrorBanner from "../ErrorBanner/ErrorBanner";

const Gallery = async ({ lng }: I18ComponentProps) => {
  const images = await getGallery();
  const { t } = await useTranslation(lng, "translation");
  const moreButton = t("content.gallery_moreButton")
  return (
    <div id="gallery" className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          {t('heading_tags.h2__GalleryTitle')}
        </h2>
        {!images && <ErrorBanner {...{ lng }} />}
        {images && !!images.length && <GalleryGrid moreButton={moreButton} images={images} />}
      </div>
    </div>
  );
};

export default Gallery;
