"use client";
import React, { useState } from "react";
import { Tabs, TabsProps } from "antd";
import ModuleList from "./ModuleList";
import ReviewsPage from "../Course/CourseDetails/ReviewsPage";
import Courses from "../Home/coureses/Courses";
import LessonList from "../lesson/LessonList";
// import GlosseryPage from "../"
import {
  BookOutlined,
  QuestionOutlined,
  CommentOutlined,
  BlockOutlined,
  
} from "@ant-design/icons";
import Quizes from "../Quiz/Quizes";
import GlosseryPage from "../glossery/Glossery";

export default function ModuleTab({ moduleId ,moduleData}: { moduleId: string,moduleData:any[] }) {
  
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
          <h1>Lesson Summery</h1>
        </button>
      ),
      key: "1",
      children: <LessonList moduleId={moduleId} />,
    },
  
    {
      label: (
        <button className="text-xl font-bold ">
          <QuestionOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />
          <h1>Quiz</h1>
        </button>
      ),
      key: "2",
      // children: <Quizes quizeId=""/>,
    },

    {
      label: (
        <button className="text-xl font-bold ">
          <BookOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />
          <h1>Glossery</h1>
        </button>
      ),
      key: "3",
      children: <GlosseryPage moduleId={moduleId}/>
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
          <h1> Reviews</h1>
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
