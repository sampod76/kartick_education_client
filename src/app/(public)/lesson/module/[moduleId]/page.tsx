"use client";
import { AllImage } from "@/assets/AllImge";
import BannerModule from "@/components/Home/Banner&hero/BannerModule";
import ModuleList from "@/components/module/ModuleList";
import ModuleTab from "@/components/module/ModuleTab";
import ModuleTop from "@/components/module/ModuleTop";
import SideModuleList from "@/components/module/SideModuleList";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { ENUM_YN } from "@/constants/globalEnums";
import { useGetAllModuleQuery, useGetSingleModuleQuery } from "@/redux/api/adminApi/moduleApi";
import { Tabs, TabsProps } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function LessonPage({
  params,
}: {
  params: { moduleId: string };
}) {
  const screens = useBreakpoint();
  const moduleId = params.moduleId;
  // console.log(moduleId);
  const { data: moduleData, isLoading } = useGetSingleModuleQuery(moduleId);
  // console.log("🚀 ~ file: page.tsx:12 ~ LessonPage ~ moduleData:", moduleData);
  const milestoneId = moduleData?.milestone?._id;


  // ! for get all module
  const query: Record<string, any> = {};
  query["limit"] = 999999;
  query["sortOrder"] = "asc";
  query["status"] = "active";
  query["isDelete"] = ENUM_YN.NO;

  const { data, isLoading: moduleLoading } = useGetAllModuleQuery({
    milestone: milestoneId,
    // lesson: "yes",

    ...query,
  });

  // console.log(data,"milestoneId");
  const modulesData = data?.data;
  // console.log(milestoneId);
  const [activeTabKey, setActiveTabKey] = useState("1");

  if (isLoading || moduleLoading) {
    return <LoadingSkeleton number={10} />;
  }


  const handleTabClick = (key: any) => {
    setActiveTabKey(key);
    // console.log(key);
  };


  const activeClass =
    "   text-[14px] lg:text-[18px] font-bold bg-[#FB8500] text-white rounded";
  const inactiveClass =
    "  text-[14px] lg:text-[18px]  ";

  // console.log(modulesData, 'modulesData')
  const tabsItems2: TabsProps["items"] = modulesData?.map(
    (singleModule: any, index: number) => ({
      label: (
        <button
          className={
            `${activeTabKey === String(index + 1) ? activeClass : inactiveClass} p-1`
          }
        >
          <p className="px-1"> {singleModule?.title}</p>
        </button>
      ),
      key: String(index + 1),
      children: <div>
        <ModuleTop moduleData={singleModule} />
        <ModuleTab moduleId={singleModule?._id} moduleData={singleModule} />
      </div>
    })
  );

  return (
    <div className="mb-5">

      <BannerModule className={"h-[40vh]"} />
      <div className="my-[4rem]">
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
        <h2
          style={{
            fontWeight: 700,
            textAlign: "center",
            color: "black",
            textTransform: "uppercase",
            fontSize: "24px",
            fontFamily: "Lato",
            // marginBlock: "4rem",
          }}
        >
          {moduleData?.milestone?.title}
          {/* //! Course Title */}
        </h2>
        <p className="text-center text-base">
          {moduleData?.milestone?.short_description}
        </p>
      </div>
      <div className="mt-9 px-2 lg:px-4 container mx-auto border  ">
        <Tabs
          defaultActiveKey="1"
          tabPosition={screens?.sm ? "left" : "top"}
          centered
          onChange={handleTabClick}
          items={tabsItems2}
        />

        <div className="block lg:flex justify-center gap-5 items-">
          {/* //! Side  */}


        </div>
      </div>
    </div>
  );
}
