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
        className=" text-black py-[3px] md:py-[1em] px-[1em] 
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
            boxShadow:"none"
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
        <Link href="/subscription" className="h-[48px] w-[130px] text-slate-700 px-3 py-3 font-[600] border border-secondary rounded-md hover:bg-secondary hover:text-white uppercase">Membership</Link>
        </div>
    </div>
  );
};

export default NavbarPublic;
