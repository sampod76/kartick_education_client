"use client";
import React, { useState } from "react";
import { Tabs, TabsProps } from "antd";
import ModuleList from "./ModuleList";
import ReviewsPage from "../Course/CourseDetails/ReviewsPage";
import Courses from "../Home/coureses/Courses";
import LessonList from "../lesson/LessonList";
// import GlossaryPage from "../"
import {
  BookOutlined,
  QuestionOutlined,
  CommentOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import Quizes from "../Quiz/Quizes";
import GlossaryPage from "../Glossary/Glossary";
import ResourcePage from "../Resource/ResourceViewForTabs";

export default function ModuleTab({
  moduleId,
  moduleData,
}: {
  moduleId: string;
  moduleData: any[];
}) {

  // console.log(moduleData)

  // const {data:QuizData} = useGetQui

  const [activeTabKey, setActiveTabKey] = useState("1");
  const handleTabClick = (key: any) => {
    setActiveTabKey(key);
    // console.log(key);
  };

  const tabsItems: TabsProps["items"] = [
    {
      label: (
        <button className="text-xl font-bold text-secondary ">
          <BlockOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />{" "}
          <h1 className=" text-sm md:text-lg lg:text-2xl">Lesson Summery</h1>
        </button>
      ),
      key: "1",
      children: <LessonList moduleId={moduleId} moduleData={moduleData} />,
    },

    // {
    //   label: (
    //     <button className="text-xl font-bold text-secondary ">
    //       <QuestionOutlined
    //         style={{
    //           fontSize: "1.5rem",
    //         }}
    //       />
    //       <h1 className="text-base font-normal">Quiz</h1>
    //     </button>
    //   ),
    //   key: "2",
    //   // children: <Quizes quizeId=""/>,
    // },

    {
      label: (
        <button className="text-xl font-bold text-secondary ">
          <BookOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />
          <h1 className="text-sm md:text-lg lg:text-2xl">Glossary</h1>
        </button>
      ),
      key: "3",
      children: <GlossaryPage moduleId={moduleId} />,
    },

    {
      label: (
        <button className="text-xl font-bold text-secondary ">
          {" "}
          <CommentOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />
          <h1 className=" text-sm md:text-lg lg:text-2xl"> Resources</h1>
        </button>
      ),
      key: "4",
      children: <ResourcePage moduleId={moduleId} />,
    },
  ];
  return (
    <div className="mt-5">
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={handleTabClick}
        items={tabsItems}
        // type=""
      />
    </div>
  );
}
