"use client";
import CourseMilestoneDetails from '@/components/Course/CourseDetails/CourseMilestoneDetails'
import { useGetAllCourseQuery } from '@/redux/api/adminApi/courseApi';
import React from 'react'

export default function LearningPageCourse() {

    const query: Record<string, any> = {};
    query["limit"] = 999999
    query["sortOrder"] = "asc";
    query["status"] = "active";
  
    const { data, isLoading, error } = useGetAllCourseQuery({ ...query });
    
    const categoryData = data?.data || [];
    
    // console.log("🚀 ~ LearningPageCourse ~ categoryData:", categoryData)
    

  return (
    <div>
          <CourseMilestoneDetails courseId={categoryData[0]?._id}/>
    </div>
  )
}
