import React from 'react'
import CourseStatistics from '../CourseStatistics';
import CourseDetailsTop from './CourseDetailsTop';
import AuthorCourseDetails from './AuthorCourseDetails';
import CourseDetailsTab from './CourseDetailsTab';
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";

export default function CourseDetailsMain({courseId}:{courseId:string}) {
    const { data: CourseData, isLoading } = useGetSingleCourseQuery(courseId, {
        skip: !Boolean(courseId),
      });
      console.log(CourseData, "courseData");
  return (
    <div>
          <CourseStatistics/>
      <CourseDetailsTop />
      <AuthorCourseDetails authorData={CourseData?.author} />
      <CourseDetailsTab courseId={courseId} />
    </div>
  )
}
