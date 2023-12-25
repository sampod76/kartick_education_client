import React from "react";

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
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";

const { Header } = Layout;

const  DashboardNavBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: any;
}) => {
  //   const userInfo = getUserInfo() as any;
  const userLoggedIn = USER_ROLE.ADMIN;
  // console.log(userLoggedIn);

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        color: "#000000",
        backgroundColor: "#ffffff",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        paddingInline: "3px",
        // position:"absolute",
        // top:0,
        // width:"100%",
        // zIndex:100,
      }}
    >
      <section style={{ display: "flex", alignItems: "center" }}>
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
      </section>

      <section
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <UserAvatarUI />
      </section>
    </Header>
  );
};

export default DashboardNavBar;
