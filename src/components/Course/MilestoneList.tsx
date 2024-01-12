"use client";
// import dynamic from "next/dynamic";

import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import { Divider } from "antd";
import Link from "next/link";
import React from "react";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";

const MilestoneList = ({ courseId }: { courseId: string }) => {
  const {
    data: courseData = {},
    isLoading: courseLoading,
    error,
  } = useGetSingleCourseQuery(courseId);

  const {
    data,
    isLoading,
    error: milestonError,
  } = useGetAllMilestoneQuery({
    course: courseId,
    module: "yes",
  });

  // console.log(data,"courseId");
  const milestoneData = data?.data || [];

  if (error || milestonError) {
    console.log(error, milestonError);
  }

  return (
    <>
      {isLoading || courseLoading ? (
        <LoadingSkeleton number={20} />
      ) : (
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
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-3 max-w-[98%] lg:max-w-[90%] mx-auto my-5">
            {milestoneData?.map((milestone: any, index: number) => {
              return (
                <div
                  key={milestone?._id}
                  className="border-2 shadow-xl p-2 rounded-xl"
                >
                  <Link
                    href={`/module/${milestone?._id}`}
                    className="text-start text-gray-800 text-[20px] font-semibold font-['Inter'] leading-1 "
                  >
                    💥 {milestone?.title}
                    {/* //! Milestone Title */}
                  </Link>
                  <ul className="py-3  mx-5">
                    {milestone?.modules?.map((module: any, index: number) => {
                      return (
                        <li
                          key={module?._id || index}
                          className="px-2  text-start"
                        >
                          
                          <Link
                            href={`/lesson/${module?._id}`}
                            className="text-secondary"
                            // className="text-sky-950 text-opacity-90 text-[18px] font-medium font-['Inter'] leading-2 flex gap-2 items-center"
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              alignItems: "center",
                              fontWeight: 500,
                              // color: "grey",
                              fontSize: "18px",
                              fontFamily: "Inter",
                              marginBlock: "1rem",
                              textDecoration: "uppercase",
                              // padding: "2px 16px",
                            }}
                          >
                            {/* //! Modules List  */}
                            {/* <div className="Ellipse14 w-3 h-3 bg-yellow-400 rounded-full"></div> */}
                            <span className="rounded-full bg-yellow-400 w-2 h-2 inline-flex items-center justify-center mr-2"></span>  {module?.title}
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
      )}
    </>
  );
};

export default MilestoneList;
// export default dynamic(() => Promise.resolve(MilestoneList), {
//    ssr: false,
//  });
