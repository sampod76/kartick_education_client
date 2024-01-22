import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import ProfileAboutSection from "./ProfileAboutSection";
import Courses from "../Home/coureses/Courses";
import ReviewsPage from "../Course/CourseDetails/ReviewsPage";
import UserPurchased from "../package/SellerPurchased";

// File: types.ts
export interface Tab {
  key: string;
  label: string;
  children: React.ReactNode;
}

export default function ProfileTabSection({
  items = [] // Provide a default value for 'items' to avoid 'undefined'
}: {
  items?: Tab[];
}) {
  const onChange = (key: string) => {
    console.log(key);
  }

  return (
    <div className="w-full mx-auto mt-5">
         <Tabs defaultActiveKey="1" onChange={onChange}>
        {items?.map((item, index) => (
          <Tabs.TabPane key={item.key} tab={item.label}>
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}
