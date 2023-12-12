"use client";

import React, { useEffect, useRef } from "react";
import { News } from "@/actions/get-news";
// components
import Link from "next/link";
import Image from "next/image";
// libs
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
import classNames from "classnames";

interface NewsSliderProps {
  news: News[];
  learnMoreText: string;
}

const NewsSlider: React.FC<NewsSliderProps> = ({ news, learnMoreText }) => {
  const sliderRefDesktop = useRef<Splide>(null);

  useEffect(() => {
    // Simulate swipe after component mounts
    const timer = setTimeout(() => {
      if (sliderRefDesktop.current) {
        const splide = sliderRefDesktop.current.splide;
        splide.go("+1"); // Move forward one slide
        setTimeout(() => splide.go("-1"), 200); // Move back slightly after a delay
      }
    }, 500); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Splide
      ref={sliderRefDesktop}
      options={{
        rewind: true,
        type: "loop",
        pagination: true,
        perPage: 3,
        classes: {
          arrows: "splide__arrows news-arrows",
        },
        breakpoints: {
          720: {
            perPage: 1,
          },
        }
      }}
    >
      {news?.sort((a, b) => a.order - b.order).map((item) => (
        <SplideSlide className={styles.slide} key={item.id}>
          <div className={styles.slideContent}>
            <div className={styles.overlay}></div>
            <Image
              className={styles.slideImage}
              width={450}
              height={254}
              alt=""
              src={item.image}
            />
            <p className={classNames(styles.title, global.text2)}>
              {item.title}
            </p>
            <Link href={`/news/${item.slug}`} className={styles.learnMoreBtn}>
              {learnMoreText}
            </Link>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default NewsSlider;
