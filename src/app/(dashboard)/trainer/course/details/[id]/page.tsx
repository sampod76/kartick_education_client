"use client";
import AuthorCourseDetails from "@/components/Course/CourseDetails/AuthorCourseDetails";
import CourseDetailsTab from "@/components/Course/CourseDetails/CourseDetailsTab";
import CourseDetailsTop from "@/components/Course/CourseDetails/CourseDetailsTop";
import CourseDetailsMain from "@/components/Course/CourseDetails/CourseDetailsMain";
import CourseStatistics from "@/components/Course/CourseStatistics";

import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import React from "react";

const DashboardCourseDetailsPublicPage = ({ params }: any) => {
  //
  const id = params?.id;
  const { data: CourseData, isLoading } = useGetSingleCourseQuery(params?.id, {
    skip: !Boolean(params?.id),
  });

  return (
    <div className="container mx-auto">
      {/* <h2 className="text-base font-normal">The Web Developer Boot Camp</h2> */}

      <CourseStatistics courseId={id} />
      <CourseDetailsMain courseId={id} />
    </div>
  );
};

export default DashboardCourseDetailsPublicPage;
