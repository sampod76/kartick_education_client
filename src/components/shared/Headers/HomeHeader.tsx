'use client'
import React from "react";
import NavbarPublic from "./Navbar/NavbarPublic";
import BannerSection from "@/components/Home/Heros/BannerSection";
// import TopBar from "./TopBar";
const TopBar = React.lazy(
  () => import("./TopBar")
);

const HomeHeader = () => {
  return (
    <div >
      <section className="sticky md:-top-[4.3rem] top-0 z-40 ">
      <TopBar />
        <NavbarPublic />
      </section>
      <section className="-mt-[7rem] bg-[#BEDDF9]">
        <div className="w-full min-h-[7rem]"></div>
        <BannerSection/>
      </section>
    </div>
  );
};

export default HomeHeader;
