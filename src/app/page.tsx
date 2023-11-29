import styles from "@/styles/mainPage.module.scss"
//components
import PageMainBanner from "@/components/PageMainBanner/PageMainBanner"
import AboutMe from "@/components/AboutMe/AboutMe"
import MyStory from "@/components/MyStory/MyStory"
export default function Home() {
  return (
    <>
      <PageMainBanner />
      <AboutMe />
      <MyStory />
    </>
  )
}
