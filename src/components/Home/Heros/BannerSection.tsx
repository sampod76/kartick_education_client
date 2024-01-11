'use client'
import React from "react";
import bannerBG from "@/assets/banner/bannerBG.png";
import treeBoy from "@/assets/banner/treeBoy.png";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";

const BannerSection = () => {
  return (
    <div
      className="block lg:flex justify-between place-items-end bg-blue-20 min-h-[45rem] text-left pt-[3rem] "
      style={{
        backgroundImage: `url('/banner/bannerBG.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <section className="w-full lg:w-[60%]  px-[59px] py-[3rem]">
        <div className="text-[2rem]  lg:text-[4vw] xl:text-8xl font-[800] text-black uppercase">
          <h1>Feel bored or anxious</h1>
          <h1 className="">
            About <span className="text-secondary whitespace-nowrap">Math or English ?</span> 
          </h1>
        </div>
        <p className="mt-[2rem] text-[1.5rem]  lg:text-5xl leading-[2rem]">
          Overcome challenges with
          <span className="text-secondary"> iBlossomLearn </span> classes. Your
          adventure in learning awaits!
        </p>
        <div className="mt-[3rem] max-h-[3.8rem] flex">
          <input
            type="text"
            placeholder="Search here"
            className=" border-2 outline-none text-xl text-[#949494] px-3 border-primary rounded-l-[8px] w-full lg:w-[512px] p-2 bg-[#ADADFA40] h-[3.8rem]"
          />
          <h3 className="bg-primary p-[16px] rounded-r-[8px] max-w-[3.7rem] h-[3.8rem]">
            <SearchOutlined
              style={{
                minHeight: "24px",
                width: "24px",
                color: "white",
                fontWeight: "700",
              }}
            />
          </h3>
        </div>

        <div className="mt-[5rem] flex flex-col lg:flex-row xl:flex-row gap-3 text-[1.2rem] text-white font-[700] uppercase">
          <Link
            className="w-full lg:w-[13rem] xl:w-[13rem] bg-primary  p-3 rounded-[8px]"
            href="/"
          >
            Get started new
          </Link>
          <Link
            className="w-full lg:w-[21rem] xl:w-[21rem] bg-secondary  p-3 rounded-[8px]"
            href="/"
          >
            FREE READING FOR ANY SEASON
          </Link>
        </div>
      </section>
      <section className="w-full lg:w-[40%] mt-0 hidden lg:flex justify-end lg:-mt-[2rem] ">
        <Image
          className="w-[80%] lg:w-[60%] h-full lg:h-[38rem]   py-2"
          src={treeBoy}
          height={602}
          width={510}
          alt="treeboy"
        />
      </section>
    </div>
  );
};

export default BannerSection;
