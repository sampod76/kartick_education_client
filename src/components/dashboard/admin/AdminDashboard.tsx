'use client';
import React from 'react';
import TopDashStatistics from './TopDashStatistics';
import dynamic from "next/dynamic";
import Courses from '@/components/Home/coureses/Courses';
// import Courses from '@/components/Home/coureses/Courses';
const EnrollStatistics = dynamic(() => import('@/components/dashboard/admin/EnrollStatistics'), {
    ssr: false, // Disable server-side rendering
  });

// import Course from "@/components/Home/coureses/Courses.tsx"

export default function AdminDashboard() {
  return (
    <div>

      <TopDashStatistics/>
      <EnrollStatistics/>

    {/* <Course query={{}}/> */}

    
    {/* <Courses query={{}}/> */}

    {/* <Courses query={{}}/> */}


    
    </div>
  )
}
