"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { useGetSingleCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import Image from "next/image";
import React from 'react'

export default function ViewCategory({ categoryId }: { categoryId: string }) {


  const { data: category, isLoading } = useGetSingleCategoryQuery(categoryId, {
    skip: !Boolean(categoryId),
  });


  // const category = data
  if (isLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div
        style={{ marginLeft: "auto", marginRight: "auto" }}
        className="container "
      >
        <div className="container mx-auto p-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6">{category.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category Image */}
              <div className="col-span-full mb-6">
                <Image height={200} width={300} src={category.img} alt={category.title + 'Image'} className="w-full h- rounded" />
              </div>

              {/* Category Details */}
              <div className="col-span-full md:col-span-1">
                {/* <p className="text-gray-600 mb-2">Category ID: {category.id}</p> */}
                <p className="text-gray-600 mb-2">Status: {category.status}</p>
                <p className="text-gray-600 mb-2">Created At: {category.createdAt}</p>
                <p className="text-gray-600 mb-2">Updated At: {category.updatedAt}</p>
                {/* Add more details as needed */}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8">
              {/* <h2 className="text-xl font-semibold mb-4">Additional Information</h2> */}
              {/* Add more details or components as needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
