"use client";
import React from "react";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";

import { Checkbox } from "antd";

export default function CheckboxCategory() {
  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryQuery({
    status: "active",
  });
  const CategoryData = Category?.data;
  // console.log(CategoryData)
  const CategoryOptions = CategoryData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  return <Checkbox.Group name="category" options={CategoryOptions as any} />;
}
