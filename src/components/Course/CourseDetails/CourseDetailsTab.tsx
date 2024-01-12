"use client";
import Courses from "@/components/Home/coureses/Courses";
import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import MilestoneList from "../MilestoneList";
import ReviewsPage from "./ReviewsPage";
import CourseAbout from "./CourseAbout";

const CourseDetailsTab = ({ courseId }: { courseId: string }) => {
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
      label: <button>About</button>,
      key: "1",
      children: <CourseAbout courseId={courseId} />,
    },
    {
      label: <button>Course Content</button>,
      key: "2",
      children: <MilestoneList courseId={courseId} />,
    },
    {
      label: <button>Reviews</button>,
      key: "3",
      children: <ReviewsPage />,
    },
  ];
  return (
    <div className="mt-5">
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={handleTabClick}
        items={tabsItems}
      />
    </div>
  );
};

export default CourseDetailsTab;
