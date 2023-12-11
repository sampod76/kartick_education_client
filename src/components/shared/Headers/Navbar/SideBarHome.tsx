"use client"
import React, { useState } from "react";
import { Button, Drawer, Menu, Space } from "antd";


import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";
import Logo from "../../Logo";
import { sidebarItems } from "@/constants/sidebarItems";

const SideBarHome = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [selectedItem, setSelectedItem] = useState<null | any>(null);

  return (
    <>
      <Space className="text-2xl">
        {!open ? (
          <MenuUnfoldOutlined onClick={showDrawer} />
        ) : (
          <CloseOutlined />
        )}
      </Space>
      <Drawer
        className="bg-secondary"
        // title="Drawer with extra actions"
        placement={"right"}
        width={400}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button className="bg-secondary border-none " onClick={onClose}>
              <Logo />
            </Button>
          </Space>
        }
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedItem]}
          style={{ borderRight: "none" }}
          items={sidebarItems("homeSidBar")}
        />
      </Drawer>
    </>
  );
};

export default SideBarHome;
