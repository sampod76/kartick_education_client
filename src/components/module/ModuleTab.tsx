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

export default function ModuleTab({
  moduleId,
  moduleData,
}: {
  moduleId: string;
  moduleData: any[];
}) {
  console.log("🚀 ~ moduleData:", moduleData);
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
        <button className="text-xl font-bold ">
          <BlockOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />{" "}
          <h1 className=" text-[1rem] md:text-[1.5rem]">Lesson Summery</h1>
        </button>
      ),
      key: "1",
      children: <LessonList moduleId={moduleId} moduleData={moduleData}/>,
    },

    // {
    //   label: (
    //     <button className="text-xl font-bold ">
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
        <button className="text-xl font-bold ">
          <BookOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />
          <h1 className=" text-[1rem] md:text-[1.5rem]">Glossary</h1>
        </button>
      ),
      key: "3",
      children: <GlossaryPage moduleId={moduleId} />,
    },

    {
      label: (
        <button className="text-xl font-bold ">
          {" "}
          <CommentOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />
          <h1 className=" text-[1rem] md:text-[1.5rem]"> Resources</h1>
        </button>
      ),
      key: "4",
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
