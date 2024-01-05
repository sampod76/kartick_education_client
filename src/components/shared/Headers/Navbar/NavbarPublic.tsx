"use client";
import { Menu } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Logo from "../../Logo";
import React from "react";
import SideBarHome from "./SideBarHome";
import { homeNavItems } from "@/constants/homeNabItems";
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";

const NavbarPublic = () => {
  // const screens = useBreakpoint();

  return (
    <div className="">
      <nav
        className=" bg-transparent backdrop-blur shadow-xl text-black py-[1em] px-[2em] 
    flex align-center justify-between  gap-2 "
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
    </div>
  );
};

export default NavbarPublic;
