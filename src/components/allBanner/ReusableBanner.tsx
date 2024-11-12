"use client";
import SupportDonateHelpDesk from "@/components/widgets/SupportDonate";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";
interface IParams {
  banner: {
    bannerImagePath: string;
    bannerText: string;
    className?: string;
  };

  headerText?: {
    text: string;
    className?: string;
  };
  bodyText: {
    headerText?: string;
    text: string;
    className?: string;
  };
}
export default function ReusableBanner({
  banner,
  headerText,
  bodyText,
}: IParams) {
  return (
    <div className="">
      <div className="">
        {/* <div
          style={{
            backgroundImage: "url('/banner/careropp.png')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover", // Add this line for covering the full height
            height: "33vh",
          }}
        ></div> */}
        <div className="relative">
          <Image
            src={banner.bannerImagePath}
            width={1900}
            height={750}
            alt=""
            className={cn(
              "w-full overflow-auto lg:w-[100vw] h-full lg:h-[50vh]",
              banner.className
            )}
          />
          <h1
            className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 lg:px-10 py-3 rounded-[35px] bg-white bg-opacity-50 w-fit mx-auto text-black whitespace-nowrap text-xl lg:text-2xl",
              headerText?.className
            )}
          >
            {headerText?.text}
          </h1>
        </div>
        <div className="h-10 bg-primary "></div>
        <div className="flex mb-20 flex-col justify-center items-center py-7 space-y-5 lg:space-y-12 text-center px-5 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="text-3xl lg:text-4xl mt-2 lg:mt-6 font-bold"
          >
            {bodyText.headerText || headerText?.text}
          </h1>
          <p
            data-aos="zoom-in"
            className={cn("bodyText lg:pb-6", bodyText.className)}
          >
            {bodyText.text}
          </p>
          <div className="  self-center w-80 mt-6 rounded-3xl p-1 border-2 border-primary">
            <button className="bg-primary p-2 rounded-3xl px-5  text-[12px] lg:text-base text-white  w-full ">
              <p className="text-xl">Ready, Set, Go</p>
            </button>
          </div>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
