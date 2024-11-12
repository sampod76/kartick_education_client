/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import SupportDonateHelpDesk from "@/components/widgets/SupportDonate";

const DynamicInput = dynamic(() => import("antd/es/input"), { ssr: false });
export default function WordWonders() {
  return (
    <div className="">
      <div className="">
        <div className="relative">
          <Image
            src={"/banner/word-wonders.png"}
            width={1900}
            height={750}
            alt=""
            className="w-full overflow-auto lg:w-[100vw] h-full lg:h-[75vh]"
          />
          <div>
            <h1
              //   data-aos="zoom-out"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 lg:px-16 py-3  rounded-[35px] bg-white bg-opacity-50 w-fit mx-auto text-black whitespace-nowrap text-center text-xl lg:text-2xl"
            >
              iBlossomLearn Word Wonders
            </h1>
          </div>
        </div>
        <div className="h-10 bg-primary "></div>
        <div className="flex mb-20 flex-col justify-center items-center py-7 space-y-5  text-center px-5 lg:px-28 ">
          <h1 data-aos="zoom-in" className="bodyHeaderText mt-2 lg:mt-6 ">
            iBlossomLearn Word Wonders
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            Welcome to the iBlossomLearn Word Wonders course, an exclusive
            integration and collaboration with our literacy partners within our
            iBlossomLearn curriculum. This course is designed to elevate
            students' literacy skills through engaging, interactive, and
            comprehensive activities that foster a love for reading and writing.
            Covering all aspects of literacy, including reading, writing,
            spelling, grammar, and comprehension, the curriculum meets
            educational standards and helps students develop strong foundational
            skills. Through our interactive literacy-rich platform, students
            engage in fun and effective activities such as games, quizzes, and
            multimedia content, catering to different learning styles and
            keeping students motivated.
          </p>
          <p data-aos="zoom-out" className="bodyText lg:pb-6">
            The iBlossomLearn Word Wonders course adapts to each student's
            learning pace and style, offering personalized pathways that ensure
            the right level of challenge and support. Parents and educators can
            track students' progress with detailed reports and analytics,
            facilitating targeted intervention and support. The course provides
            an extensive library of digital books, stories, and reading
            materials to cater to different interests and reading levels, along
            with skill-building exercises focused on spelling, grammar, and
            writing. With a user-friendly platform and 24/7 access, students can
            practice their literacy skills anytime, anywhere, fitting learning
            into their busy schedules. The iBlossomLearn Word Wonders course is
            dedicated to nurturing proficient and enthusiastic readers and
            writers, preparing students for academic success and a lifelong love
            of learning.
          </p>

          <div
            data-aos="zoom-out"
            className="  self-center w-80 mt-6 rounded-3xl p-1 border-2 border-primary"
          >
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
