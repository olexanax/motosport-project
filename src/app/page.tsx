import styles from "@/styles/mainPage.module.scss";
//components
import PageMainBanner from "@/components/PageMainBanner/PageMainBanner";
import AboutMe from "@/components/AboutMe/AboutMe";
import MyStory from "@/components/MyStory/MyStory";
import CoachingHero from "@/components/CoachingHero/CoachingHero";
import BecomePartner from "@/components/BecomePartnerHero/BecomePartnerHero";
import Gallery from "@/components/Gallery/Gallery";
import OurPartners from "@/components/OurPartners/OurPartners";
import FollowMeBanner from "@/components/FollowMeBanner/FollowMeBanner";
import News from "@/components/News/News";
export default function Home() {
  return (
    <>
      <PageMainBanner />
      <AboutMe />
      <MyStory />
      <News />
      <CoachingHero
        title="Coaching"
        text="As an experienced racing driver, I am happy to share my knowledge with anyone, who is aspiring to improve their racing skills and achieve higher results. I offer individual coaching sessions, where we would work on and improve areas that are specific to the needs of each driver. 
        If you are interested in my coaching programme, please fill out the form below. You can also find more information on my Instagram page specifically about coaching."
      />
      <Gallery />
      <OurPartners />
      <BecomePartner
        title="Become a Partner"
        text="If you were inspired by my motorsport journey and would love to become a part of it, please fill out the form below. 
Partnership is a crucial part of success in any sport, especially motorsport, so I am open to new partnership offers. 
If you would like to get more information regarding partnership or sponsorship, please press the “Download” button below or fill out the contact form.
"
      />
      <FollowMeBanner />
    </>
  );
}
