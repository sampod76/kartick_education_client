
import CourseStatistics from "@/components/Course/CourseStatistics";
// import MilestoneList from "@/components/Course/MilestoneList";
import BannerCourses from "@/components/Home/Heros/BannerCourses";
import SupportHero from "@/components/Home/Heros/SupportHero";
import React from "react";

const MilestonePage = ({
  params: { id },
}: {
  params: { id: string };
}) => {

  // console.log(id);
  const MilestoneList = React.lazy(
    () => import("@/components/Course/MilestoneList")
  );
 
  return (
    <div>
       <section className="-mt-[5.8rem] ">
        <div className="w-full min-h-[7rem] bg-[#BEDDF9]"></div>
      <BannerCourses/>
      </section>
      <CourseStatistics />
      <MilestoneList courseId={id} />
    </div>
  );
};

export default MilestonePage;
