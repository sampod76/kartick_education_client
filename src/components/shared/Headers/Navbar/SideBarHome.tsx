"use client";
import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";

import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";
import Logo from "../../Logo";
import MenuUI from "@/components/ui/NavUI/MenuUI";
import homeSIdeItems from "@/constants/homeSideBarItems";
import Link from "next/link";
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";

const SideBarHome = ({ userInfo }: { userInfo: any }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // const [selectedItem, setSelectedItem] = useState<null | any>(null);
  const sideItemsHome = homeSIdeItems(userInfo?.role ? userInfo.role : null)
  return (
    <>
      <Space className="text-2xl flex text-gray-200">
        {
          userInfo?.email ? (
            <UserAvatarUI />
          ) : (
            <div className="flex font-[700] max-h-[2.7rem] lg:max-h-[3.3rem]">
              <Link href="/login">
                <a className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-[#5F8122] group px-5 py-2 bg-white rounded-[36px] uppercase">
                  <span className="relative z-10 text-[#5F8122] group-hover:text-white text-lg duration-500">
                    Login
                  </span>
                  <span className="absolute w-full h-full bg-[#5F8122] -left- top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                  <span className="absolute w-full h-full bg-[#5F8122] -right- top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                </a>
              </Link>
            </div>
          )
        }
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
        <MenuUI itemData={sideItemsHome} setOpen={setOpen} />
      </Drawer>
    </>
  );
};

export default SideBarHome;
