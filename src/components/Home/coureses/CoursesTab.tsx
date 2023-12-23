"use client";
import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import Courses from "./Courses";
import onlineCourseServicesData from "@/db/courses";

const CoursesTab = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const handleTabClick = (key: any) => {
    setActiveTabKey(key);
    // console.log(key);
  };

  const activeClass =
    "h-[48px] min-w-[167px] rounded-[5px] bg-secondary text-white text-[18px] font-bold p-1";
  const inactiveClass =
    "h-[48px] w-[167px] rounded-[5px] border-2 border-[#A7D5FF] bg-white text-black  text-[18px] font-bold p-1";

  const tabsItems: TabsProps["items"] = [
    {
      label: (
        <button className={activeTabKey === "1" ? activeClass : inactiveClass}>
          Math
        </button>
      ),
      key: "1",
      children: <Courses query={{ status: "active" }} />,
    },
    {
      label: (
        <button className={activeTabKey === "2" ? activeClass : inactiveClass}>
          Language Arts
        </button>
      ),
      key: "2",
      children: <Courses query={{ status: "active" }} />,
    },
    {
      label: (
        <button className={activeTabKey === "3" ? activeClass : inactiveClass}>
          Science
        </button>
      ),
      key: "3",
      children: <Courses query={{ status: "active" }} />,
    },
  ];
  return (
    <div className="mt-5">
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={handleTabClick}
        items={tabsItems}

        // items={new Array(3).fill(null).map((_, i) => {
        //   const id = String(i + 1);
        //   return {
        //     label: `Tab ${id}`,
        //     key: id,
        //     children: `Content of Tab Pane ${id}`,
        //   };
        // })}
      />
    </div>
  );
};

export default CoursesTab;
