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

const MilestoneList = ({ courseId }: { courseId: string }) => {
  const userInfo = getUserInfo() as any;
  const {
    data: courseData = {},
    isLoading: courseLoading,
    error,
  } = useGetSingleCourseQuery(courseId);

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
  });

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
            marginTop: "1.25rem",
          }}
          className="relative"
        >
          <h2
            style={{
              fontWeight: 400,
              textAlign: "center",
              color: "black",
              textTransform: "uppercase",
              fontSize: "35px",
              fontFamily: "Lato",
            }}
          >
            {courseData?.title}
          </h2>
          <div className="absolute -top-8 lg:top-0 right-0 animate-pulse">
            <PaypalCheckoutByCourse courseData={courseData} />
          </div>
          <Divider
            style={{
              color: "red",
              fontSize: "5px",
              background: "red",
            }}
          />
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-3 max-w-[98%] lg:max-w-[90%] mx-auto my-5">
            {milestoneData?.map((milestone: any, index: number) => {
              return (
                <div
                  key={milestone?._id}
                  className="border-2 shadow-xl p-2 rounded-xl"
                >
                  <Link
                    href={`/module/${milestone?._id}`}
                    className="text-start text-gray-800 text-[20px] font-semibold font-['Inter'] leading-1 "
                  >
                    💥 {milestone?.title}
                    {/* //! Milestone Title */}
                  </Link>
                  <div className="py-3 ">
                    {milestone?.modules?.map((module: any, index: number) => {
                      return (
                        <Link
                          href={`/lesson/module/${module?._id}?module=${module?.title}`}
                          key={module?._id || index}
                          className="text-secondary text-start"
                          // className="text-sky-950 text-opacity-90 text-[18px] font-medium font-['Inter'] leading-2 flex gap-2 items-center"
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "start",
                            fontWeight: 500,
                            // color: "grey",
                            fontSize: "18px",
                            fontFamily: "Inter",
                            // marginBlock: "1rem",
                            textDecoration: "uppercase",
                            // padding: "2px 16px",
                          }}
                        >
                          {/* //! Modules List  */}
                          {/* <div className="Ellipse14 w-3 h-3 bg-yellow-400 rounded-full"></div> */}
                          <p className="mt-2">
                            {" "}
                            <SVGYelloDot />
                          </p>
                          {module?.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MilestoneList;
// export default dynamic(() => Promise.resolve(MilestoneList), {
//    ssr: false,
//  });
