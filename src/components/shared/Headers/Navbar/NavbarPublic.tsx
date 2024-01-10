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
    <div className="">
      <nav
        className="bg-transparent backdrop-blur  text-black py-[1em] px-[2em] 
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
            // backdropFilter: "blur(8px)",
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

        <div className="hidden lg:flex ">
        <Link href="/" className="h-[48px] w-[130px] text-slate-700 px-3 py-3 font-[600] border border-white rounded-md hover:bg-secondary hover:text-white uppercase">Membership</Link>
        </div>

      </nav>
    </div>
  );
};

export default NavbarPublic;
