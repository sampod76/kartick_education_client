'use client'
import Footer from "@/components/Home/Footer";
import BannerSection from "@/components/Home/Banner&hero/BannerSection";
import SupportHero from "@/components/Home/Banner&hero/SupportHero";

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
import { AnimatePresenceWrapper } from "@/components/framer_motion/AnimatePresence";
import About from "@/components/Home/About/About";

const HomePage = () => {
  return (
    <div className="">
      <HomeHeader />

      <div className="-mt-[6rem] ">
        <div className="w-full min-h-[5rem]"></div>
        <BannerSection />
        {/* <AnimatePresenceWrapper>
          <div className="bg-transparent bg-gradient-to-b from-[#1C478D]  to-[#B1C4E2] backdrop-blur-sm font-bold text-[3vw] lg:text-[1.8vw] text-nowrap text-white  -bottom-[2rem]  right-[40%] px-5  lg:px-9  py-7 rounded-full cursor-pointer 
      -mt-[3rem] w-[90%]  lg:max-w-[55%] mx-auto text-center
      ">
            CULTIVATING CONFIDENCE , CULTIVATING SUCCESS
          </div>
        </AnimatePresenceWrapper> */}
      </div>

      <main className="bg-[#A2B0F321 pb-10 min-h-screen">
        <CartDrawer />  
        {/* <CommonCourse /> */}
        <CoursesTab />
        <SupportHero />
        <About/>
        {/* <ShortOverViewHomePage /> */}
        <MilestoneHomeFeatures />
        {/* <MilestoneHomeFeatures2 /> */}
        {/* <TestimonialMain />
         <Programmes /> 
        <AdvanceHomeClass /> */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
