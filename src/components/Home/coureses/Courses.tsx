"use client";
import { Col, Pagination, PaginationProps, Row, Tabs } from "antd";
import React, { useState } from "react";
import SIngleCourse from "./SIngleCourse";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ENUM_SORT_ORDER, ENUM_STATUS } from "@/constants/globalEnums";

import { Error_model_hook } from "@/utils/modalHook";
import NotFoundCourse from "@/components/ui/NotFound/NotFoundCourse";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import InternelError from "@/components/shared/Error/InternelError";
import { ICourseData } from "@/types/courseType";
import { useAppSelector, useDebounced } from "@/redux/hooks";

interface ICourseItemType {
  status?: string;
  category?: string;
  categoryTitle?: string;
  [key: string]: string | undefined;
}

const Courses = ({ query ,width='container'}: { query: ICourseItemType, width?:string}) => {
  // console.log("🚀 ~ Courses ~ query:", query)


  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimitCount, setPageCountLimit] = useState(10);
  ///! for search course by banner search
  const { searchValue } = useAppSelector(state => state.bannerSearch)

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchValue,
    delay: 600,
  });
  const queryAll: Record<string, any> = {};
  queryAll["status"] = ENUM_STATUS.ACTIVE;
  queryAll["limit"] = pageLimitCount;
  queryAll["page"] = currentPage;

  // console.log(searchValue?.length, 'searchValue?.length', debouncedSearchTerm)
  if (!!debouncedSearchTerm &&searchValue?.length >0) {
    query["searchTerm"] = debouncedSearchTerm;
  }else{
    query["searchTerm"] =''
  }

  // console.log(query,'query')


  queryAll["sortOrder"] = ENUM_SORT_ORDER.ASC;
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrentPage(current);
    setPageCountLimit(pageSize);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      queryAll[key] = query[key];
    }
  }
  // console.log("🚀 ~ Courses ~ queryAll:", queryAll)
  const { data, isLoading, error } = useGetAllCourseQuery({ ...queryAll });
  const courseData = data?.data || [];
  // console.log("🚀 ~ Courses ~ courseData:", courseData)


  // const { data: userStateData } = useAppSelector(state => state.userInfo)
  // console.log('userStateData', userStateData)
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
        <div className={`mt-3 ${width ==="container" ?"container" : "w-full"} mx-auto `}>
          <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {courseData?.map((item: ICourseData, index: number) => {
              return <SIngleCourse course={item} key={index + 1} />;
            })}
          </div>
          <div className="mt-10 mb-2  flex justify-center items-center">
            <Pagination
              showSizeChanger
              current={currentPage}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              total={data?.meta?.total}
            />
            ;
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
