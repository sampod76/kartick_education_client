"use client";
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
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";

const TopBar = () => {
  const userLoggedIn = USER_ROLE.ADMIN;

  return (
    <div className="py-2 bg-primary text-white px-2 lg:px-4 block lg:flex items-center justify-between gap-5">
      <section>
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
          <FacebookFilled />
          <TwitterCircleFilled />
          <LinkedinFilled />
          {/* <LinkedinOutlined /> */}
          <YoutubeOutlined
            style={{
              color: "red",
            }}
          />
        </div>
        <div>
          <UserAvatarUI />
        </div>
        <div className="flex gap-3 font-[700]">
          <Link
            className="py-3 px-5 lg:px-7  rounded-tl-[20px] rounded-br-[20px] bg-secondary border-2 border-white"
            href="/"
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
      </section>
    </div>
  );
};

export default TopBar;
