"use client"
import Banner404 from "@/components/Banner404/Banner404";
import React from "react";
import { I18PageProps } from "@/types/i18NextTypes";


const ClientWrapper: React.FC<I18PageProps> = ({ params }) => {
  return <Banner404 />;
};

export default ClientWrapper;


