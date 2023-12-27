"use client";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import { Divider } from "antd";
import Link from "next/link";
import React from "react";

const MilestoneList = ({ courseId }: { courseId: any }) => {
  console.log(courseId);

  const milestonesStaticData = [
    {
      title: "Foundations of Knowledge",
      modules: [
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
      modules: [
        { _id: "7", title: "Advanced Fractions" },
        { _id: "8", title: "Decimal and Percentage Understanding" },
        { _id: "9", title: "Algebraic Expressions" },
      ],
    },
    {
      title: "Advanced Mathematics",
      modules: [
        { _id: "10", title: "Advanced Algebra" },
        { _id: "11", title: "Trigonometry Basics" },
        { _id: "12", title: "Calculus Fundamentals" },
      ],
    },
    {
      title: "Science Exploration",
      modules: [
        { _id: "13", title: "Introduction to Physics" },
        { _id: "14", title: "Biology Basics" },
        { _id: "15", title: "Chemistry Concepts" },
      ],
    },
    {
      title: "Computer Science Fundamentals",
      modules: [
        { _id: "16", title: "Programming Basics" },
        { _id: "17", title: "Data Structures and Algorithms" },
        { _id: "18", title: "Web Development Essentials" },
      ],
    },
    {
      title: "Foundations of Knowledge",
      modules: [
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
      modules: [
        { _id: "7", title: "Advanced Fractions" },
        { _id: "8", title: "Decimal and Percentage Understanding" },
        { _id: "9", title: "Algebraic Expressions" },
      ],
    },
  ];
  const { data: courseData } = useGetSingleCourseQuery(courseId);
  console.log(courseData);

  const { data } = useGetAllMilestoneQuery({
    course: courseId,
    modules: "yes",
  });

  // console.log(data,"courseId");
  const milestoneData = data?.data;
  console.log(milestoneData);

  return (
    <div
      style={{
        marginTop: "1.25rem",
      }}
    >
      <h2
        style={{
          fontWeight: 400,
          textAlign: "center",
          color: "black",
          textTransform: "uppercase",
          fontSize: "35px",
          fontFamily: "Lato",
        }}
      >
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
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-3 max-w-[80%] mx-auto mt-5">
        {milestoneData?.map((milestone: any, index: number) => {
          return (
            <div key={index} className="p-2 ">
              <Link
                href={`/module/${milestone?._id}`}
                className="text-start text-gray-800 text-[24px] font-semibold font-['Inter'] leading-2 "
              >
                {milestone?.title}
                {/* //! Milestone Title */}
              </Link>
              <ul className="py-3">
                {milestone?.modules?.map((module: any, index: number) => {
                  return (
                    <Link
                      href={`/lesson/${module?._id}`}
                      // className="text-sky-950 text-opacity-90 text-[18px] font-medium font-['Inter'] leading-2 flex gap-2 items-center"
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        fontWeight: 500,
                        color: "grey",
                        fontSize: "18px",
                        fontFamily: "Inter",
                        marginBlock: "1rem",
                      }}
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
