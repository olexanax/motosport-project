//types
import { FC } from 'react';
import { AdminPageQuries } from '@/components/AdminPage/types';
//components
import ClientWrapper from "@/components/AdminPage/ClientWrapper/ClientWrapper";

interface Props {
  searchParams: AdminPageQuries
}
const AdminPage: FC<Props> = ({ searchParams }) => {
  return (
    <ClientWrapper {...searchParams} />
  )
}

export default AdminPage

