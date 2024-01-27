import CourseStatistics from "@/components/Course/CourseStatistics";
import MilestoneList from "@/components/Course/MilestoneList";
import CartDrawer from "@/components/Home/Cart/CartDrawer";


import BannerCourses from "@/components/Home/Heros/BannerCourses";
import SupportHero from "@/components/Home/Heros/SupportHero";
// import NavbarPublic from "@/components/shared/Headers/Navbar/NavbarPublic";

import TopBar from "@/components/shared/Headers/TopBar";
// const TopBar = React.lazy(() => import("@/components/shared/Headers/TopBar"));
const NavbarPublic = React.lazy(
  () => import("@/components/shared/Headers/Navbar/NavbarPublic")
);
const Footer = React.lazy(() => import("@/components/Home/Footer"));

import { Layout, Row, Space, Spin } from "antd";
import React, { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <div className="">

      <div className="sticky -top-[5.2rem] top z-40">
        <TopBar />
        <NavbarPublic />
      </div>

      {/* <BannerCourses /> */}
      {/* <BannerCourses /> */}
      {/* <CourseStatistics /> */}
        {/* <CartDrawer /> */}

      <main style={{ minHeight: "100vh" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
