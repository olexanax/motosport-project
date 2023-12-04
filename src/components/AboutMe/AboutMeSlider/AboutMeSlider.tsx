"use client";
//styles
import global from "@/styles/global.module.scss";
import styles from "./styles.module.scss";
import "@splidejs/react-splide/css";
//components
import Image from "next/image";
//libs
import { useEffect, useRef, FC } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
//images
import { AboutMe } from "@/actions/get-about-me";
interface ReviewsSliderProps {
  aboutMe: AboutMe[] | undefined;
}

const AboutMeSlider: FC<ReviewsSliderProps> = ({ aboutMe }) => {
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
      {aboutMe && !!aboutMe.length && (
        <div className={styles.DesctpopSliderWrapper}>
          <Splide
            ref={sliderRefDesctop}
            options={{
              rewind: true,
              type: "loop",
              perPage: 1,
            }}
            className={styles.slider}
          >
            {aboutMe.map((image) => (
              <SplideSlide className={styles.slide} key={image.id}>
                <Image src={image.image} fill alt="" />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}
    </div>
  );
};

export default AboutMeSlider;
