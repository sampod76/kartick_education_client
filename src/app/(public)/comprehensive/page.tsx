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
            src={"/banner/teach.png"}
            width={1900}
            height={750}
            alt=""
            className="w-full overflow-auto lg:w-[100vw] h-full lg:h-[75vh]"
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 lg:px-10 py-3 rounded-[35px] bg-white bg-opacity-50 w-fit mx-auto text-black whitespace-nowrap text-xl lg:text-2xl">
            iBlossomLearn Comprehensive
          </h1>
        </div>
        <div className="h-10 bg-primary "></div>
        <div className="flex mb-20 flex-col justify-center items-center py-7 space-y-5 lg:space-y-12 text-center px-5 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="text-3xl lg:text-4xl mt-2 lg:mt-6 font-bold"
          >
            iBlossomLearn Comprehensive
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            Welcome to iBlossomLearn Comprehensive, an exclusive integration of
            this k12 accredited platform within our iBlossomLearn curriculum.
            This advanced program provides a comprehensive and engaging
            educational experience by blending core academic subjects such as
            Math, Language Arts, Science, and Social Studies with exciting
            enrichment activities plus 2 electives. Students benefit from
            interactive, multimedia-rich lessons, including videos, games,
            quizzes, and hands-on projects, making learning both fun and
            effective. Personalized learning paths ensure that every student
            receives the necessary support and challenges to succeed, while
            detailed progress monitoring and reporting tools help parents and
            educators track student performance and identify areas for
            improvement. iBlossomLearn Comprehensive also offers extensive
            supplemental resources, such as printable worksheets, educational
            games, and additional activities to reinforce learning. The
            user-friendly interface allows students to easily access lessons and
            assignments, and with 24/7 access, they can learn at their
            convenience, fitting education seamlessly into their schedules. In
            addition to core subjects, the program includes a variety of
            enrichment courses and electives, allowing students to explore new
            interests and develop additional skills. iBlossomLearn Comprehensive
            is more than just a curriculum; it is an immersive educational
            journey designed to inspire and empower students, preparing them for
            academic success and lifelong learning. Students can complete their
            high school diploma at their own pace.
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
