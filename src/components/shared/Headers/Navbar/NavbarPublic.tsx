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
    <div className=" bg-[white] text-black py-[1em] px-[2em]">
      <nav className=" flex justify-between">
        <Logo />
     
        <Menu
          mode="horizontal"
          className="hidden lg:flex"
          disabledOverflow
          items={sidebarItems("homeNav")}
        />
        <div className="flex lg:hidden">
          <SideBarHome></SideBarHome>
        </div>
      </nav>
    </div>
  );
};

export default NavbarPublic;
