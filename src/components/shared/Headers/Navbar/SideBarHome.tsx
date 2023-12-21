"use client";
import React, { useState } from "react";
import { Button, Drawer,  Space } from "antd";

import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";
import Logo from "../../Logo";
import MenuUI from "@/components/ui/NavUI/MenuUI";
import { homeSIdeItems } from "@/constants/homeSideBarItems";

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
      <Space className="text-2xl ">
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
        <MenuUI itemData={homeSIdeItems} />
      </Drawer>
    </>
  );
};

export default SideBarHome;
