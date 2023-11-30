"use client"
//types
import { Metadata } from 'next';
//components
import ClientWrapper from "@/components/AdminPage/ClientWrapper/ClientWrapper";
import {withAuth} from "@/services/AuthWrapper";



const AdminPage = () => {
  return (
    <ClientWrapper />
  )
}

export default withAuth(AdminPage)
