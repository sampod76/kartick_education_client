"use client";
import dynamic from "next/dynamic";

import { Tabs, TabsProps, message } from "antd";
import React, { useState } from "react";
import Courses from "./Courses";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

import { ENUM_SORT_ORDER, ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";

import TopBarLoading from "@/components/ui/Loading/TopBarLoading";
import { Error_model_hook } from "@/utils/modalHook";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { useAppSelector } from "@/redux/hooks";
import { useDebounced } from "@/redux/hooks";
import Link from "next/link";

const CoursesTab = () => {
  const screens = useBreakpoint();
  const [activeTabKey, setActiveTabKey] = useState("0");
  // const [searchTerm, setSearchTerm] = useState<string>("rrrr");

  const handleTabClick = (key: any) => {
    setActiveTabKey(key);
    // console.log(key);
  };

  // const { searchValue } = useAppSelector(state => state.bannerSearch)

  // const debouncedSearchTerm = useDebounced({
  //   searchQuery: searchValue,
  //   delay: 600,
  // });


  const query: Record<string, any> = {};
  query["status"] = ENUM_STATUS.ACTIVE;
  query["limit"] = 6;
  query["sortOrder"] = ENUM_SORT_ORDER.ASC;
  query["sortBy"] = "serial_number";
  query["isDelete"] = ENUM_YN.NO;


  // console.log('query',query)
  // console.log('searchValue', searchValue)
  const { data, isLoading, error } = useGetAllCategoryQuery({ ...query });

  const categoryData = data?.data || [];
  const activeClass =
    "   text-[14px] lg:text-[18px] font-[600] bg-[#95c3ff3e] text-[#2a63ff] rounded ";
  const inactiveClass =
    "  text-[14px] lg:text-[18px]   ";

  const tabsItems2: TabsProps["items"] = categoryData?.map(
    (singleCategory: Record<string, any>, index: number) => ({
      label: (
        <button
          className={
            `${activeTabKey === String(index + 1) ? activeClass : inactiveClass} p-1`
          }
        >
          <p className="px-1"> {singleCategory?.title}</p>
        </button>
      ),
      key: String(index + 1),
      children: (
        <Courses query={{ status: "active", category: singleCategory?._id }} />
      ),
    })
  );

  // console.log('activeTabKey', activeTabKey)
  tabsItems2.unshift({
    label: (
      <button
        className={`${activeTabKey === "011allCourses" ? `${activeClass} ml-1` : inactiveClass} p-1 w-[3.5rem]`}
      >
        <p className="px-1 "> All</p>
      </button>
    ),
    key: "011allCourses",
    children: <Courses query={{ status: "active" }} />,
  });

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
    console.log(error, data?.data);
  }

  const TabClickHandler = (key: string, event: any) => {
    // console.log(key, event);
    /// do not need now
  };

  return (
    <div className="  bg-white px-2">

      {/* <div className="container mx-auto  py-2 px-2 my-6 flex justify-between items-center ">
        <h2 className="flex flex-col font-bold text-sm md:text-md lg:text-lg 2xl:text-4xl text-gray-700 whitespace-nowrap">

          <span>Overcome challenges with
            <span className="text-[#FB8500] mx-2 font-[800]">iBlossomLearn</span></span>
          <span className="text-nowrap">Your adventure in learning awaits!</span>
        </h2>
        <Link href={`/subscription`} className="cursor-pointer text-nowrap overflow-hidden relative z-100 border border-[#5F8122] text-[#5F8122] group px-3 py-2 lg:px-5 lg:py-2 bg-white rounded-[36px] uppercase font-bold text-center text-[10px] md:text-[12px] lg:text-lg">
          Join Now
        </Link>
      </div> */}


      <div className="relative">

        <div className="absolute top-[5rem] inset-0 bg-cover bg-no-repeat" />
        <div className="container mx-auto py-4 text-center ">

          {isLoading ? (
            <TopBarLoading />
          ) : (
            <Tabs
              defaultActiveKey="011allCourses"
              // centered
              animated
              onChange={handleTabClick}
              tabBarStyle={{

              }}
              items={tabsItems2}
              // style={{ width: screens.sm ? "80%" : "auto", margin: "30px auto", }}
              onTabClick={(key, event) => TabClickHandler(key, event)}
            />
          )}
          {/* <Link href={`/subscription`} className="cursor-pointer text-nowrap overflow-hidden relative z-100 border border-[#5F8122] text-[#5F8122] group px-3 py-2 lg:px-5 lg:py-3 bg-white rounded-[36px] uppercase font-bold text-center text-[10px] md:text-[12px] lg:text-lg w-[4rem] mx-auto my-8">
            Join Now
          </Link> */}
        </div>

      </div>
    </div>
  );
};

export default CoursesTab;
// export default dynamic(() => Promise.resolve(CoursesTab), {
//    ssr: false,
//  });


