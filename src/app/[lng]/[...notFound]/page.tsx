import Banner404 from "@/components/Banner404/Banner404";
import { Metadata } from "next";
import ClientWrapper from "./components/ClientWrapper";
import { useTranslation } from "@/app/i18n";
import { I18PageProps } from "@/types/i18NextTypes";

async function NotFound({ params }: I18PageProps) {

  return <ClientWrapper params={params} />
};

export default NotFound;

export async function generateMetadata({
  params: { lng },
}: I18PageProps): Promise<Metadata> {
  const { t } = await useTranslation(lng, "Not-found");
  return {
    title: t("meta_tags.meta_title"),
    description: t("meta_tags.meta_description"),
  };
}
