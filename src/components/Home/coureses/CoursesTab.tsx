"use client";
import dynamic from "next/dynamic";

import { Tabs, TabsProps, message } from "antd";
import React, { useState } from "react";
import Courses from "./Courses";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

import { ENUM_SORT_ORDER, ENUM_STATUS } from "@/constants/globalEnums";

import TopBarLoading from "@/components/ui/Loading/TopBarLoading";
import { Error_model_hook } from "@/utils/modalHook";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { useAppSelector } from "@/redux/hooks";
import { useDebounced } from "@/redux/hooks";

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
  query["limit"] = 99999;
  query["sortOrder"] = ENUM_SORT_ORDER.ASC;


  // console.log('query',query)
  // console.log('searchValue', searchValue)
  const { data, isLoading, error } = useGetAllCategoryQuery({ ...query });

  const categoryData = data?.data || [];
  const activeClass =
    " rounded-[5px] bg-blue-600 text-white text-[14px] lg:text-[18px] font-bold p-1 m-0 ring-4";
  const inactiveClass =
    " rounded-[5px] border-2 border-[#A7D5FF] bg-white text-black  text-[14px] lg:text-[18px] font-bold p-1";

  const tabsItems2: TabsProps["items"] = categoryData?.map(
    (singleCategory: Record<string, any>, index: number ) => ({
      label: (
        <button
          className={
            activeTabKey === String(index+1)  ? activeClass : inactiveClass
          }
        >
          <p className="px-1"> {singleCategory?.title}</p>
        </button>
      ),
      key: String(index+1) ,
      children: (
        <Courses query={{ status: "active", category: singleCategory?._id }} />
      ),
    })
  );

  console.log('activeTabKey', activeTabKey)
  tabsItems2.unshift({
    label: (
      <button
        className={activeTabKey === "011allCourses" || activeTabKey === '0' ? activeClass : inactiveClass}
      >
        <p className="px-1"> {"All"}</p>
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
    <div className=" bg-slate-100 p-3">
      {isLoading ? (
        <TopBarLoading />
      ) : (
        <Tabs
          defaultActiveKey="011allCourses"
          // centered
          animated
          onChange={handleTabClick}
          items={tabsItems2}
          style={{ width: screens.sm ? "80%" : "auto", margin: "30px auto", padding: screens.sm ? "0" : "1em" }}
          onTabClick={(key, event) => TabClickHandler(key, event)}
        />
      )}
    </div>
  );
};

export default CoursesTab;
// export default dynamic(() => Promise.resolve(CoursesTab), {
//    ssr: false,
//  });


