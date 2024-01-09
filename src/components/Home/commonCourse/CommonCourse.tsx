"use client";
import React, { useState } from "react";

import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ENUM_YN } from "@/constants/globalEnums";
import CardLoading from "@/components/ui/Loading/CardLoading";
import SIngleCourse from "../coureses/SIngleCourse";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";



const CommonCourse = () => {
  const [current, setCurrent] = useState(1);
  const [pageCount, setPageCount] = useState(10);

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
  
  if (isLoading) {
    return <CardLoading />;
  }
  return (
    <div className="mt-5  container mx-auto">
      <div className="">
        <div className="mt-[5rem] container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {courseData?.map((item: any, index: number) => {
              return <SIngleCourse course={item} key={index + 1} />;
            })}
          </div>
        </div>
        <div className="mt-4">
          <Pagination
            showSizeChanger
            current={current}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={data?.meta?.total}
          />
          ;
        </div>
      </div>
    </div>
  );
};

export default CommonCourse;
