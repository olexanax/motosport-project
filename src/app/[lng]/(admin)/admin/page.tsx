//types
import { Metadata } from 'next';
import { FC } from 'react';
import { AdminPageQuries } from '@/components/AdminPage/types';
//components
import ClientWrapper from "@/components/AdminPage/ClientWrapper/ClientWrapper";
import { withAuth } from "@/services/AuthWrapper";




interface Props {
  searchParams: AdminPageQuries
}
const AdminPage: FC<Props> = ({ searchParams }) => {
  console.log(searchParams);
  return (
    <ClientWrapper {...searchParams} />
  )
}

// export default withAuth(AdminPage)
export default AdminPage

