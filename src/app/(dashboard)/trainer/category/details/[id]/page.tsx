"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import ViewCategory from "@/components/category/ViewCategory";
import { useGetSingleCategoryQuery } from "@/redux/api/adminApi/categoryApi";

import Image from "next/image";

import React from 'react'

export default function DetailsAdminCategoryPage({params}:{params:{id:string}}) {
  return (
    <div><ViewCategory categoryId={params?.id}/></div>
  )
}

