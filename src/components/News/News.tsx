"use client"
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//libs
import { useState, useEffect, useRef, FC } from 'react';
import classNames from 'classnames';
import Image from "next/image";
import Link from "next/link";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
//images
import slide1 from "../../../public/images/aboutMeSlider/aboutMeSlider.png"

const images = [
  {
    image: slide1,
    title: "GTC Race Lausitzring",
  },
  {
    image: slide1,
    title: '"Green Hell" obeyed the Ukrainian!'
  },
  {
    image: slide1,
    title: "The National Anthem of Ukraine was played for the first time at the GTC Championship!"
  },
]

const News = () => {
  const sliderRefDesctop = useRef<Splide>(null);

  useEffect(() => {
    // Simulate swipe after component mounts
    const timer = setTimeout(() => {
      if (sliderRefDesctop.current) {
        const splide = sliderRefDesctop.current.splide;
        splide.go("+1"); // Move forward one slide
        setTimeout(() => splide.go("-1"), 200); // Move back slightly after a delay
      }
    }, 500); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={classNames(global.sectionTitle, styles.title)}>
          News
        </h2>
        <div className={styles.DesctpopSliderWrapper}>
          {
            <Splide
              ref={sliderRefDesctop}
              options={{
                rewind: true,
                type: "loop",
                perPage: 3,
              }}
              className={styles.slider}
            >
              {images?.map((image, i) => (
                <SplideSlide className={styles.slide} key={i}>
                  <div className={styles.slideContent}>
                    <Image className={styles.slideImage} alt="" src={image.image} />
                    <p className={classNames(styles.title, global.text2)}>
                      {image.title}
                    </p>
                    <Link href={"/"} className={styles.learnMoreBtn}>
                      Learn More
                    </Link>
                  </div>
                </SplideSlide>

              ))}
            </Splide>
          }
        </div>
      </div>
    </div>
  )
}

export default News