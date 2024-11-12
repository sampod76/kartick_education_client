/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import SupportDonateHelpDesk from "@/components/widgets/SupportDonate";
import Link from "next/link";

const DynamicInput = dynamic(() => import("antd/es/input"), { ssr: false });
export default function Academicsprogram() {
  return (
    <div className="">
      <div className="">
        <div className="relative">
          <Image
            src={"/banner/academics-program.png"}
            width={1900}
            height={750}
            alt=""
            className="w-full overflow-auto mx-auto lg:w-[50vw] h-full lg:h-[40vh]"
          />
          <div>
            <h1
              //   data-aos="zoom-out"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 lg:px-14 py-3  rounded-[35px] bg-white bg-opacity-50 w-fit mx-auto text-black whitespace-nowrap text-center text-xl lg:text-2xl"
            >
              Academic Program
            </h1>
          </div>
        </div>
        <div className="h-10 bg-blue-600 "></div>
        <div className=" mb-20 py-7 space-y-5  text-center px-5 lg:px-28 ">
          <h1
            //data-aos="zoom-in"
            className="bodyHeaderText mt-2 lg:mt-6 "
          >
            Academic Program
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            We believe that a rigorous academic program combined with a
            supportive social and emotional curriculum leads to scholars’
            success. We believe that this should not only happen in Brick N
            Mortar settings but also in homes with the support of family
            members. The iBLossomLearn curriculum reflects the best practices
            that are associated with such ideals for our scholars, while
            embracing their diverse backgrounds at every level. At
            iBlossomLearn, we not only allow students to work at their own pace
            but also address the needs of the whole child. Our partnership with
            each student is built on timely check-ins, reinforcing the material
            learned and providing continuous support. This approach nurtures
            both academic and social-emotional development. With the flexibility
            to advance at their own speed, students have the opportunity to
            complete our programs earlier while benefiting from a well-rounded
            educational experience that focuses on their overall growth.
          </p>
          <br />
          <br />
        </div>
        <div
          className="relative px-5 lg:px-28 text-center bg-cover bg-center bg-no-repeat bg-gray-200 p-8 lg:mt-5 text-white w-full "
          style={{
            backgroundImage: "url('/banner/academics-program-bg.png')",
          }}
        >
          <div className=" absolute inset-0 bg-black opacity-5"></div>
          <div className="py-9">
            <h1 className="text-xl lg:text-2xl">
              Continuous Assessment in iBlossomLearn
            </h1>
            <p className=" lg:text-lg lg:mt-3">
              At iBlossomLearn, continuous assessment is integral to our
              approach, ensuring each student’s progress is closely monitored
              and supported. Our program includes regular check-ins where
              data-driven instruction is guided by assessments in core areas
              like Reading, Writing, and Math. Students undergo four interim
              assessments annually to measure progress towards grade-level
              standards. Personalized learning plans are developed based on
              assessment data, allowing students to work at their own pace while
              ensuring they meet or exceed academic goals. Additionally,
              standardized testing provides a comprehensive overview of student
              mastery and growth.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="my-6 lg:my-16 space-y-3 lg:space-y-6 ">
              <div
                data-aos="zoom-out"
                className=" self-center bg-[#5373fe] w-96 rounded-3xl p-1 border-2 border-primary"
              >
                <Link
                  href={"/iblossom-private-academy"}
                  className=" p-2   rounded-3xl px-5   text-white  w-full text-base lg:text-xl whitespace-nowrap"
                >
                  <p className=" text-base lg:text-xl whitespace-nowrap ">
                    iBLossomLearn Private School
                  </p>
                </Link>
              </div>
              <div
                data-aos="zoom-out"
                className=" self-center w-96 bg-[#5373fe] rounded-3xl p-1 border-2 border-primary"
              >
                <Link
                  href={"/flex-accredited"}
                  className=" p-2   rounded-3xl px-5   text-white  w-full "
                >
                  <p className=" text-base lg:text-xl whitespace-nowrap">
                    iBLossomLearn Flex Accredited K12
                  </p>
                </Link>
              </div>
              <div
                data-aos="zoom-out"
                className=" self-center w-96 bg-[#5373fe] rounded-3xl p-1 border-2 border-primary"
              >
                <Link
                  href={"/ibinstitute"}
                  className=" p-2   rounded-3xl px-5   text-white  w-full "
                >
                  <p className=" text-base lg:text-xl whitespace-nowrap">
                    iBLossomLearn Language Institute
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
