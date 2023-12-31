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

const SideModuleList = ({
  milestoneId,
  moduleId,
}: {
  milestoneId: string;
  moduleId: string;
}) => {
  // console.log(milestoneId);

  const { data: milestoneData } = useGetSingleMilestoneQuery(milestoneId);
  // console.log(milestoneData);

  const { data } = useGetAllModuleQuery({
    course: milestoneId,
    // lesson: "yes",
    status: "active",
  });

  // console.log(data,"milestoneId");
  const modulesData = data?.data;

  console.log(moduleId, "and", modulesData, "module Data");

  return (
    <div
      style={{
        marginTop: "1.35rem",
      }}
    >
      <h2 className="text-[1.4rem] font-[550] ">{milestoneData?.title}</h2>
      {/* <Divider
        style={{
          color: "red",
          fontSize: "5px",
          background: "red",
        }}
      /> */}

      <div className="flex flex-col gap-3 max-w-[80%] mx-auto mt-5 ">
        {modulesData?.map((module: any, index: number) => {
          return (
            <Link
              href={`/lesson/${module?._id}`}
              key={index}
              className={`shadow-md p-3 rounded text-start  text-[16px] font-[550] font-['Inter'] leading-2 ${
                module?._id === moduleId
                  ? "bg-primary text-white"
                  : "bg-slate-50  text-gray-900"
              }`}
            >
              {module?.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideModuleList;
