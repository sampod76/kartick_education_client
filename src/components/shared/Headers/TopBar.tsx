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

const TopBar = () => {
  return (
    <div className="py-2 bg-primary text-white px-2 lg:px-4 block lg:flex items-center justify-between">
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
            className="py-3 px-7  rounded-tl-[20px] rounded-br-[20px] bg-secondary border-2 border-white"
            href="/"
          >
            Register
          </Link>
          <Link
            className="py-3 px-7 rounded-tl-[20px] rounded-br-[20px] bg-white text-secondary border-2 border-secondary"
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
