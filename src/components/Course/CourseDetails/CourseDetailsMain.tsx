import React from "react";
import CourseDetailsTop from "./CourseDetailsTop";
import AuthorCourseDetails from "./AuthorCourseDetails";
import CourseDetailsTab from "./CourseDetailsTab";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import CourseStatistics from "../CourseStatistics";

export default function CourseDetailsMain({ courseId }: { courseId: string }) {
  const { data: CourseData, isLoading } = useGetSingleCourseQuery(courseId, {
    skip: !Boolean(courseId),
  });
  // console.log(CourseData, "courseData");
  return (
    <div>
      <CourseDetailsTop courseData={CourseData} />
      <CourseStatistics CourseData={CourseData} />
      <AuthorCourseDetails authorData={CourseData?.author} />
      <CourseDetailsTab CourseData={CourseData} />
    </div>
  );
}
