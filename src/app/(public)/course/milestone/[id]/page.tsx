import CourseStatistics from "@/components/Course/CourseStatistics";
import MilestoneList from "@/components/Course/MilestoneList";
import BannerCourses from "@/components/Home/Heros/BannerCourses";
import SupportHero from "@/components/Home/Heros/SupportHero";
import React from "react";

const MilestonePage = ({
  params: { id },
}: {
  params: { id: string };
}) => {

  // console.log(id);

  return (
    <div>
      <MilestoneList courseId={id} />
    </div>
  );
};

export default MilestonePage;
