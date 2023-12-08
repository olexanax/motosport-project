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
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
//types
import { Metadata } from "next";
//i18n
import { I18PageProps } from "@/types/i18NextTypes";
import { useTranslation } from "../i18n";

export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Home({ params: { lng } }: I18PageProps) {
  const { t } = await useTranslation(lng, "translation");
  return (
    <>
      <PageMainBanner {...{ lng }} />
      <ErrorBoundary {...{ lng }}>
        <AboutMe {...{ lng }} />
      </ErrorBoundary>
      <ErrorBoundary {...{ lng }}>
        <MyStory {...{ lng }} />
      </ErrorBoundary>
      <ErrorBoundary {...{ lng }}>
        <CoachingHero
          title={t("heading_tags.h2__CoachingTitle")}
          text={t("content.coaching_text")}
          {...{ lng }}
        />
      </ErrorBoundary>
      <ErrorBoundary {...{ lng }}>
        <News {...{ lng }} />
      </ErrorBoundary>
      <ErrorBoundary {...{ lng }}>
        <Gallery {...{ lng }} />
      </ErrorBoundary>
      <ErrorBoundary {...{ lng }}>
        <OurPartners {...{ lng }} />
      </ErrorBoundary>
      <ErrorBoundary {...{ lng }}>
        <BecomePartner
          {...{ lng }}
          title={t("heading_tags.h2__BecomePartnerTitle")}
          text={t("content.BecomePartner_text")}
        />
      </ErrorBoundary>
      <ErrorBoundary {...{ lng }}>
        <FollowMeBanner {...{ lng }} />
      </ErrorBoundary>
    </>
  );
}

export async function generateMetadata({
  params: { lng },
}: I18PageProps): Promise<Metadata> {
  const { t } = await useTranslation(lng, "translation");

  return {
    title: t("meta_tags.meta_title"),
    description: t("meta_tags.meta_description"),
  };
}
