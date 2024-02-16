import CourseMilestoneDetails from '@/components/Course/CourseDetails/CourseMilestoneDetails'
import LearningMain from '@/components/learning/LearningMain';
import { useGetAllCourseQuery } from '@/redux/api/adminApi/courseApi';
import React from 'react'

export default function LearningPageCourse() {


  return (
    <div>
      {/* <CourseMilestoneDetails courseId={categoryData[0]?._id}/> */}
      <LearningMain />
    </div>
  )
}
