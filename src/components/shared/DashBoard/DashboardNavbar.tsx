"use client";
import "./NaveBar.module.css";
import React from "react";

import Link from "next/link";
import { Button, Layout, MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { USER_ROLE } from "@/constants/role";
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import { removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storageKey";

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
        </section>

        <section>
          {/* <UserAvatarUI /> */}
        </section>
      </Header>
    </nav>
  );
};

export default DashboardNavBar;
