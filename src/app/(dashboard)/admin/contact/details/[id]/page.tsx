"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import ViewCategory from "@/components/category/ViewCategory";
import ViewContact from "@/components/contact/ViewContact";
import { useGetSingleCategoryQuery } from "@/redux/api/adminApi/categoryApi";

import Image from "next/image";

import React from 'react'

export default function DetailsAdminContactPage({ params }: { params: { id: string } }) {
  return (
    <div><ViewContact contactId={params?.id} /></div>
  )
}

