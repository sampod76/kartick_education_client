'use client'
import Footer from "@/components/Home/Footer";
import BannerSection from "@/components/Home/Heros/BannerSection";
import SupportHero from "@/components/Home/Heros/SupportHero";

import TestimonialMain from "@/components/Home/Testimonial/TestimonialMain";
import CommonCourse from "@/components/Home/commonCourse/CommonCourse";
import CoursesTab from "@/components/Home/coureses/CoursesTab";
import Programmes from "@/components/Home/AdvanceClass/AdvanceClassHome";
import HomeHeader from "@/components/shared/Headers/HomeHeader";
import CartDrawer from "@/components/Home/Cart/CartDrawer";
import React from "react";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import ShortOverViewHomePage from "@/components/Home/ShortOverView/ShortOverViewHome";
import AdvanceHomeClass from "@/components/Home/AdvanceClass/AdvanceClassHome";
import MilestoneHomeFeatures from "@/components/Home/Milestonehome/MilestoneHomeFeatures";
import MilestoneHomeFeatures2 from "../components/Home/Milestonehome/MilestoneFetures2";

const HomePage = () => {
  return (
    <div className="">
      <HomeHeader />

      <div className="-mt-[6rem] bg-[#BEDDF9">
        <div className="w-full min-h-[5rem]"></div>
        <BannerSection />
      </div>

      <main className="bg-[#A2B0F321 pb-10 min-h-screen">
        <CartDrawer />
        {/* <CommonCourse /> */}
        <CoursesTab />
        <SupportHero />
        {/* <ShortOverViewHomePage /> */}
        <MilestoneHomeFeatures />
        <MilestoneHomeFeatures2 />
        <TestimonialMain />
        {/* <Programmes /> */}
        <AdvanceHomeClass />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
