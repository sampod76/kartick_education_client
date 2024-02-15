"use client";
import onlineProgramsData from "@/db/programmes";
import React from "react";


import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import NotFound from "@/app/not-found";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { useGetAllShowAdvanceClassesQuery } from "@/redux/api/adminApi/features/showAdvanceClassApi";
import SIngleAdvanceClass from "./SingleAdvanceClass";
import { Button } from "antd";
import Link from "next/link";

const AdvanceHomeClass = () => {
  const query: Record<string, any> = {};
  query["limit"] = 1;
  query["status"] = ENUM_STATUS.ACTIVE;
  query["isDelete"] = ENUM_YN.NO;
  query["page"] = "home";

  const { data, isLoading, error } = useGetAllShowAdvanceClassesQuery({
    ...query,
  });
  const classData = data?.data[0];
  // console.log("🚀 ~ AdvanceHomeClass ~ classData:", classData)
  if (isLoading) {
    return <LoadingSkeleton />;
  }


  console.log("🚀 ~ AdvanceHomeClass ~ data:", data)
  return (
    <div className="mt-7  container mx-auto ">
      <div className="flex  justify-between gap-3 py-3 px-2">
        <h1 className="pl-2 lg:pl-0 text-xl lg:text-3xl my-2 text-[#282938] font-[600]">
          {classData?.title}
        </h1>
        <Link href={`/subscription`} type="default" className="p-2 mt-3 h-10 text-nowrap border-2 border-primary rounded px-3 font-semibold gap-3 hover:bg-primary hover:text-white">
          Join Now
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 first-letter:">
        {classData?.classes?.map((item: any, index: number) => {
          return <SIngleAdvanceClass programme={item} key={index + 1} />;
        })}
      </div>
    </div>
  );
};

export default AdvanceHomeClass;
