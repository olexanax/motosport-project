//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";
//components
import Image from "next/image";
import { getPartners } from "@/actions/get-partners";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n";

import ErrorBanner from "../ErrorBanner/ErrorBanner";

const OurPartners = async ({ lng }: I18ComponentProps) => {
  const partners = await getPartners();
  const { t } = await useTranslation(lng, "translation");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          {t('heading_tags.h2__OurPartnersTitle')}
        </h2>
        {!partners && <ErrorBanner {...{ lng }} theme="dark" />}
        {partners && !!partners.length && (
          <div className={styles.logoContainer}>
            {partners.map((logo) => (
              <div key={logo.id} className={styles.imageWrapper}>
                <Image
                  className={styles.image}
                  width={100}
                  height={50}
                  quality={100}
                  unoptimized
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
