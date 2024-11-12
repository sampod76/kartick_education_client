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
            src={"/banner/inclusion-approach.jpg"}
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
              Inclusion Approach
            </h1>
          </div>
        </div>
        <div className="h-10 bg-primary "></div>
        <div className="flex mb-20 flex-col justify-center items-center py-7 space-y-5  text-center px-5 lg:px-28 ">
          <h1
            //data-aos="zoom-in"
            className="bodyHeaderText mt-2 lg:mt-6 "
          >
            Inclusion Approach
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            At iBlossomLearn, we are committed to creating an inclusive learning
            environment where every student feels valued and supported. Our
            inclusion approach ensures that all students, regardless of their
            abilities or backgrounds, have equal access to our comprehensive
            educational programs. We tailor our curriculum and teaching methods
            to meet diverse learning needs, providing personalized support and
            resources to help each student succeed. By fostering a culture of
            respect, understanding, and collaboration, we empower all students
            to reach their full potential in a nurturing and inclusive
            community.
          </p>
          <br />
          <br />
          <div
            data-aos="zoom-out"
            className=" self-center w-80 rounded-3xl p-1 border-2 border-primary"
          >
            <button className="bg-primary p-2   rounded-3xl px-5  text-[12px] lg:text-base text-white  w-full ">
              <p className="text-xl">Ready, Set, Go</p>
            </button>
          </div>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
