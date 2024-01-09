'use client';
import { Col, Row, Tabs } from "antd";
import React from "react";
import SIngleCourse from "./SIngleCourse";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ENUM_SORT_ORDER, ENUM_STATUS } from "@/constants/globalEnums";

import { Error_model_hook } from "@/utils/modalHook";
import NotFoundCourse from "@/components/ui/NotFound/NotFoundCourse";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import InternelError from "@/components/shared/Error/InternelError";

interface ICourseItemType {
  status?: string;
  category?: string;
  categoryTitle?: string;
  [key: string]: string | undefined;
}

const Courses = ({ query }: { query: ICourseItemType }) => {
  const queryAll: Record<string, any> = {};
  queryAll["status"] = ENUM_STATUS.ACTIVE;
  queryAll["limit"] = 99999;
  queryAll["sortOrder"] = ENUM_SORT_ORDER.ASC;
  
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      queryAll[key] = query[key];
    }
  }

  const { data, isLoading, error } = useGetAllCourseQuery({ ...queryAll });
  const courseData = data?.data || [];
  console.log("🚀 ~ file: Courses.tsx:32 ~ Courses ~ courseData:", courseData)
  if (error) {
    return (
      <InternelError
        message={
          //@ts-ignore
          error?.data ||
          //@ts-ignore
          data?.data?.message
        }
      />
    );
  }
  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : courseData?.length === 0 ? (
        <NotFoundCourse />
      ) : (
        <div className="mt-3 container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {courseData?.map((item: any, index: number) => {
              return <SIngleCourse course={item} key={index + 1} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
