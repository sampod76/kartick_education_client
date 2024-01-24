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
import { useRouter } from "next/navigation";

export default function StudentActivePackageToCourse() {
  const userInfo = getUserInfo() as any;

  const router = useRouter();
  // !auto detection userid
  const { data, isLoading, error } = useGetAllPackageAndCourseQuery(
    { user: userInfo.id },
    // { skip: !Boolean(userInfo.id) }
    {}
  );
  //@ts-ignore
  const getPackage = data?.data;

  if (isLoading) {
    return <LoadingSkeleton number={20} />;
  }
  const courseData = data?.data || [];
  if (error) {
    const errorType: any = error;
    Error_model_hook(errorType?.message);
  }

  const navigatePackage = (getPackage: any[]) => {
    //@ts-ignore
    const data = getPackage || []; // Example nested array of objects
    const stringifiedData = JSON.stringify(data);
    const encodedData = encodeURIComponent(stringifiedData);
    const href = `/${userInfo?.role}/package_category_and_course?data=${encodedData}`;
    router.push(href);
  };
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
                onClick={() =>
                  navigatePackage(item?.sellerPackageDetails?.categoriesDetails)
                }
                // href={`/packages/milestone/${packages?._id}?category=${packages?.category?._id}`}
              >
                <div className="p-3 cursor-pointer">
                  <div className="flex flex-col  w-full justify-center items-center bg-white shadow-2xl rounded-lg overflow-hidden p-2">
                    <div>
                      <Image
                        src={
                          item?.sellerPackageDetails?.package?.img ||
                          AllImage?.notFoundImage
                        }
                        width={300}
                        height={500}
                        alt=""
                        className="h-20 w-24"
                      />
                    </div>
                    <div className="w-full p-2">
                      <h1 className="text-gray-900 capitalize text-center  text-lg lg:text-2xl border-b-2 ">
                        {" "}
                        <EllipsisMiddle suffixCount={3} maxLength={90}>
                          {item?.sellerPackageDetails?.title}
                        </EllipsisMiddle>
                      </h1>
                      <div className="mt-2 flex justify-between ">
                        <p className="mt-2  capitalize text-gray-700 text-sm lg:text-base">
                          {" "}
                          <EllipsisMiddle suffixCount={3} maxLength={160}>
                            {item?.sellerPackageDetails?.membership?.title}
                          </EllipsisMiddle>
                        </p>
                        <p className="mt-2  capitalize text-gray-700 text-sm lg:text-base">
                          Total subject:{" "}
                          {item?.sellerPackageDetails?.categories?.length}
                        </p>

                        {/* <ModalComponent buttonText="Add Student">
                      <AddStudentComponent />
                    </ModalComponent> */}
                      </div>

                      <div className="flex item-center justify-between mt-3">
                        <h1 className="text-gray-700  text-sm lg:text-base capitalize">
                          Package type:{" "}
                          {item?.sellerPackageDetails?.purchase?.label}
                        </h1>
                        <p className="text-gray-700  text-sm lg:text-base capitalize">
                          Expiry date:{" "}
                          {item?.sellerPackageDetails?.expiry_date &&
                            dayjs(
                              item?.sellerPackageDetails?.expiry_date
                            ).format("MMMM D, YYYY")}
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
