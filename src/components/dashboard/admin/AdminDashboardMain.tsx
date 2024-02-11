'use client';
import React from 'react';
import TopDashStatistics from './TopDashStatistics';
import dynamic from "next/dynamic";
import Courses from '@/components/Home/coureses/Courses';
import CardLineChart from './chart/BarChart';
import BarChart from './chart/BarChart';
import LineChart from './chart/LineChart';
import PieChart from './chart/PieChart';
// import Courses from '@/components/Home/coureses/Courses';
const EnrollStatistics = dynamic(() => import('@/components/dashboard/admin/EnrollStatistics'), {
  ssr: false, // Disable server-side rendering
});

// import Course from "@/components/Home/coureses/Courses.tsx"

export default function AdminDashboardMain() {
  return (
    <div>

      <TopDashStatistics />
 
      {/* <EnrollStatistics />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 bg-slate-50 mt-7">
        <BarChart />
        <LineChart />
        <PieChart />
      </div> */}

    </div>
  )
}
