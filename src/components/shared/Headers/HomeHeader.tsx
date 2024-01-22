'use client'
import React from "react";
import NavbarPublic from "./Navbar/NavbarPublic";
import BannerSection from "@/components/Home/Heros/BannerSection";
import TopBar from "./TopBar";
// const TopBar = React.lazy(
//   () => import("./TopBar")
// );

const HomeHeader = () => {
  return (
    <div  className="sticky  -top-[5rem] z-40">
      <TopBar />
        <NavbarPublic />
  
    </div>
  );
};

export default HomeHeader;



