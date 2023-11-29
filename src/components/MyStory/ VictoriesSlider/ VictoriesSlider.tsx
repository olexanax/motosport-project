"use client"
//styles
import global from '@/styles/global.module.scss'
import styles from './styles.module.scss'
import "@splidejs/react-splide/css";
//components
import Image from 'next/image';
//libs
import { useState, useEffect, useRef, FC } from 'react';
import classNames from 'classnames';
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
//images
import slide1 from '../../../../public/images/aboutMeSlider/aboutMeSlider.png'
const images = [
  {
    image: slide1,
    period: "2023",
    text: 'GTC Race Oschersleben '
  },
  {
    image: slide1,
    period: "2023",
    text: 'GTC Race Oschersleben '
  },
  {
    image: slide1,
    period: "2023",
    text: 'GTC Race Oschersleben '
  },
  {
    image: slide1,
    period: "2023",
    text: 'GTC Race Oschersleben '
  },
]
interface ReviewsSliderProps {

}

const VictoriesSlider: FC<ReviewsSliderProps> = ({
}) => {


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
        <div className={styles.DesctpopSliderWrapper}>
          {
            <Splide
              ref={sliderRefDesctop}
              options={{
                rewind: true,
                type: "loop",
                perPage: 4,
              }}
              className={styles.slider}
            >
              {images?.map((image, i) => (
                <SplideSlide className={styles.slide} key={i}>
                  <div className={styles.slideContent}>
                    <h6 className={classNames(styles.title, global.subTitle)}>
                      {image.period}
                    </h6>
                    <span className={styles.divider}></span>
                    <div className={classNames(styles.text, global.text2)}>
                      {image.text}
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          }
        </div>
      </div>
    </div>
  );
};

export default VictoriesSlider