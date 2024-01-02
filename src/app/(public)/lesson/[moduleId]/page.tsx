"use client";

import ModuleList from "@/components/module/ModuleList";
import ModuleTab from "@/components/module/ModuleTab";
import ModuleTop from "@/components/module/ModuleTop";
import SideModuleList from "@/components/module/SideModuleList";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { useGetSingleModuleQuery } from "@/redux/api/adminApi/moduleApi";
import React from "react";

export default function LessonPage({ params }: { params: { moduleId: string } }) {
  const moduleId = params.moduleId;
  // console.log(moduleId);
  const { data: moduleData, isLoading } = useGetSingleModuleQuery(moduleId);
  // console.log("🚀 ~ file: page.tsx:12 ~ LessonPage ~ moduleData:", moduleData);
  const milestoneId = moduleData?.milestone;
  // console.log(milestoneId);
  if (isLoading) {
    return <LoadingSkeleton number={10} />;
  }
  return (
    <div className="mt-5 container mx-auto">
      <ModuleTop moduleId={moduleId} />
      <div className="block lg:flex justify-center ">
        <div className="w-full lg:max-w-[30%]">
          {/* <ModuleList milestoneId={milestoneId}></ModuleList> */}
          <SideModuleList milestoneId={milestoneId} moduleId={moduleId} />
        </div>
        <div className="w-full lg:max-w-[70%]">
          <ModuleTab moduleId={moduleId} />
        </div>
      </div>
    </div>
  );
}
