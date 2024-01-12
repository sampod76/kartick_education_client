"use client";
import dynamic from "next/dynamic";
import React from "react";
import {
  FacebookFilled,
  TwitterCircleFilled,
  PlusOutlined,
  MinusOutlined,
  // LinkedInCircleFilled
  LinkedinFilled,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { USER_ROLE } from "@/constants/role";
import { userInfo } from "os";
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";

const TopBar = () => {

  const userInfo =getUserInfo() as IDecodedInfo
  // const screens = useBreakpoint();
  // const userLoggedIn = {
  //   name: "",
  //   role: "admin",
  //   email: "sarwarasik@gmail.com",
  // };
  const userLoggedIn = getUserInfo() as any
  // console.log(
  //   "🚀 ~ file: TopBar.tsx:28 ~ TopBar ~ userLoggedIn:",
  //   userLoggedIn
  // );

  return (
    <div
      className="py-1 lg:py-2 bg-primary text-white px-2 lg:px-4 block lg:flex items-center justify-between gap-5"
      // style={{
      // fontSize:"36px",
      //   background: "#5371FF",
      //   padding: `0.5rem ${screens.sm ? "0.5rem" : "1rem"}`,
      //   display: `${screens.sm ? "flex" : "block"}`,
      //   justifyContent: "space-between",
      //   color: "white",
      // }}
    >
      <section className="hidden lg:flex lg:flex-col">
        <h2 className="font-[800] text-md lg:text-[17px]">
          ATTEND ORIENTATION! IBL SCHOOL STORE!{" "}
        </h2>
        <div className="font-[700] flex gap-2 text-[15px]">
          <h4 className=" "> 1866 303121 231</h4>
          <h4>info.iblossomelearn@gmail.com</h4>
        </div>
      </section>
      <section className="flex justify-between gap-3 mt-5 lg:mt-0 ">
        <div className="flex gap-2 text-2xl">
          <FacebookFilled
            style={{
              fontSize: "36px",
            }}
          />
          <TwitterCircleFilled
            style={{
              fontSize: "36px",
            }}
          />
          <LinkedinFilled
            style={{
              fontSize: "36px",
            }}
          />
          {/* <LinkedinOutlined /> */}
          <YoutubeOutlined
            style={{
              fontSize: "36px",
              color: "red",
            }}
          />
        </div>
        {userLoggedIn?.email ? (
          <UserAvatarUI />
        ) : (
          <div className="flex gap-3 font-[700]">
            <Link
              className="py-3 px-5 lg:px-7  rounded-tl-[20px] rounded-br-[20px] bg-secondary border-2 border-white"
              href="/signup"
            >
              Register
            </Link>
            <Link
              className="py-3 px-5 lg:px-7 rounded-tl-[20px] rounded-br-[20px] bg-white text-secondary border-2 border-secondary ms-1"
              href="/login"
            >
              Login
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

// export default TopBar;
export default dynamic(() => Promise.resolve(TopBar), {
   ssr: false,
 });