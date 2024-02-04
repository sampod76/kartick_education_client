"use client";
import "./NaveBar.module.css";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  message,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Logo from "../Logo";
import { USER_ROLE } from "@/constants/role";
// import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import { IDecodedInfo, getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storageKey";
const UserAvatarUI = React.lazy(
  () => import("@/components/ui/NavUI/UserAvatarUI")
);
const { Header } = Layout;
const styles = {
  main: {
    backgroundColor: "#f1f1f1",
    width: "100%",
  },
  inputText: {
    padding: "10px",
    color: "red",
  },
};
const DashboardNavBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: any;
}) => {
  const router = useRouter();
  //   const userInfo = getUserInfo() as any;
  // const userLoggedIn = getUserInfo() as any
  // const userInfo =getUserInfo() as IDecodedInfo
  // console.log(userLoggedIn);
  /* 
  const [isNavbarFixed, setNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarFixed(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 
  */
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={"/profile"}> Profile</Link>,
    },
    {
      key: "2",
      label: <Link href={"/dashboard"}>Dashboard</Link>,
    },
    {
      key: "3",
      label: (
        <Button
          onClick={() => {
            removeUserInfo(authKey);
            router.push("/login");
          }}
          type="dashed"
          style={{color:'black'}}
        >
          Log out
        </Button>
      ),
    },
  ];
  return (
    <nav>
      <Header
        style={{
          display: "flex",

          justifyContent: "space-between",
          color: "#000000",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          paddingInline: "3px",
          marginLeft: "0.5rem",
          marginRight: "0.5rem",

          borderRadius: "0 0.5rem 0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          {/* <Logo></Logo> */}
        </div>

        <div

        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   gap: "5px",
        // }}
        >
          <UserAvatarUI />
        </div>
      </Header>
    </nav>
  );
};

export default DashboardNavBar;
