//types
import { Metadata } from 'next';
import { AdminPageQuries } from '@/components/AdminPage/types';
//components
import ClientWrapper from "@/components/AdminPage/ClientWrapper/ClientWrapper";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};


interface Props {
  searchParams: AdminPageQuries
}
const AdminPage = ({ searchParams }: Props) => {
  return (
    <ClientWrapper {...searchParams} />
  )
}

export default AdminPage
