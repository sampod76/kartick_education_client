/* eslint-disable react/no-unescaped-entities */
"use client";
import SupportDonateHelpDesk from "@/components/widgets/SupportDonate";
import Image from "next/image";
import React from "react";

export default function Comprehensive() {
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
            src={"/banner/essential.png"}
            width={1900}
            height={750}
            alt=""
            className="w-full overflow-auto lg:w-[100vw] h-full lg:h-[60vh]"
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 lg:px-10 py-3 rounded-[35px] bg-white bg-opacity-50 w-fit mx-auto text-black whitespace-nowrap text-xl lg:text-2xl">
            IBlossomLearn Essential Pathways
          </h1>
        </div>
        <div className="h-10 bg-primary "></div>
        <div className="flex mb-20 flex-col justify-center items-center py-7 space-y-5 lg:space-y-12 text-center px-5 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="text-3xl lg:text-4xl mt-2 lg:mt-6 font-bold"
          >
            IBlossomLearn Essential Pathways
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            Welcome to BlossomLearn Essential Pathways, an exclusive integration
            within our iBlossomLearn curriculum. This advanced program is
            designed to provide students with a comprehensive and engaging
            educational experience, blending core academic subjects with
            personalized skill-building activities. Through our grammar and
            literacy partner, BlossomLearn, students receive targeted practice
            in Math, Language Arts, Science, and Social Studies, ensuring they
            <br />
            master essential concepts and skills. <br />
            BlossomLearn Essential Pathways goes beyond traditional learning
            methods by incorporating cutting-edge educational technologies and
            evidence-based teaching approaches. The platform adapts to each
            student's learning pace, providing customized challenges that
            promote critical thinking and problem-solving skills. This tailored
            approach helps bridge learning gaps and accelerates academic growth,
            making it ideal for students seeking to excel in today’s fast-paced
            educational environment.
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
