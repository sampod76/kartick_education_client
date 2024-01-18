import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import ProfileAboutSection from "./ProfileAboutSection";
import Courses from "../Home/coureses/Courses";
import ReviewsPage from "../Course/CourseDetails/ReviewsPage";
import UserPurchased from "../package/UserPurchased";
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
      children: <Courses query={{ status: "active" }} />,
    },
    {
      key: "3",
      label: "Purchased",
      children: <UserPurchased />,
    },
    {
      key: "4",
      label: "Reviews",
      children: <ReviewsPage />,
    },
    // {
    //   key: "5",
    //   label: "Subscription",
    //   children: "Content of Subscription",
    // },
  ];
  return (
    <div className="w-full mx-auto mt-5">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
