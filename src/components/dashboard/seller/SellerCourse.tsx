"use client";
import React from "react";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { Error_model_hook } from "@/utils/modalHook";
import NotFoundCourse from "@/components/ui/NotFound/NotFoundCourse";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { AllImage } from "@/assets/AllImge";
import Image from "next/image";
import { Rate } from "antd";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import { ICourseData } from "@/types/courseType";
import formatMongoCreatedAtDate from "@/hooks/formateMongoTimeToLocal";

export default function SellerCourse() {
  const { data, isLoading, error } = useGetAllCourseQuery({
    status: "active",
    limit: 9999,
  });
  const courseData = data?.data || [];
  if (
    error ||
    //@ts-ignore
    data?.data?.success === false
  ) {
    const errorType: any = error;
    Error_model_hook(
      errorType?.message ||
        //@ts-ignore
        data?.data?.message
    );
    console.log(error, data?.data);
  }
  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : courseData?.length === 0 ? (
        <NotFoundCourse />
      ) : (
        <div className="mt-3   ">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-2 ">
            {courseData?.map((course: ICourseData, index: number) => {
              return (
                <div key={index + 1} className="flex flex-col justify-center ">
                  <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 min-w-full  max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                    <div className="w-full md:w-1/3 bg-white grid place-items-center">
                      <Image
                        height={350}
                        width={350}
                        src={course?.img || AllImage?.notFoundImage}
                        alt="seller_course"
                        className="rounded h-[13rem] w-full lg:w-[11rem]"
                      />
                    </div>
                    <div className="w-full md:w-2/3 text-start bg-white flex flex-col space-y-2 p-3">
                      <div className="flex justify-between item-center">
                        <p className="text-gray-500 font-medium hidden md:block">
                          {course?.duration?.length &&
                            formatMongoCreatedAtDate(course?.duration[1])}
                        </p>
                        <div className="flex items-center">
                          <Rate count={1} disabled value={1} />
                          <p className="text-gray-600 font-bold text-sm ml-1">
                            4.96
                            <span className="text-gray-500 font-normal">
                              (76 reviews)
                            </span>
                          </p>
                        </div>

                        <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                          {course?.price_type}
                        </div>
                      </div>
                      <h3 className="font-black text-gray-800 md:text-3xl text-xl">
                        {course?.title}
                      </h3>
                      <p className="md:text-[] text-gray-500 text-base">
                        {EllipsisMiddle({
                          suffixCount: 3,
                          children: course?.short_description,
                          maxLength: 180,
                        })}
                      </p>
                      <p className="text-xl font-black text-gray-800">
                        ${course?.price}
                        <span className="font-normal text-gray-600 text-base"></span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
