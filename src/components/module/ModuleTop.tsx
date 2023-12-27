"use client";
import { useGetSingleMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import {
  useGetAllModuleQuery,
  useGetSingleModuleQuery,
} from "@/redux/api/adminApi/moduleApi";
import React from "react";

export default function ModuleTop({ moduleId }: { moduleId: any }) {
  const { data } = useGetSingleModuleQuery(moduleId);
  console.log(data, "");
  return (
    <div
      style={{
        background: "#5371FF",
        // minHeight: "3rem",
        // height: "",
        width: "100%",
        padding: "1rem 2rem",
        textAlign: "center",
        fontWeight: "800",
        color: "white",
        fontSize: "2rem",
      }}
    >
      {data?.title} Module Overviews
    </div>
  );
}
