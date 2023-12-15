"use client";
import { Menu } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Logo from "../../Logo";
import React from "react";
import SideBarHome from "./SideBarHome";
import { homeNavItems } from "@/constants/homeNabItems";

const NavbarPublic = () => {
  const screens = useBreakpoint();

  return (
    <nav
      className="bg-[white] text-black py-[1em] px-[2em] 
    flex align-center justify-between lg:justify-normal gap-2 lg:gap-[5rem]"
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
        }}
        disabledOverflow
        // items={sidebarItems("homeNav")}
        items={homeNavItems}
      />
      <div className="flex lg:hidden">
        <SideBarHome></SideBarHome>
      </div>
    </nav>
  );
};

export default NavbarPublic;
