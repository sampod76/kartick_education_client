import BannerCourses from '@/components/Home/Heros/BannerCourses'
import React from 'react'
import CourseStatistics from '../CourseStatistics'
import MilestoneList from '../MilestoneHomeList'

export default function CourseMilestoneDetails({ courseId }: { courseId: string }) {


  return (
    <div>
      <section className="-mt-[5.8rem] mb-4 lg:mb-6 ">
        <div className="w-full min-h-[7rem] bg-[#BEDDF9]"></div>
        <BannerCourses />
      </section>
      <CourseStatistics courseId={courseId} />
      <MilestoneList courseId={courseId} />
    </div>
  )
}
