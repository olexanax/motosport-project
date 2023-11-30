//styles
import styles from "./index.module.scss";
//conmpoments
import GalleryList from "./GalleryList/GalleryList";

const Gallery = () => {
  return (
    <div className={styles.container}>
      <GalleryList />
    </div>
  );
};

export default Gallery;
