"use client"
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import { Divider } from "antd";
import Link from "next/link";
import React from "react";

const MilestoneList = ({courseId}:{courseId:any}) => {
  console.log(courseId);


  const milestonesStaticData = [
    {
      title: "Foundations of Knowledge",
      module: [
        { _id: "1", title: "Addition and Subtraction Fluency" },
        { _id: "2", title: "Place Value Understanding" },
        { _id: "3", title: "Introduction to Multiplication and Division" },
        { _id: "4", title: "Basic Fractions" },
        { _id: "5", title: "Time and Money Concepts" },
        { _id: "6", title: "Geometry Fundamentals" },
      ],
    },
    {
      title: "Intermediate Concepts",
      module: [
        { _id: "7", title: "Advanced Fractions" },
        { _id: "8", title: "Decimal and Percentage Understanding" },
        { _id: "9", title: "Algebraic Expressions" },
      ],
    },
    {
      title: "Advanced Mathematics",
      module: [
        { _id: "10", title: "Advanced Algebra" },
        { _id: "11", title: "Trigonometry Basics" },
        { _id: "12", title: "Calculus Fundamentals" },
      ],
    },
    {
      title: "Science Exploration",
      module: [
        { _id: "13", title: "Introduction to Physics" },
        { _id: "14", title: "Biology Basics" },
        { _id: "15", title: "Chemistry Concepts" },
      ],
    },
    {
      title: "Computer Science Fundamentals",
      module: [
        { _id: "16", title: "Programming Basics" },
        { _id: "17", title: "Data Structures and Algorithms" },
        { _id: "18", title: "Web Development Essentials" },
      ],
    },
    {
      title: "Foundations of Knowledge",
      module: [
        { _id: "1", title: "Addition and Subtraction Fluency" },
        { _id: "2", title: "Place Value Understanding" },
        { _id: "3", title: "Introduction to Multiplication and Division" },
        { _id: "4", title: "Basic Fractions" },
        { _id: "5", title: "Time and Money Concepts" },
        { _id: "6", title: "Geometry Fundamentals" },
      ],
    },
    {
      title: "Intermediate Concepts",
      module: [
        { _id: "7", title: "Advanced Fractions" },
        { _id: "8", title: "Decimal and Percentage Understanding" },
        { _id: "9", title: "Algebraic Expressions" },
      ],
    },
  ];
  const {data:courseData} = useGetSingleCourseQuery(courseId);
  console.log(courseData);

  const {data} = useGetAllMilestoneQuery({course:courseId})

  console.log(data,"courseId");
  const milestoneData =data?.data
  console.log(milestoneData);
  
  return (
    <div className="mt-5">
      <h2 className=" Math text-black text-[35px] font-normal font-['Lato'] tracking-[3.50px] uppercase text-center ">
        {courseData?.title}
        {/* //! Course Title */}
      </h2>
      <Divider
        style={{
          color: "red",
          fontSize: "5px",
          background: "red",
        }}
      />
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-2 max-w-[80%] mx-auto mt-5">
        {milestoneData?.map((milestone: any, index: number) => {
          return (
            <div key={index} className="p-2 ">
              <Link
                href={`/course`}
                className="text-start text-gray-800 text-[24px] font-semibold font-['Inter'] leading-2 "
              >
                {milestone?.title}
                {/* //! Milestone Title */}
              </Link>
              <ul className="py-3">
                {milestonesStaticData[0]?.module?.map((module: any, index: number) => {
                  return (
                    <Link
                      href={`/course`}
                      className="text-sky-950 text-opacity-90 text-[18px] font-medium font-['Inter'] leading-2 flex gap-2 items-center"
                      key={index}
                    >
                      {/* //! Modules List  */}
                      <div className="Ellipse14 w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <h1>{module?.title}</h1>
                    </Link>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneList;
