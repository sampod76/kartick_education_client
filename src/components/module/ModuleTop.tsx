"use client";
import { useGetSingleMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import {
  useGetAllModuleQuery,
  useGetSingleModuleQuery,
} from "@/redux/api/adminApi/moduleApi";
import React from "react";

export default function ModuleTop({ moduleData }: { moduleData: any }) {
  // const { data } = useGetSingleModuleQuery(moduleId);
  // console.log(data, "");

  return (
    <div
      className="rounded-tl-[20px] rounded-br-[20px] bg-secondary"
      style={{
        // background: "#5371FF",
        // minHeight: "3rem",
        // height: "",
        width: "100%",
        padding: "1rem 2rem",
        textAlign: "center",
        fontWeight: "800",
        color: "white",
        // fontSize: "2rem",
      }}
    >
      <h2 className="text-sm md:text-lg lg:text-2xl">{moduleData?.title}</h2>
    </div>
  );
}
