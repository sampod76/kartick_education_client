"use client";
import { Button, Menu } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Logo from "../../Logo";
import React from "react";
import SideBarHome from "./SideBarHome";
import { homeNavItems } from "@/constants/homeNabItems";
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import Link from "next/link";

const NavbarPublic = () => {
  // const screens = useBreakpoint();

  return (
    <div className="bg-transparent backdrop-blur  block lg:flex  items-center justify-between">
      <nav
        className=" text-black py-[3px] md:pt-[0.9em] px-[1em] 
    flex align-center justify-between gap-[5rem] "
      >
        <Logo />

        <Menu
          mode="horizontal"
          className="hidden lg:flex"
          style={{
            // color:"#5371FF"
            fontWeight: "700",
            fontSize: "15px",
            fontFamily: "fantasy",
            // backdropBlur:"blur(8px)"
            // display:`${screens.sm ? "flex":"none"}`
            background: "none",
            backdropFilter: "blur(8px)",
            boxShadow: "none",
          }}
          disabledOverflow
          // items={sidebarItems("homeNav")}
          items={homeNavItems}
        />

        <div
          className="flex lg:hidden"
          // style={{
          //   display: `${screens.sm ? "none" : "flex"}`,
          // }}
        >
          <SideBarHome></SideBarHome>
        </div>
      </nav>

      <div className="hidden lg:flex mr-2">
        <Link
          href="/subscription"
          className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-primary group px-8 py-3 bg-white rounded"
        >
          <span className="relative z-10 text-primary group-hover:text-white text-xl duration-500">
            Membership
          </span>
          <span className="absolute w-full h-full bg-primary -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-primary -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </Link>
      </div>
    </div>
  );
};

export default NavbarPublic;
