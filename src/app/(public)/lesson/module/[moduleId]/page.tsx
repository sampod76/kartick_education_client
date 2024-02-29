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
import { ArrowLeftOutlined } from '@ant-design/icons'
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import { useRouter } from "next/navigation";
export default function LessonPage({
  params,
}: {
  params: { moduleId: string };
}) {
  const screens = useBreakpoint();

  const router = useRouter()
  const moduleId = params.moduleId;
  // console.log(moduleId);
  const { data: moduleData, isLoading } = useGetSingleModuleQuery(moduleId);
  // console.log("🚀 ~ file: page.tsx:12 ~ LessonPage ~ moduleData:", moduleData);
  const milestoneId = moduleData?.milestone?._id;

  // console.log(moduleData, 'moduleData')

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

      {/* top section */}

      <div className="px-2 lg:px-7 mt-5 mb-3 block lg:flex justify-between items-center gap-3">
        <div onClick={() => router.back()} className="cursor-pointer flex items-center gap-2 border border-[#30ACFB] p-2 uppercase  font-bold rounded w-[7rem]">
          <ArrowLeftOutlined style={{
            color: '#30ACFB',
            fontWeight: "800",
            fontSize: "18px"
          }} />
          <span>Lesson</span>
        </div>
        <div className="flex  items-center gap-5 mt-3 lg:mt-0 md:mt-0 xl:mt-0">
          <h1 className="flex flex-col">
            <span className="text-sm text-slate-600">Category</span>
            <span className="text-[#323232] text-sm lg:text-lg">
              <EllipsisMiddle suffixCount={2} maxLength={20}>
                {moduleData?.milestone?.course?.category?.title}
              </EllipsisMiddle>
            </span>
          </h1>
          <h1 className="flex flex-col">
            <span className="text-sm text-slate-600">Level</span>
            <span className="text-[#323232] text-sm lg:text-lg">
              <EllipsisMiddle suffixCount={1} maxLength={7}>
                {moduleData?.title}
              </EllipsisMiddle>
            </span>
          </h1>
        </div>
      </div>

      {/*//! small banner */}
      <div className="px-2 lg:px-5 my-2">
        {/* <h1 className="text-center text-black font-semibold text-2xl md:text--3xl lg:text-3xl xl:text-4xl my-5 ">IBLossom Math Kindergarten Two</h1> */}
        <div className=" flex flex-col items-center justify-center min-h-[6rem] bg-[#effbe1]" >
          <h2 className="text-lg lg:text-4xl font-bold text-gray-700">Overview </h2>
        </div>
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
            {/* <div className="flex flex-col justify-center items-center mb-5">
              <Image
                src={AllImage.profileAvater || ""}
                width={300}
                height={300}
                className="w-[7rem]  h-[7rem] rounded-full"
                alt=""
              />
              <h3 className="text-[#AAA4A4] font-semibold"> David</h3>
            </div> */}
            {/* <ModuleTop moduleData={moduleData} /> */}
            <ModuleTab moduleId={moduleId} moduleData={moduleData} />
          </div>
        </div>
      </div>
    </div>
  );
}
