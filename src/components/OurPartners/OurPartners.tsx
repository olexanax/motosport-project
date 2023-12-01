//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
//components
import Image from "next/image";
import { getPartners } from "@/actions/get-partners";
import ErrorBanner from "../ErrorBanner/ErrorBanner";

const OurPartners = async () => {
  const partners = await getPartners();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          Our Partners
        </h2>
        {!partners && <ErrorBanner theme="dark" />}
        {partners && !!partners.length && (
          <div className={styles.logoContainer}>
            {partners.map((logo) => (
              <div key={logo.id} className={styles.imageWrapper}>
                <Image
                  className={styles.image}
                  width={100}
                  height={50}
                  src={logo.image}
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurPartners;
