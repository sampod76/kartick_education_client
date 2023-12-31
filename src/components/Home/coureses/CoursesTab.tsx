"use client";
import { Tabs, TabsProps, message } from "antd";
import React, { useState } from "react";
import Courses from "./Courses";
import onlineCourseServicesData from "@/db/courses";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ENUM_SORT_ORDER, ENUM_STATUS } from "@/constants/globalEnums";
import { Skeleton } from "antd";
import TopBarLoading from "@/components/ui/Loading/TopBarLoading";
import { Error_model_hook } from "@/utils/modalHook";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
const CoursesTab = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const handleTabClick = (key: any) => {
    setActiveTabKey(key);
    // console.log(key);
  };
  const query: Record<string, any> = {};
  query["status"] = ENUM_STATUS.ACTIVE;
  query["limit"] = 99999;
  query["sortOrder"] = ENUM_SORT_ORDER.ASC;

  const { data, isLoading, error } = useGetAllCategoryQuery({ ...query });

  const activeClass =
    " rounded-[5px] bg-secondary text-white text-[18px] font-bold p-1";
  const inactiveClass =
    " rounded-[5px] border-2 border-[#A7D5FF] bg-white text-black  text-[18px] font-bold p-1";

  const tabsItems2: TabsProps["items"] = data?.data?.map((data, index) => ({
    label: (
      <button
        className={activeTabKey === String(index) ? activeClass : inactiveClass}
      >
       <p className="px-1"> {data?.title}</p>
      </button>
    ),
    key: String(index),
    children: <Courses query={{ status: "active", category: data?._id }} />,
  }));
  if (
    error ||
    //@ts-ignore
    data?.data?.success === false
  ) {
    const errorType: any = error;
    Error_model_hook(
      errorType?.message ||
        //@ts-ignore
        data?.data?.message
    );
    console.log(
      errorType?.message ||
        //@ts-ignore
        data?.data?.message
    );
  };


  
  return (
    <div className="mt-5 bg-slate-100 p-3">
      {isLoading ? (
        <TopBarLoading />
      ) : (
        <Tabs
          defaultActiveKey="0"
          centered
          onChange={handleTabClick}
          items={tabsItems2}
        />
      )}
    </div>
  );
};

export default CoursesTab;
