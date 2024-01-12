"use client";
import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";

import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";
import Logo from "../../Logo";
import MenuUI from "@/components/ui/NavUI/MenuUI";
import homeSIdeItems from "@/constants/homeSideBarItems";

const SideBarHome = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // const [selectedItem, setSelectedItem] = useState<null | any>(null);

  return (
    <>
      <Space className="text-2xl ">
        {!open ? (
          <MenuUnfoldOutlined onClick={showDrawer} />
        ) : (
          <CloseOutlined />
        )}
      </Space>
      <Drawer
        // title="Drawer with extra actions"
        placement={"right"}
        width={300}
        onClose={onClose}
        open={open}
        extra={
          <div className="" onClick={onClose}>
          <Logo />
        </div>
        }
      >
        <MenuUI itemData={homeSIdeItems(onClose)} />
      </Drawer>
    </>
  );
};

export default SideBarHome;
