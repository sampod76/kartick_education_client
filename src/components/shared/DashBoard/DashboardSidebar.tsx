import React from "react";
import { Layout, Menu } from "antd";

import Link from "next/link";
import { dashboardItems } from "@/constants/dashBoardItems";
import { USER_ROLE } from "@/constants/role";

import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../Logo";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";

const { Sider } = Layout;

const DashboardSidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: any;
}) => {
  const userInfo =getUserInfo() as any
  return (
    <Sider
      // collapsible
      className="bg-primar"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      style={{
        overflow: "auto",
        height: "110vh",
        position: "sticky",
        // position: "fixed",
        overflowY: "auto",
        zIndex: 40,
        left: 0,
        top: 0,
        bottom: 0,
        padding: "8px 0 0 0",
        marginRight: "10px",
        // width: "70vw",
        background: "white",
        // background:"",
        // overflow: "auto",
        // height: "100vh",
        // position: "fixed",
        // left: 0,
        // top: 0,
        // bottom: 0,
      }}
    >
      {/* {!collapsed ? (
        <section className="ml-6 text-3xl mt-3 flex gap-2 items-center">
          <UserOutlined className="text-2xl " />
          <Link
            href={`/admin/`}
            className={`font-semibold font-serif text-primary`}
          >
            E.D.M
          </Link>
        </section>
      ) : (
        <UserOutlined className="text-2xl ml-7 mt-3" />
      )} */}

      <Logo />

      <Menu
        // theme="light"

        defaultSelectedKeys={["1"]}
        style={{
          overflowY: "auto",
        }}
        mode="inline"
        // items={dashboardItems(userInfo?.role)}
        items={dashboardItems(USER_ROLE.SELLER)}
      />
    </Sider>
  );
};

export default DashboardSidebar;
