import React from "react";

import CourseStatistics from "@/components/Course/CourseStatistics";
import MilestoneList from "@/components/Course/MilestoneList";
import SupportHero from "@/components/Home/Heros/SupportHero";
import TopBar from "@/components/shared/Headers/TopBar";
import NavbarPublic from "@/components/shared/Headers/Navbar/NavbarPublic";
import BannerCourses from "@/components/Home/Heros/BannerCourses";

const CoursesPage = () => {
  return (
    <div className="mt-7">
      {/* <TopBar />
      <NavbarPublic /> */}
      <BannerCourses />
      <CourseStatistics />

      <MilestoneList />
      <SupportHero />
    </div>
  );
};

export default CoursesPage;
