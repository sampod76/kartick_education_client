"use client";

import { Tabs, TabsProps, message } from "antd";
import React, { useState } from "react";
import Courses from "./Courses";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useSearchParams } from "next/navigation";
const PurchaseCategoryTab = () => {
  const screens = useBreakpoint();
  const [activeTabKey, setActiveTabKey] = useState("0");

  const handleTabClick = (key: any) => {
    setActiveTabKey(key);
    // console.log(key);
  };
  const searchParams = useSearchParams();
  const encodedData: any = searchParams.get("data");
  //=================================
  const decodedData = decodeURIComponent(encodedData);
  const data = JSON.parse(decodedData);
  console.log("🚀 ~ PurchaseCategoryTab ~ data:", data);

  const activeClass =
    " rounded-[5px] bg-blue-600 text-white text-[18px] font-bold p-1 m-0 ring-4 ml-1";
  const inactiveClass =
    " rounded-[5px] border-2 border-[#A7D5FF] bg-white text-black  text-[18px] font-bold p-1";

  const tabsItems2: TabsProps["items"] = data?.map(
    (singleData: Record<string, any>, index: number | string) => ({
      label: (
        <button
          className={
            activeTabKey === String(index) ? activeClass : inactiveClass
          }
        >
          <p className="px-1">
            {" "}
            {singleData?.title || singleData?.category?.title}
          </p>
        </button>
      ),
      key: String(index),
      children: (
        <Courses
        width="full"
          query={{
            status: "active",
            // singleData?.category?._id must be first because it  is first
            category: singleData?.category?._id || singleData?._id,
          }}
        />
      ),
    })
  );

  const TabClickHandler = (key: string, event: any) => {
    // console.log(key, event);
    /// do not need now
  };

  return (
    <div className=" bg-slate-100 p-3">
      {
        <Tabs
          defaultActiveKey="011"
          // centered
          animated
          onChange={handleTabClick}
          items={tabsItems2}
          // style={{ width: screens.sm ? "80%" : "auto", margin: "30px auto" }}
          onTabClick={(key, event) => TabClickHandler(key, event)}
        />
      }
    </div>
  );
};

export default PurchaseCategoryTab;
// export default dynamic(() => Promise.resolve(CoursesTab), {
//    ssr: false,
//  });
