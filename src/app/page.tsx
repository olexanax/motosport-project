import styles from "@/styles/mainPage.module.scss"
//components
import PageMainBanner from "@/components/PageMainBanner/PageMainBanner"
import AboutMe from "@/components/AboutMe/AboutMe"
import MyStory from "@/components/MyStory/MyStory"
import CoachingHero from "@/components/CoachingHero/CoachingHero"
export default function Home() {
  return (
    <>
      <PageMainBanner />
      <AboutMe />
      <MyStory />
      <CoachingHero
        title="Coaching"
        text="As an experienced racing driver, I am happy to share my knowledge with anyone, who is aspiring to improve their racing skills and achieve higher results. I offer individual coaching sessions, where we would work on and improve areas that are specific to the needs of each driver. 
        If you are interested in my coaching programme, please fill out the form below. You can also find more information on my Instagram page specifically about coaching."
      />
    </>
  )
}
