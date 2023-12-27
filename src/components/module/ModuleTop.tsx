"use client";
import { useGetSingleMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import {
  useGetAllModuleQuery,
  useGetSingleModuleQuery,
} from "@/redux/api/adminApi/moduleApi";
import React from "react";

export default function ModuleTop({ milestoneId }: { milestoneId: any }) {
  const { data } = useGetSingleMilestoneQuery(milestoneId);
  console.log(data);
  return (
    <div>
      <div
        style={{
          background: "#5371FF",
          minHeight: "5rem",
          width: "100%",
          padding: "3rem 2rem",
          textAlign: "center",
          fontWeight: "800",
          color: "white",
          fontSize: "2rem",
        }}
      >
        {data?.title} Milestone Overviews
      </div>
    </div>
  );
}
