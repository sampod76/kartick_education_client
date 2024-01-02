"use client";
import AuthorCourseDetails from "@/components/Course/CourseDetails/AuthorCourseDetails";
import CourseDetailsTab from "@/components/Course/CourseDetails/CourseDetailsTab";
import CourseDetailsTop from "@/components/Course/CourseDetails/CourseDetailsTop";
import CourseDetailsMain from "@/components/Course/CourseDetails/CourseDetailsMain";
import CourseStatistics from "@/components/Course/CourseStatistics";


import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import React from "react";



const DashboardCourseDetailsPublicPage = ({ params }: any) => {
  // console.log(params, "params");
  const id = params?.id;
  const { data: CourseData, isLoading } = useGetSingleCourseQuery(params?.id, {
    skip: !Boolean(params?.id),
  });
  // console.log(CourseData, "courseData");
  return (
    <div className="container mx-auto">
      {/* <h2>The Web Developer Boot Camp</h2> */}

      <CourseStatistics />
 <CourseDetailsMain courseId={id}/>

    </div>
  );
};

export default DashboardCourseDetailsPublicPage;
