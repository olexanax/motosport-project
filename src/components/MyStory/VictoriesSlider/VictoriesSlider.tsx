"use client";
//styles
import global from "@/styles/global.module.scss";
import styles from "./styles.module.scss";
import classNames from "classnames";
import "@splidejs/react-splide/css";
import { useState, useEffect, useRef, FC } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Victory } from "@/actions/get-victories";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes";
import { useTranslation } from "@/app/i18n/client";

interface VictoriesSliderProps extends I18ComponentProps {
  victories: Victory[] | undefined;
}

const VictoriesSlider: FC<VictoriesSliderProps> = ({ victories, lng }) => {
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);

  const sliderRefDesctop = useRef<Splide>(null);
  const sliderRefMobile = useRef<Splide>(null);

  const { t } = useTranslation(lng, "translation");

  useEffect(() => {
    // Simulate swipe after component mounts
    const timer = setTimeout(() => {
      if (sliderRefDesctop.current) {
        const splide = sliderRefDesctop.current.splide;
        splide.go("+1"); // Move forward one slide
        setTimeout(() => splide.go("-1"), 200); // Move back slightly after a delay
      }
      if (sliderRefMobile.current) {
        const splide = sliderRefMobile.current.splide;
        splide.go("+1"); // Move forward one slide
        setTimeout(() => splide.go("-1"), 200); // Move back slightly after a delay
      }
    }, 500); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h4 className={classNames(styles.blockTitle, global.subTitle)}>
          {t("heading_tags.h4__myStorySubTitle2")}
        </h4>
        {victories && !!victories.length && (
          <>
            <div className={styles.DesctpopSliderWrapper}>
              <Splide
                ref={sliderRefDesctop}
                options={{
                  rewind: true,
                  type: "loop",
                  pagination: false,
                  classes: {
                    arrows: "splide__arrows victory-arrows",
                  },
                  perPage: 4,
                  perMove: 1
                }}
                className={styles.slider}
              >
                {victories
                  .sort((a, b) => a.order - b.order)
                  .map((victory) => (
                    <SplideSlide className={styles.slide} key={victory.id}>
                      <div
                        className={styles.slideContent}
                        style={{
                          background: `url("${victory.image}") center top / cover no-repeat`,
                        }}
                      >
                        <div className={styles.overlay}></div>
                        <h6
                          className={classNames(styles.title, global.subTitle)}
                        >
                          {victory.title}
                        </h6>
                        <span className={styles.divider}></span>
                        <div className={classNames(styles.text, global.text2)}>
                          {victory.description}
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
              </Splide>
            </div>
            <div className={styles.mobileWrapper}>
              {(isMobileListOpen ? victories : victories.slice(0, 3)).map(
                (victory) => (
                  <div
                    key={victory.id}
                    className={styles.slideContent}
                    style={{
                      background: `url("${victory.image}") center top / cover no-repeat`,
                    }}
                  >
                    <h6 className={classNames(styles.title, global.subTitle)}>
                      {victory.title}
                    </h6>
                    <span className={styles.divider}></span>
                    <div className={classNames(styles.text, global.text2)}>
                      {victory.description}
                    </div>
                  </div>
                )
              )}
              {!isMobileListOpen && (
                <div
                  onClick={() => setIsMobileListOpen(true)}
                  className={classNames(styles.btn, global.primaryButton)}
                >
                  More
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VictoriesSlider;
