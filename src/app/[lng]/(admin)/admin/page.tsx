//types
import { FC } from "react";
import { AdminPageQuries } from "@/components/AdminPage/types";
import { Metadata } from "next";
//i18n
import { I18PageProps } from "@/types/i18NextTypes";
import { useTranslation } from "../../../i18n";
//components
import ClientWrapper from "@/components/AdminPage/ClientWrapper/ClientWrapper";
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = "force-dynamic";

interface Props {
  searchParams: AdminPageQuries;
}
const AdminPage: FC<Props> = ({ searchParams }) => {
  return <ClientWrapper {...searchParams} />;
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

export default AdminPage;
