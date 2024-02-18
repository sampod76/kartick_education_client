// import { ShortOverViewHomePageHistoryData } from "@/db/ShortOverViewHomePage";
"use client";
import { AnimatePresenceWrapper } from "@/components/framer_motion/AnimatePresence";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { useGetAllShortOverViewQuery } from "@/redux/api/adminApi/features/overview";
import { IShort_overviewData } from "@/types/features/shortOverviewType";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";

const ShortOverViewHomePage = () => {
  const ShortOverViewHomePageHistoryData = [
    {
      id: 1,
      year: 2015,
      name: "Website Launch",
      description:
        "ShortOverViewHomePagefully launched the LMS website, providing access to online courses.",
    },
    {
      id: 2,
      year: 2017,
      name: "100,000 Registered Students",
      description:
        "Achieved a significant milestone with 100,000 registered students on the platform.",
    },
    {
      id: 3,
      year: 2018,
      name: "Award-Winning Courses",
      description:
        "Received industry recognition for the quality and effectiveness of our online courses.",
    },
    {
      id: 4,
      year: 2020,
      name: "Global Expansion",
      description:
        "Expanded our reach globally, offering courses to students from diverse regions.",
    },
    {
      id: 5,
      year: 2022,
      name: "Advanced Learning Analytics",
      description:
        "Implemented advanced learning analytics to enhance student performance tracking.",
    },
    {
      id: 6,
      year: 2023,
      name: "10 Million Certificates Issued",
      description:
        "Celebrated a major achievement with the issuance of 10 million course completion certificates.",
    },
  ];

  let query: any = {}
  query["status"] = "active";

  const { data, isLoading } = useGetAllShortOverViewQuery({ ...query }) as any
  const shortOverviewData: IShort_overviewData[] = data?.data || []
  // console.log(shortOverviewData, 'shortOverviewData')

  if (isLoading) {
    return <>
      <LoadingSkeleton />
    </>
  }

  return (
    <AnimatePresenceWrapper>
      <div className=" container mx-auto  ">
        <div className="bg-[#A2B0F321] mt-5 py-3 md:py-10  ">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-center w-[80%] mx-auto text-[#282938] font-[600]">
            {shortOverviewData.length && shortOverviewData[0]?.title}
          </h1>

          <div className="my-[3rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 lg:px-0  mx-3">
            {shortOverviewData.length && shortOverviewData[0]?.cards?.map((item: any, index: any) => {
              return (
                <AnimatePresenceWrapper key={item._id || index} delay={0.24 + (index / 100)}>
                  <div
                    className="w-full h-full bg-[#FFFFFF] rounded-tl-[30px] rounded-br-[30px] text-start p-5 flex flex-col gap-3"
                    key={index + 1}
                  >
                    <p className="h-12 w-12 rounded-tl-[30px] rounded-tr-[5px] rounded-br-[30px] rounded-bl-[5px] font-bold text-[20px] bg-primary p-3 text-white hover:text-primary hover:bg-slate-100">
                      {item?.countNumber}
                    </p>
                    <h2 className="font-[500] text-xl  lg:text-2xl text-[#282938] text-nowrap">
                      {item?.title}
                    </h2>
                    <p className="text-[#1f1f2b] font[400] text-[16px]">

                      <EllipsisMiddle
                        suffixCount={5}
                        maxLength={120}
                      >
                        {item?.short_description}
                      </EllipsisMiddle>
                    </p>
                  </div>
                </AnimatePresenceWrapper>
              );
            })}
          </div>

          <div className="flex justify-center items-center">
            <Link
              href="/subscription"
              className="text-primary uppercase p-2 w-[164px] h-[44px] text-center font-bold border-primary border-2 rounded-[10px] text-[18px] hover:bg-primary hover:text-white mx-3"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </AnimatePresenceWrapper>
  );
};

export default ShortOverViewHomePage;
