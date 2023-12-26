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

const TopBar = () => {
  const screens = useBreakpoint();
  return (
    <div
      style={{
        background: "#5371FF",
        padding: `0.5rem ${screens.sm ? "0.5rem" : "1rem"}`,
        display: `${screens.sm ? "flex" : "block"}`,
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <section>
        <h2 className="font-[800] text-[17px]">
          ATTEND ORIENTATION! IBL SCHOOL STORE!{" "}
        </h2>
        <div className="font-[700] flex gap-2 text-[15px]">
          <h4 className=" "> 1866 303121 231</h4>
          <h4>info.iblossomelearn@gmail.com</h4>
        </div>
      </section>
      <section className="flex justify-between gap-3">
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
        <div className="flex gap-2 font-[700]">
          <Link
            style={{
              background: "#FB8500",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              paddingLeft: "1.75rem",
              paddingRight: "1.75rem",
              borderWidth: "2px",
              borderColor: "#ffffff",
            }}
            href="/"
          >
            Register
          </Link>
          <Link
            href="/login"
            style={{
              background: "white",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              paddingLeft: "1.75rem",
              paddingRight: "1.75rem",
              borderWidth: "2px",
              borderColor: "#5371FF",
              color: "#5371FF",
            }}
          >
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TopBar;
