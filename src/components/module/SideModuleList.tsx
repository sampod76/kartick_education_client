"use client";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import {
  useGetAllMilestoneQuery,
  useGetSingleMilestoneQuery,
} from "@/redux/api/adminApi/milestoneApi";
import { useGetAllModuleQuery } from "@/redux/api/adminApi/moduleApi";
import { Divider } from "antd";
import Link from "next/link";
import React from "react";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";

const SideModuleList = ({
  milestoneId,
  moduleId,
}: {
  milestoneId: string;
  moduleId: string;
}) => {
  // console.log(milestoneId);

  const { data: milestoneData, isLoading } =
  useGetSingleMilestoneQuery(milestoneId);
  // console.log("🚀 ~ milestoneData:", milestoneData)
  // console.log(milestoneData);

  const { data, isLoading: moduleLoading } = useGetAllModuleQuery({
    milestone: milestoneId,
    // lesson: "yes",
    status: "active",
  });

  // console.log(data,"milestoneId");
  const modulesData = data?.data;
  // console.log("🚀 ~ modulesData:", modulesData)

  if (isLoading || moduleLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div
      style={{
        marginTop: "1.35rem",
      }}
      className=" lg:border-r-2 border-r-slate-500 h-full"
    >
      <h2 className="text-[18px] lg:text-[20px] font-[550] ">
        💥{milestoneData?.title}
      </h2>
      {/* <Divider
        style={{
          color: "red",
          fontSize: "5px",
          background: "red",
        }}
      /> */}

      <ul className="flex flex-col gap-1 md:gap-2 max-w-[8 mx-auto mt-2]">
        {modulesData?.map((module: any, index: number) => {
          return (
           <li  key={index} className={` text-[#1c1a1a]  py-1 px-1 md:px-3 rounded ${
            module?._id === moduleId
              ? "underline"
              : ""
          }`}>
             <Link
              href={`/lesson/${module?._id}`}
             
              className={` rounded text-start text-base lg:text-[16px] font-[550] font-['Inter'] leading-2  `}
            >
               <span className="rounded-full bg-yellow-400 w-2 h-2 inline-flex items-center justify-center mr-2"></span>{module?.title}
            </Link>
           </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideModuleList;
