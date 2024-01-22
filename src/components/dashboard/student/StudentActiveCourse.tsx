"use client";
import React from "react";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { Error_model_hook } from "@/utils/modalHook";
import NotFoundCourse from "@/components/ui/NotFound/NotFoundCourse";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { AllImage } from "@/assets/AllImge";
import Image from "next/image";
import { Progress, Rate } from "antd";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import { ICourseData } from "@/types/courseType";
import formatMongoCreatedAtDate from "@/hooks/formateMongoTimeToLocal";
import { getUserInfo } from "@/services/auth.service";
import { useGetAllPackageAndCourseQuery } from "@/redux/api/sellerApi/addPackageAndCourse";
import dayjs from "dayjs";

export default function StudentActiveCourse() {
  const userInfo = getUserInfo() as any;
  const { data, isLoading, error } = useGetAllPackageAndCourseQuery(
    // { user: userInfo.id },
    // { skip: !Boolean(userInfo.id) }
    {}
  );
  //@ts-ignore
  const getPackage = data?.data;
  console.log("🚀 ~ ActivePackage ~ getPackage:", getPackage);
  if (isLoading) {
    return <LoadingSkeleton number={20} />;
  }
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {getPackage?.map((item: any, index: number) => {
            return (
              <div
                key={item._id || index}
                // href={`/packages/milestone/${packages?._id}?category=${packages?.category?._id}`}
              >
                <div className="p-3">
                  <div className="flex  w-full justify-center items-center bg-white shadow-2xl rounded-lg overflow-hidden p-2">
                    <div>
                      <Image
                        src={item?.package?.img || AllImage?.notFoundImage}
                        width={300}
                        height={500}
                        alt=""
                        className="h-20 w-24"
                      />
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-gray-900 capitalize text-center font-bold text-lg lg:text-2xl border-b-2 ">
                        {" "}
                        <EllipsisMiddle suffixCount={3} maxLength={90}>
                          {item?.package?.title}
                        </EllipsisMiddle>
                      </h1>
                      <div className="mt-2 flex justify-between ">
                        <p className="mt-2 font-bold capitalize text-gray-700 text-sm lg:text-base">
                          {" "}
                          <EllipsisMiddle suffixCount={3} maxLength={160}>
                            {item?.package?.membership?.title}
                          </EllipsisMiddle>
                        </p>
                        <p className="mt-2 font-bold capitalize text-gray-700 text-sm lg:text-base">
                          Total subject: {item?.package?.categories?.length}
                        </p>

                        {/* <ModalComponent buttonText="Add Student">
                      <AddStudentComponent />
                    </ModalComponent> */}
                      </div>

                      <div className="flex item-center justify-between mt-3">
                        <h1 className="text-gray-700 font-bold text-sm lg:text-base capitalize">
                          Package type: {item?.package?.purchase?.label}
                        </h1>
                        <p className="text-gray-700 font-bold text-sm lg:text-base capitalize">
                          Expiry date:{" "}
                          {item?.package?.expiry_date &&
                            dayjs(item?.package?.expiry_date).format(
                              "MMMM D, YYYY"
                            )}
                        </p>
                        {/* <Link
                      href={`/`}
                      className="px-3 py-2 bg-primary flex item-center  gap-2 text-white text-xs font-bold uppercase rounded"
                    >
                      <CiClock2 className="text-white" />{" "}
                      <span>{packages?.payment?.platform}</span>
                    </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
