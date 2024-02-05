"use client";

import {
  useGetSingleMilestoneQuery,
} from "@/redux/api/adminApi/milestoneApi";
import { useGetAllModuleQuery } from "@/redux/api/adminApi/moduleApi";
import { Divider } from "antd";
import Link from "next/link";
import React from "react";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { ENUM_YN } from "@/constants/globalEnums";
import { ContainerOutlined } from "@ant-design/icons"

const SideModuleList = ({
  milestoneId,
  moduleId,
}: {
  milestoneId: string;
  moduleId: string;
}) => {
  // console.log(milestoneId);
  const query: Record<string, any> = {};
  query["limit"] = 999999;
  query["sortOrder"] = "asc";
  query["status"] = "active";
  query["isDelete"] = ENUM_YN.NO;

  const { data: milestoneData, isLoading } =
    useGetSingleMilestoneQuery(milestoneId);
  // console.log("🚀 ~ milestoneData:", milestoneData)
  // console.log(milestoneData);

  const { data, isLoading: moduleLoading } = useGetAllModuleQuery({
    milestone: milestoneId,
    // lesson: "yes",

    ...query,
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
      <h2 className="text-start text-[20px] px-3 flex gap-2 font-semibold font-['Inter'] leading-1 py-4 bg-[#479FEC] text-white">
        <ContainerOutlined />   <span>{milestoneData?.title}</span>
      </h2>
      {/* <Divider
        style={{
          color: "red",
          fontSize: "5px",
          background: "red",
        }}
      /> */}

      <div className="flex flex-col gap-1 md:gap-2 max-w-[8 mx-auto mt-2]">
        {modulesData?.map((module: any, index: number) => {
          return (
            <Link
              key={index}
              href={`/lesson/module/${module?._id}?module=${module?.title}`}
              className={`  text-start text-base lg:text-[16px]  font-['Inter'] leading-2   py-1 px-1 md:px-3 rounded ${module?._id === moduleId ? "text-[#479FEC] font-[550]" : "text-gray-800 font-normal"
                } `}
            >
              <span className={`rounded-full   w-2 h-2 inline-flex items-center justify-center mr-2 ${module?._id === moduleId ? "bg-[#479FEC]" : "bg-black"
                }`}></span>
              {module?.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideModuleList;
