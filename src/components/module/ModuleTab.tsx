"use client"
import React, { useState } from "react";
import { Tabs, TabsProps } from "antd";
import ModuleList from "./ModuleList";
import ReviewsPage from "../Course/CourseDetails/ReviewsPage";
import Courses from "../Home/coureses/Courses";

export default function ModuleTab({ moduleId }: { moduleId: string }) {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const handleTabClick = (key: any) => {
    setActiveTabKey(key);
    // console.log(key);
  };

  const tabsItems: TabsProps["items"] = [
    {
        label: <button>Lesson Summery</button>,
        key: "1",
        children: <ModuleList moduleId={moduleId} />,
      },
    {
      label: <button>Quiz </button>,
      key: "2",
      children: <Courses query={{ status: "active" }} />,
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
}
