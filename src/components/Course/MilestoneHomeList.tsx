"use client";
// import dynamic from "next/dynamic";

import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import { Button, Divider, message } from "antd";
import Link from "next/link";
import React from "react";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { SVGYelloDot } from "@/assets/svg/Icon";
import { ENUM_YN } from "@/constants/globalEnums";
import ButtonLoading from "../ui/Loading/ButtonLoading";
import { useAddPaypalPaymentByCourseMutation } from "@/redux/api/public/paymentApi";
import { getUserInfo } from "@/services/auth.service";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import PaypalCheckoutByCourse from "../Utlis/PaypalCheckoutByCourse";
import SingleMilestone from "../milestone/SingleMilestone";
import { IMilestoneData } from "@/types/miestoneType";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import { useAppSelector } from "@/redux/hooks";

const MilestoneHomeList = ({ courseId }: { courseId: string }) => {
  // const userInfo = getUserInfo() as any;
  // const { generateBgColor } = useAppSelector((state) => state.bannerSearch);
  const {
    data: courseData = {},
    isLoading: courseLoading,
    error,
  } = useGetSingleCourseQuery(courseId);
  // console.log("🚀 ~ MilestoneHomeList ~ courseData:", courseData)

  const query: Record<string, any> = {};
  query["limit"] = 999999;
  query["sortOrder"] = "asc";
  query["status"] = "active";
  query["isDelete"] = ENUM_YN.NO;
  const {
    data,
    isLoading,
    error: milestonError,
  } = useGetAllMilestoneQuery({
    course: courseId,
    module: "yes",
    ...query,
  })


  // console.log("🚀 ~ MilestoneHomeList ~ data:", data)
  // console.log(data,"courseId");
  const milestoneData = data?.data || [];

  if (error || milestonError) {
    console.log(error, milestonError);
  }

  return (
    <>
      {isLoading || courseLoading ? (
        <LoadingSkeleton number={20} />
      ) : (
        <div
          style={{
            marginTop: "1.5rem",
          }}
          className="relative min-h-screen container mx-auto"
        >
          <h2
            style={{
              fontWeight: 400,
              textAlign: "center",
              color: "black",
              textTransform: "uppercase",
              fontSize: "35px",
              fontFamily: "Latao",
            }}
          >
            {courseData?.title}
          </h2>
          <p className="text-center my-3 text-lg lg:text-xl">
            <EllipsisMiddle suffixCount={3} maxLength={120}>
              {courseData?.short_description}
            </EllipsisMiddle>
          </p>
          {/* <div className="absolute -top-8 lg:top-0 right-0 animate-pulse">
            <PaypalCheckoutByCourse courseData={courseData} />
          </div> */}
          <Divider
            style={{
              color: "red",
              fontSize: "5px",
              background: "red",
            }}
          />
          <div className="">
            {/* <div className="w-full lg:w-[20%]">
              <h2 className="uppercase text-2xl font-bold">Label</h2>
              <div className="flex flex-col gap-5 ">
                <button>Lebel-1</button>
                <button>Lebel-2</button>
                <button>Lebel-3</button>
              </div>
            </div> */}

            <div className="w-full  mx-auto grid  grid-cols-1 lg:grid-cols-2 gap-3">
              {milestoneData?.map((milestone: IMilestoneData, index: number) => {
                return (
                  <SingleMilestone key={index} milestoneData={milestone} index={index} />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MilestoneHomeList;
// export default dynamic(() => Promise.resolve(MilestoneList), {
//    ssr: false,
//  });
