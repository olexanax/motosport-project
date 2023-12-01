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
import image from "../../../../public/images/aboutMeSlider/aboutMeSlider.png";
interface VictoriesSliderProps {
  victories: Victory[] | undefined;
}

const VictoriesSlider: FC<VictoriesSliderProps> = ({ victories }) => {
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const sliderRefDesctop = useRef<Splide>(null);
  const sliderRefMobile = useRef<Splide>(null);

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
          Victories
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
                }}
                className={styles.slider}
              >
                {victories.map((victory) => (
                  <SplideSlide className={styles.slide} key={victory.id}>
                    <div
                      className={styles.slideContent}
                      style={{
                        background: `url("${victory.image}") center top / 100% 100% no-repeat`,
                      }}
                    >
                      <div className={styles.overlay}></div>
                      <h6 className={classNames(styles.title, global.subTitle)}>
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
                      background: `url("${victory.image}") center top / 100% 100% no-repeat`,
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
