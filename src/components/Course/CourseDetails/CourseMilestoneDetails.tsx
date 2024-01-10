import BannerCourses from '@/components/Home/Heros/BannerCourses'
import React from 'react'
import CourseStatistics from '../CourseStatistics'
import MilestoneList from '../MilestoneList'

export default function CourseMilestoneDetails({courseId}:{courseId:string}) {


  return (
     <div>
       <section className="-mt-[5.8rem] ">
        <div className="w-full min-h-[7rem] bg-[#BEDDF9]"></div>
      <BannerCourses/>
      </section>
      <CourseStatistics courseId={courseId}/> 

      <MilestoneList courseId={courseId} />
    </div>
  )
}
