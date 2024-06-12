"use client";
import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";

import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";
import Logo from "../../Logo";
import MenuUI from "@/components/ui/NavUI/MenuUI";
import homeSIdeItems from "@/constants/homeSideBarItems";
import Link from "next/link";
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";

const SideBarHome = ({ userInfo, userInfoLoading }: { userInfo: any, userInfoLoading: boolean }) => {
  const [open, setOpen] = useState(false);
  // const [userInfoLoading, setUserInfoLoading] = useState(true);
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
      <Space className="text-2xl flex text-gray-100">
        {userInfoLoading ? (
          <div className="bg-white w-[50px] h-[50px] rounded-full shadow-md animate-pulse"></div>
        ) :
          userInfo?.email ? (
            <UserAvatarUI />
          ) : (
            <div className="flex font-[700] max-h-[2.7rem] lg:max-h-[3.3rem]">
              <Link
                href="/login"
                className="cursor-pointer font-semibold overflow-hidden relative z-100 border bg-gray-200  group px-5 md:px-3 py- md:py-0 lg:py-1 xl:py-2   rounded-lg uppercase "
              >
                <span className="relative z-10 text-black  group-hover:text-white text-lg md:text-sm lg:text-sm  xl:text-lg duration-500">
                  Login
                </span>
                
              </Link>
            </div>
          )
        }
        {!open ? (
          <MenuUnfoldOutlined style={{color:"blue"}} onClick={showDrawer} />
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
