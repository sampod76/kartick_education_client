"use client";

import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";

// import { sidebarItems } from "@/constants/dashBoardItems";
import { USER_ROLE } from "@/constants/role";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.ADMIN;
  const userInfo =getUserInfo() as IDecodedInfo
  // console.log(role);

  // Function to handle sidebar collapsing based on screen width
  const handleSidebarCollapse = () => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    // Initialize sidebar state based on the initial screen width
    handleSidebarCollapse();
    // Attach an event listener to handle changes in screen width
    window.addEventListener("resize", handleSidebarCollapse);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleSidebarCollapse);
    };
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: ".5rem",
          padding: "10px 0px",
        }}
      >
        TDN
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        // items={sidebarItems(userInfo?.role)}
      />
    </Sider>
  );
};

export default SideBar;
