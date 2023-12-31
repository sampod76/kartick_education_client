"use client";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import { Divider } from "antd";
import Link from "next/link";
import React from "react";

const MilestoneList = ({ courseId }: { courseId: any }) => {
  console.log(courseId);

  const { data: courseData } = useGetSingleCourseQuery(courseId);
  console.log(courseData, "courseDat");

  const { data } = useGetAllMilestoneQuery({
    course: courseId,
    module: "yes",
  });

  // console.log(data,"courseId");
  const milestoneData = data?.data;

  console.log(milestoneData, "milestoneData");

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
              <ul className="py-3 list-[circle]">
                {milestone?.modules?.map((module: any, index: number) => {
                  return (
                    <li key={index}>
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
                          textDecoration: "uppercase",
                        }}
                      >
                        {/* //! Modules List  */}
                        {/* <div className="Ellipse14 w-3 h-3 bg-yellow-400 rounded-full"></div> */}
                        <h1>{module?.title}</h1>
                      </Link>
                    </li>
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
