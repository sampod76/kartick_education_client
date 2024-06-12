"use client";
import React from "react";
import NavbarPublic from "./Navbar/NavbarPublic";
import BannerSection from "@/components/Home/Banner&hero/BannerSection";
import TopBar from "./TopBar";
// const TopBar = React.lazy(
//   () => import("./TopBar")
// );

const HomeHeader = () => {
  return (
    <div className="sticky -top-[0rem]  lg:-top-[0.4rem] z-40">
      {/* <TopBar /> */}
      <NavbarPublic />
      <hr />
    </div>
  );
};

export default HomeHeader;
