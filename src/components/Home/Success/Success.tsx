// import { successHistoryData } from "@/db/success";
'use client'
import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";

const Success = () => {
  const successHistoryData = [
    {
      id: 1,
      year: 2015,
      name: "Website Launch",
      description:
        "Successfully launched the LMS website, providing access to online courses.",
    },
    {
      id: 2,
      year: 2017,
      name: "100,000 Registered Students",
      description:
        "Achieved a significant milestone with 100,000 registered students on the platform.",
    },
    {
      id: 3,
      year: 2018,
      name: "Award-Winning Courses",
      description:
        "Received industry recognition for the quality and effectiveness of our online courses.",
    },
    {
      id: 4,
      year: 2020,
      name: "Global Expansion",
      description:
        "Expanded our reach globally, offering courses to students from diverse regions.",
    },
    {
      id: 5,
      year: 2022,
      name: "Advanced Learning Analytics",
      description:
        "Implemented advanced learning analytics to enhance student performance tracking.",
    },
    {
      id: 6,
      year: 2023,
      name: "10 Million Certificates Issued",
      description:
        "Celebrated a major achievement with the issuance of 10 million course completion certificates.",
    },
  ];
  return (
    <div className="bg-[#A2B0F321] mt-5 py-[100px] container mx-auto">
      <h1 className="text-3xl text-[#282938] font-[600]">
        Discover how <span className="text-secondary">iBlossomLearn </span>{" "}
        success for every learner with personalized and interactive lessons.
      </h1>

      <section className="my-[6rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-7">
        {successHistoryData?.map((item: any, index: any) => {
          return (
            <div
              className="w-full lg:w-[406px] max-h-[316px] bg-white rounded-tl-[30px] rounded-br-[30px] text-start p-5 flex flex-col gap-3"
              key={index + 1}
            >
              <p className="h-10 w-10 rounded-tl-[30px] rounded-tr-[5px] rounded-br-[30px] rounded-bl-[5px] font-bold text-[20px] bg-primary p-2 text-white">
                {index + 1}
              </p>
              <h2 className="font-[500] text-2xl text-[#282938] ">
                {item?.name}
              </h2>
              <p className="text-[#1f1f2b] font[400] text-[16px]">
                {item?.description}
              </p>
            </div>
          );
        })}
      </section>

      <Link
        href="/"
        className="text-primary uppercase p-2 w-[164px] h-[44px] font-bold border-primary border-2 rounded-[10px] text-[18px] hover:bg-primary hover:text-white"
      >
        Join Now
      </Link>
    </div>
  );
};

export default Success;
