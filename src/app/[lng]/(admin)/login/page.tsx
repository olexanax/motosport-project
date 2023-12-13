
import LoginPageClientWrapper from "@/components/AdminPage/LoginPageClientWrapper/LoginPageClientWrapper";
import { Metadata } from "next";
//i18n
import { I18PageProps } from "@/types/i18NextTypes";
import { useTranslation } from "../../../i18n";


const LoginPage = () => {
  return (
    <LoginPageClientWrapper />
  );
};

export async function generateMetadata({
  params: { lng },
}: I18PageProps): Promise<Metadata> {
  const { t } = await useTranslation(lng, "translation");

  return {
    title: t("meta_tags.meta_title"),
    description: t("meta_tags.meta_description"),
    robots: "noindex"
  };
}

export default LoginPage;
