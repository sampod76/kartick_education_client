"use client";
import React, { useState } from "react";

import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ENUM_YN } from "@/constants/globalEnums";
import CardLoading from "@/components/ui/Loading/CardLoading";
import SIngleCourse from "../coureses/SIngleCourse";
import type { PaginationProps } from "antd";
import { Pagination, Spin } from "antd";
import { useAppSelector } from "@/redux/hooks";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
// import style from "@/utils/lo"
const CommonCourse = () => {
  const [current, setCurrent] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const { searchValue } = useAppSelector((state: any) => state.bannerSearch)
  const query: Record<string, any> = {};
  query["limit"] = pageCount;
  query["page"] = current;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  query["status"] = "active";
  query["favorite"] = ENUM_YN.YES;

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrent(current);
    setPageCount(pageSize);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  const { data, isLoading, error } = useGetAllCourseQuery({ ...query });
  const courseData = data?.data || [];

  if (searchValue?.length > 1) {
    return <div className="my-5 w-[50%] mx-auto">
      <Spin size="large" />
    </div>
  }

  if (isLoading) {
    return <CardLoading />;
  }
  return (
    <div className=" bg-[#A2B0F321] pt-[2rem] pb-1 lg:pb-3 lg:pt-[5rem] ">
      <div className="container mx-auto">

        <h1 className=" text-center text-gray-800 px-2 text-base sa:text-sm md:text-md xl:text-[2.3rem] font-medium ">BUILD A HEALTHIER FOUNDATION FOR LIFELONG LEARNING</h1>
        <div className=" mt-4 lg:mt-[3rem] px-1 lg:px-3 ">
          <div className="w-full  ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
              {courseData?.map((item: any, index: number) => {
                return <SIngleCourse course={item} key={index + 1} />;
              })}
            </div>
          </div>

          <div className="flex justify-center items-center mt-10 pb-4">
            <Pagination
              showSizeChanger
              current={current}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              total={data?.meta?.total}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonCourse;
