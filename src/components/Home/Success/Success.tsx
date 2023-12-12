
// import { successHistoryData } from "@/db/success";
import { Col, Row } from "antd";
import React from "react";

const Success = () => {
    const successHistoryData = [
        {
          id: 1,
          year: 2015,
          event: "Website Launch",
          description: "Successfully launched the LMS website, providing access to online courses.",
        },
        {
          id: 2,
          year: 2017,
          milestone: "100,000 Registered Students",
          description: "Achieved a significant milestone with 100,000 registered students on the platform.",
        },
        {
          id: 3,
          year: 2018,
          achievement: "Award-Winning Courses",
          description: "Received industry recognition for the quality and effectiveness of our online courses.",
        },
        {
          id: 4,
          year: 2020,
          expansion: "Global Expansion",
          description: "Expanded our reach globally, offering courses to students from diverse regions.",
        },
        {
          id: 5,
          year: 2022,
          feature: "Advanced Learning Analytics",
          description: "Implemented advanced learning analytics to enhance student performance tracking.",
        },
        {
          id: 6,
          year: 2023,
          accomplishment: "10 Million Certificates Issued",
          description: "Celebrated a major achievement with the issuance of 10 million course completion certificates.",
        },
      ];
  return (
    <div className="bg-[#A2B0F321] my-2 py-[100px]">
      <h1 className="text-3xl text-[#282938] font-[600]">
        Discover how <span className="text-secondary">iBlossomLearn </span>{" "}
        success for every learner with personalized and interactive lessons.
      </h1>

      <section className="mt-[6rem] grid grid-cols-3">
      {
        successHistoryData?.map((item:any,index:ant)=>{
          return <div className="" key={index+1}>
          our success
          </div>
        })
      }
      </section>
    </div>
  );
};

export default Success;
