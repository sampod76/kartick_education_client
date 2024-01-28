import React from 'react'
import ProfileTabSection from '../ProfileTabSection'
import ProfileAboutSection from '../ProfileAboutSection';
import { TabsProps } from 'antd';
import Courses from '@/components/Home/coureses/Courses';
import SellerPurchased from '@/components/package/SellerPurchased';
import ReviewsPage from '@/components/Course/CourseDetails/ReviewsPage';


// File: types.ts
export interface Tab {
  key: string;
  label: string;
  children: React.ReactNode;
}
export default function SellerMainProfile() {
  const TabItems: Tab[] = [
    {
      key: "1",
      label: "About",
      children: <ProfileAboutSection />,
    },
    {
      key: "3",
      label: "Purchased",
      children: <SellerPurchased />,
    },
    {
      key: "4",
      label: "Reviews",
      children: <ReviewsPage />,
    },
  ];

  return (
    <div>
      <ProfileTabSection items={TabItems} />
    </div>
  );
}