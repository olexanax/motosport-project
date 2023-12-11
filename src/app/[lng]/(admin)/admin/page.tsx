//types
import { FC } from "react";
import { AdminPageQuries } from "@/components/AdminPage/types";
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

export default AdminPage;
