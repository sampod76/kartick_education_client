"use client";
import { AllImage } from "@/assets/AllImge";
import BannerModule from "@/components/Home/Banner&hero/BannerModule";
import ModuleList from "@/components/module/ModuleList";
import ModuleTab from "@/components/module/ModuleTab";
import ModuleTop from "@/components/module/ModuleTop";
import SideModuleList from "@/components/module/SideModuleList";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetSingleModuleQuery } from "@/redux/api/adminApi/moduleApi";
import Image from "next/image";
import React from "react";

export default function LessonPage({
  params,
}: {
  params: { moduleId: string };
}) {
  const moduleId = params.moduleId;
  // console.log(moduleId);
  const { data: moduleData, isLoading } = useGetSingleModuleQuery(moduleId);
  // console.log("🚀 ~ file: page.tsx:12 ~ LessonPage ~ moduleData:", moduleData);
  const milestoneId = moduleData?.milestone?._id;
  // console.log(milestoneId);
  if (isLoading) {
    return <LoadingSkeleton number={10} />;
  }
  return (
    <div className="mb-5">
      <BannerModule className={"h-[40vh]"} />
      <div className="text-primary">
        {/* <UMBreadCrumb
        items={[
          {
            label: "Milestone",
            link: "/",
          },
          {
            label: "module",
            link: "/",
          },
          {
            label: "lesson",
            link: `/lesson/${moduleId}`,
          },
        ]}
      /> */}
      </div>
      <div className="mt-5 px-2 lg:px-4 containe mx-auto">
        <div className="block lg:flex justify-center gap-5 items-">
          {/* //! Side  */}
          <div className="w-full lg:max-w-[30%] px-2 lg:px-5">
            {/* <ModuleList milestoneId={milestoneId}></ModuleList> */}
            <SideModuleList milestoneId={milestoneId} moduleId={moduleId} />
            <hr className=" border-[#eec699] lg:border-none -mx-7 overflow-hidden" />
          </div>

          {/* main */}
          <div className="w-full lg:max-w-[70%]">
            {/* //! top user sections */}
            <div className="flex flex-col justify-center items-center mb-5">
              <Image
                src={AllImage.profileAvater || ""}
                width={300}
                height={300}
                className="w-[7rem]  h-[7rem] rounded-full"
                alt=""
              />
              <h3 className="text-[#AAA4A4] font-semibold"> David</h3>
            </div>
            <ModuleTop moduleData={moduleData} />
            <ModuleTab moduleId={moduleId} moduleData={moduleData} />
          </div>
        </div>
      </div>
    </div>
  );
}
