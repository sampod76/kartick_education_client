"use client";

import {
  useGetSingleMilestoneQuery,
} from "@/redux/api/adminApi/milestoneApi";
import { useGetAllModuleQuery } from "@/redux/api/adminApi/moduleApi";
import { Divider, Tabs, TabsProps } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { ENUM_YN } from "@/constants/globalEnums";
import { ContainerOutlined } from "@ant-design/icons"
import { AllSvg } from "@/assets/AllSvg";
import ModuleIcon from "@/assets/svg/moduleIcon";

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
  const [activeTabKey, setActiveTabKey] = useState("1");

  if (isLoading || moduleLoading) {
    return <LoadingSkeleton />;
  }

  const handleTabClick = (key: any) => {
    setActiveTabKey(key);
    // console.log(key);
  };

  const tabsItems: TabsProps["items"] = [
    {
      label: (
        <button className="text-xl font-bold ">
          {/* <BlockOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />{" "} */}
          <h1 className=" text-sm md:text-lg lg:text-2xl">Lessons & Quizes</h1>
        </button>
      ),
      key: "1",
      children: "tab1",
    },
    {
      label: (
        <button className="text-xl font-bold ">
          {/* <BookOutlined
            style={{
              fontSize: "1.5rem",
            }}
          /> */}
          <h1 className="text-sm md:text-lg lg:text-2xl">Glossary</h1>
        </button>
      ),
      key: "3",
      children: "tabs3",
    },

    {
      label: (
        <button className="text-xl font-bold ">
          {" "}
          {/* <CommentOutlined
            style={{
              fontSize: "1.5rem",
            }}
          /> */}
          <h1 className=" text-sm md:text-lg lg:text-2xl"> Resources</h1>
        </button>
      ),
      key: "4",
      children: "tab4",
    },
  ];
  return (
    <div
      style={{
        marginTop: "1.35rem",
      }}
      className=" lg:border-r-2 border-r-slate-500 h-full"
    >

      <div className="relative bg-no-repeat bg-cover min-h-[3rem] flex items-center bg-[#8CA46D] " style={{
        // backgroundImage: `url(/banner/registrationBanner.png)`,
        // borderImageSource: 'linear-gradient(black, transparent)', // Black border with transparency
        // borderImageSlice: 1,
        // borderImageRepeat: 'stretch',
        // borderImageWidth: 4,  // Adjust the width as needed
        // borderStyle: 'solid', // Specify the border style
        // boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)', // Add an inset box shadow for the bottom
      }}>
        <h2 className="text-start text-[20px] px-3 flex gap-2 items-center font-semibold font-['Inter'] leading-1 text-gray-100">
          <ContainerOutlined /> <span>{milestoneData?.title}</span>
        </h2>
      </div>

      {/* <Divider
        style={{
          color: "red",
          fontSize: "5px",
          background: "red",
        }}
      /> */}
      {/* <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        centered
        onChange={handleTabClick}
        items={tabsItems}
      /> */}
      <div className="flex flex-col gap-1 md:gap-2 max-w-[8 mx-auto mt-2">
        {modulesData?.map((module: any, index: number) => {
          return (
            <Link
              key={index}
              href={`/lesson/module/${module?._id}?module=${module?.title}`}
              className={`flex   text-start text-base lg:text-text-lg  leading-2   py-1 px-1 md:px-3 rounded ${module?._id === moduleId ? "text-[#479FEC] front-bold" : "text-gray-800 font-normal"
                } `}
            >
              {/* <span className={`rounded-full   w-2 h-2 inline-flex items-center justify-center mr-2 ${module?._id === moduleId ? "bg-[#479FEC]" : "bg-black"
                }`}></span> */}
                <span className="mt-1 mr-1">{<ModuleIcon />}</span>
              {module?.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideModuleList;
