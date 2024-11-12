'use client';
import { useGetSingleCourseQuery } from '@/redux/api/adminApi/courseApi';
import React from 'react';
import parse from 'html-react-parser';
import { Spin } from 'antd';

export default function CourseAbout({ courseId }: { courseId: string }) {
  const { data: courseData, isLoading } = useGetSingleCourseQuery(courseId);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div>
      <div>
        {courseData?.details
          ? parse(courseData?.details)
          : courseData?.short_description}{' '}
      </div>
    </div>
  );
}
