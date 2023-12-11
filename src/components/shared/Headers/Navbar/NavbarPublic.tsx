"use client";

import { Layout, Menu } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { sidebarItems } from "@/constants/sidebarItems";
import Logo from "../../Logo";
import React, { useEffect, useState } from "react";
import SideBarHome from "./SideBarHome";

const { Header } = Layout;

const NavbarPublic = () => {
  const screens = useBreakpoint();
  // const [isClient, setClient] = useState(false);

  // useEffect(() => {
  //   setClient(true);
  // }, []);

  return (
    <nav className="bg-[white] text-black py-[1em] px-[2em] 
    flex align-center gap-2 lg:gap-[5rem]">
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
        items={sidebarItems("homeNav")}
      />
      <div className="flex lg:hidden">
        <SideBarHome></SideBarHome>
      </div>
    </nav>
  );
};

export default NavbarPublic;
