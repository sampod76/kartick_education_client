import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import ProfileAboutSection from "./ProfileAboutSection";
import Courses from "../Home/coureses/Courses";

export default function ProfileTabSection() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "About",
      children: <ProfileAboutSection />,
    },
    {
      key: "2",
      label: "Courses",
      children: <Courses query={{}} />,
    },
    {
      key: "3",
      label: "Purchased",
      children: "Content of  Purchased",
    },
    {
      key: "4",
      label: "Discussion",
      children: "Content of Discussion",
    },
    {
      key: "5",
      label: "Subscription",
      children: "Content of Subscription",
    },
  ]
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
