import React from "react";

import CourseStatistics from "@/components/Course/CourseStatistics";
import MilestoneList from "@/components/Course/MilestoneList";
import SupportHero from "@/components/Home/Heros/SupportHero";

const CoursesPage = () => {
  return (
    <div className="mt-7">
      <CourseStatistics />

      <MilestoneList />
      <SupportHero />
    </div>
  );
};

export default CoursesPage;
