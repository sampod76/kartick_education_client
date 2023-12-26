import CourseStatistics from "@/components/Course/CourseStatistics";
import MilestoneList from "@/components/Course/MilestoneList";
import Footer from "@/components/Home/Footer";
import BannerCourses from "@/components/Home/Heros/BannerCourses";
import SupportHero from "@/components/Home/Heros/SupportHero";
import NavbarPublic from "@/components/shared/Headers/Navbar/NavbarPublic";
import TopBar from "@/components/shared/Headers/TopBar";

import { Layout, Row, Space, Spin } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <TopBar />
      <NavbarPublic />
      <BannerCourses />
      {/* <BannerCourses /> */}
      <main style={{ minHeight: "100vh" }}>{children}</main>

      <CourseStatistics />

    
      <SupportHero />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
