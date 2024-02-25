import React, { useState } from "react";
import { Layout, Menu } from "antd";

import Link from "next/link";
import { dashboardItems } from "@/constants/dashBoardItems";
import { USER_ROLE } from "@/constants/role";

import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../Logo";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import logoImage from "@/assets/Logo/logOnly.png";
import Image from "next/image";
const { Sider } = Layout;

const DashboardSidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: any;
}) => {
  const userInfo = getUserInfo() as any
  const [selectedKey, setSelectedKey] = useState('1');

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };
  const clipPathStyle = {
    clipPath: selectedKey === '1' ? 'polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)' : 'none',
    // background: "white"
  };

  return (
    <Sider
      // collapsible
      className="bg-primar"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={300}
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
        // background: "white",
        // background:"",
        // overflow: "auto",
        // height: "100vh",
        // position: "fixed",
        // left: 0,
        // top: 0,
        // bottom: 0,
        // background: "#1D2327",
        color: "white",

      }}
    >
      {/* {!collapsed ? (
        <div className="ml-6 text-3xl mt-3 flex gap-2 items-center">
          <UserOutlined className="text-2xl " />
          <Link
            href={`/admin/`}
            className={`font-semibold font-serif text-primary`}
          >
            E.D.M
          </Link>
        </div>
      ) : (
        <UserOutlined className="text-2xl ml-7 mt-3" />
      )} */}

      {/* <Logo /> */}
      <Link href='/'>
        <Image src={logoImage} height={120} width={200} className={`${collapsed ? " w-[46px] h-[36px]" : "max-w-[80px] h-[56px]"}  
         max-w-[80px] h-[56px] mx-auto`} alt="Logo" />
      </Link>
      <Menu
        // theme="light"

        defaultSelectedKeys={["1"]}
        style={{
          overflowY: "auto",
          // background: "#1D2327",
          // color: "white",
          fontWeight: "500",
          marginTop: "36px",
          fontSize: "16px",
          paddingInline: '10px',

          // ...clipPathStyle,
        }}
        mode="inline"
        theme="dark"
        items={dashboardItems(userInfo?.role)}
        onSelect={handleMenuSelect}
      // items={dashboardItems(USER_ROLE.SELLER)}
      />
      <div style={{ ...clipPathStyle }}>

      </div>
    </Sider>
  );
};

export default DashboardSidebar;
