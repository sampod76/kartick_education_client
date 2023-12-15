"use client";

import { Layout, Menu, MenuProps } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { sidebarItems } from "@/constants/sidebarItems";
import Logo from "../../Logo";
import React, { useEffect, useState } from "react";
import SideBarHome from "./SideBarHome";
import Link from "next/link";
import DropDown from "./DropDown";

const { Header } = Layout;

const homeNavItems: MenuProps["items"] = [
  {
    label: <Link href={`/`}> Homes</Link>,

    key: `/Home`,
  },
  {
    key: "Learning",
    label:  <DropDown>Learning</DropDown>,
  },
  {
    key: "assessment",
    // label: <Link href="/">Assetment</Link>,
    label: <DropDown>Assessment</DropDown>,
  },
  {
    key: "analysis",
    label: <DropDown>Analyses</DropDown>,
  },
  {
    key: "contact",
    label: <Link href="/">Contact Us</Link>,
  },
];
const NavbarPublic = () => {
  const screens = useBreakpoint();
  // const [isClient, setClient] = useState(false);

  // useEffect(() => {
  //   setClient(true);
  // }, []);

  return (
    <nav className="bg-[white] text-black py-[1em] px-[2em] 
    flex align-center justify-between lg:justify-normal gap-2 lg:gap-[5rem]">
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
