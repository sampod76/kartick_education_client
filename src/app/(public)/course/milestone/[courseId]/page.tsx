
import CourseMilestoneDetails from "@/components/Course/CourseDetails/CourseMilestoneDetails";
import CourseStatistics from "@/components/Course/CourseStatistics";
// import MilestoneList from "@/components/Course/MilestoneList";
import BannerCourses from "@/components/Home/Banner&hero/BannerCourses";
import SupportHero from "@/components/Home/Banner&hero/SupportHero";
import React from "react";
const MilestoneList = React.lazy(
  () => import("@/components/Course/MilestoneHomeList")
);
const MilestonePage = ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {

  // console.log(courseId);

  return (
    <div >
      <CourseMilestoneDetails courseId={courseId} />
    </div>
  );
};

export default MilestonePage;
