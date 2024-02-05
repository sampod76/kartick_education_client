import Footer from "@/components/Home/Footer";
import BannerSection from "@/components/Home/Heros/BannerSection";
import SupportHero from "@/components/Home/Heros/SupportHero";
import Success from "@/components/Home/Success/Success";
import TestimonialMain from "@/components/Home/Testimonial/TestimonialMain";
import CommonCourse from "@/components/Home/commonCourse/CommonCourse";
import CoursesTab from "@/components/Home/coureses/CoursesTab";
import Programmes from "@/components/Home/programms/Programmes";
import HomeHeader from "@/components/shared/Headers/HomeHeader";
import CartDrawer from "@/components/Home/Cart/CartDrawer";
import React from "react";
import { EllipsisMiddle } from "@/utils/CutTextElliples";

// const CoursesTab = React.lazy(
//   () => import("@/components/Home/coureses/CoursesTab")
// );
// const HomeHeader = React.lazy(
//   () => import("@/components/shared/Headers/HomeHeader")
// );
// const BannerSection = React.lazy(
//   () => import("@/components/Home/Heros/BannerSection")
// );
// const SupportHero = React.lazy(
//   () => import("@/components/Home/Heros/SupportHero")
// );
// const Success = React.lazy(
//   () => import("@/components/Home/Success/Success")
// );
// const Programmes = React.lazy(
//   () => import("@/components/Home/programms/Programmes")
// );
// const TestimonialMain = React.lazy(
//   () => import("@/components/Home/Testimonial/TestimonialMain")
// );
// const CommonCourse = React.lazy(
//   () => import("@/components/Home/commonCourse/CommonCourse")
// );
// const Footer = React.lazy(
//   () => import("@/components/Home/Footer")
// );
const HomePage = () => {

  return (
    <div className="">

      <HomeHeader />

      <div className="-mt-[6rem] bg-[#BEDDF9]">
        <div className="w-full min-h-[5rem]"></div>
        <BannerSection />
      </div>
      <main className="bg-[#A2B0F321] pb-10 min-h-screen">

        <CartDrawer />
        <CommonCourse />
        <CoursesTab />
        <SupportHero />
        <Success />
        <TestimonialMain />
        <Programmes />
      </main>
      <Footer />
    
    </div>
  );
};

export default HomePage;
