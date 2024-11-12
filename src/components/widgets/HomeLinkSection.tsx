import { AllImage } from "@/assets/AllImge";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeLinkSection = () => {
  return (
    <div>
      <div className=" py-[20px] lg:py-[40px] bg-black container mx-auto text-center border ">
        <div>
          <h2 className="text-lg sm:text-2xl xl:text-[2.9rem] 2xl:text-[3.5rem] text-center  text-white font-semibold p-5 my-4 lg:my-10">
            What they need to learn. How they want to learn.
          </h2>
        </div>

        <div className="space-y-6 md:space-y-10 md:mb-6   px-6">
          {/* first 2 */}
          <div className="space-y-6 md:space-y-0 md:flex justify-between  items-center gap-8 2xl:gap-28 h-full  ">
            <div
              data-aos="fade-right"
              className="p-1 lg:ml-10  text-lg w-full lg:w-[28%] border-2 transition-all duration-700 hover:border-primary  rounded-3xl mx-auto font-semibold"
            >
              <div className="hover:bg-primary  bg-gray-300 transition-all duration-700 p-1 px-5 md:px-6 lg:px-0 xl:px-6 2xl:px-12 rounded-3xl">
                <Link
                  className="text-black w-full whitespace-break-spaces xl:whitespace-nowrap hover:text-white"
                  href={"/ibinstitute"}
                >
                  iBLossomLearn Language Institute
                </Link>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="p-1 lg:mr-10 text-lg w-full lg:w-[28%] border-2 transition-all duration-700 hover:border-primary  rounded-3xl mx-auto font-semibold"
            >
              <div className="hover:bg-primary     bg-gray-300 transition-all duration-700 p-1 px-5 md:px-6 lg:px-5 xl:px-6 2xl:px-12 rounded-3xl">
                <Link
                  className="text-black whitespace-nowrap hover:text-white"
                  href={"/iblossom-private-academy"}
                >
                  iBLossomLearn Private Academy
                </Link>
              </div>
            </div>
          </div>
          {/* secound 2 */}
          <div className="flex flex-col md:gap-6 w-full space-y-6 h-full">
            <div
              // data-aos="zoom-in"
              className="p-1  text-lg w-full lg:w-[30%]  border-2 transition-all duration-700 hover:border-primary  rounded-3xl mx-auto font-semibold"
            >
              <div className="hover:bg-primary   bg-gray-300 transition-all duration-700 p-1 px-5 md:px-6 lg:px-5 xl:px-6 2xl:px-12 rounded-3xl">
                <Link
                  className="text-black whitespace-nowrap hover:text-white"
                  href={"/flex-accredited"}
                >
                  Flex Accredited K12
                </Link>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              className="p-1  text-lg w-full lg:w-[30%]  border-2 transition-all duration-700 hover:border-primary  rounded-3xl mx-auto font-semibold"
            >
              <div className="hover:bg-primary   bg-gray-300 transition-all duration-700 p-1 px-5 md:px-6 lg:px-5 xl:px-6 2xl:px-12 rounded-3xl">
                <Link
                  className="text-black whitespace-break-spaces 2xl:whitespace-nowrap hover:text-white"
                  href={"/talkeasi-unlimited"}
                >
                  i-TalkEasi Unlimited
                </Link>
              </div>
            </div>
          </div>
          {/* third 2 */}
          <div className="space-y-6 md:space-y-0 md:flex justify-between gap-28 items-center h-full">
            <div
              data-aos="fade-right"
              className="p-1 lg:ml-10 text-lg w-full lg:w-[28%]  border-2 transition-all duration-700 hover:border-primary  rounded-3xl mx-auto font-semibold"
            >
              <div className="hover:bg-primary  w-full bg-gray-300 transition-all duration-700 p-1 px-5 md:px-6 lg:px-5 xl:px-6 2xl:px-12 rounded-3xl">
                <Link
                  className="text-black whitespace-nowrap hover:text-white"
                  href={"/ibhomeschool"}
                >
                  SEL for Homeschooling Families
                </Link>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="p-1 lg:mr-10 text-lg w-full lg:w-[28%]  border-2 transition-all duration-700 hover:border-primary  rounded-3xl mx-auto font-semibold"
            >
              <div className="hover:bg-primary   bg-gray-300 transition-all duration-700 p-1 px-5 md:px-6 lg:px-5 xl:px-6 2xl:px-12 rounded-3xl">
                <Link
                  className="text-black whitespace-nowrap hover:text-white"
                  href={"/ibcast"}
                >
                  Iblossom Cast
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLinkSection;
