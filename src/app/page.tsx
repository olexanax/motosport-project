import styles from "@/styles/mainPage.module.scss"
//components
import PageMainBanner from "@/components/PageMainBanner/PageMainBanner"
import AboutMe from "@/components/AboutMe/AboutMe"
import MyStory from "@/components/MyStory/MyStory"
import News from "@/components/News/News"
import Gallery from "@/components/Gallery/Gallery"


export default function Home() {
  return (
    <>
      <PageMainBanner />
      <AboutMe />
      <MyStory />
      <News />
      <Gallery />
    </>
  )
}
