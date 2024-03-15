/* eslint-disable @next/next/no-img-element */
"use client";

import { AllImage } from "@/assets/AllImge";
import SIngleBannerSIngleCourse from "@/components/Home/coureses/SIngleBannerSIngleCourse";
import { useGetSinglePurchaseAcceptAndPendingCourseQuery } from "@/redux/api/public/purchaseAPi";
import { IPackageCategory } from "@/types/package/packageType";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import { Checkbox, Radio, Spin } from "antd";
import React from "react";
import { CiClock2 } from "react-icons/ci";
export default function Detailscourse({ purchaseId }: { purchaseId: string }) {
  // const { data: courseData, isLoading } = useGetSinglePurchaseCourseQuery(purchaseId)

  //! Test UI

  const { data: course, isLoading } =
    useGetSinglePurchaseAcceptAndPendingCourseQuery(purchaseId);

  // console.log("🚀 ~ file: DetailsPurchasePackage.tsx:13 ~ DetailsPurchasePackage ~ allPurchaseData:", allPurchaseData)
  // const courseData = allPurchaseData?.data?.find((item: any) => item?._id === purchaseId)
  // const course = courseData?.course

  const userData = course?.user;

  if (isLoading) {
    return (
      <div className="text-center min-h-screen">
        <Spin tip="loading package" size="large" />
      </div>
    );
  }

  // console.log(course, 'course')
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
        {/* Package section */}
        <div className="rounded-md">
          <h2 className="text-center py-2">Course Details</h2>

          <div className="py-2">
            <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
              <div
                className="w-1/3 bg-cover"
                style={{
                  backgroundImage: `url(${course?.img || AllImage?.notFoundImage
                    })`,
                }}
              ></div>
              <div className="w-2/3 p-2">
                <h1 className="text-gray-900 font-bold text-2xl">
                  {" "}
                  <EllipsisMiddle suffixCount={3} maxLength={90}>
                    {course?.title}
                  </EllipsisMiddle>
                </h1>
                <p className="mt-2 text-gray-600 text-sm">
                  {" "}
                  <EllipsisMiddle suffixCount={3} maxLength={160}>
                    {course?.short_description}
                  </EllipsisMiddle>
                </p>
                <div className="flex item-center mt-2">
                  <svg
                    className="w-5 h-5 fill-current text-yellow-700"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg
                    className="w-5 h-5 fill-current text-yellow-700"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg
                    className="w-5 h-5 fill-current text-yellow-700"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg
                    className="w-5 h-5 fill-current text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg
                    className="w-5 h-5 fill-current text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </div>
                <div className="flex item-center justify-between mt-3">
                  <h1 className="text-gray-700 font-bold text-xl">
                    {course?.price}
                  </h1>
                  <button className="px-3 py-2 bg-primary flex item-center  gap-2 text-white text-xs font-bold uppercase rounded">
                    <CiClock2 className="text-white" />{" "}
                    <span>{course?.total_time_duration || "4,5 jam"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* user section */}

        <div className="max-w-2xl lg:max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden ">
          <h2 className="text-center py-2">Purchased User</h2>
          <img
            className="w-full h-56 object-cover object-center"
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            alt="avatar"
          />
          <div className="flex items-center px-6 py-3 bg-gray-900">
            <svg
              className="h-6 w-6 text-white fill-current"
              viewBox="0 0 512 512"
            >
              <path d="M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6 65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3 149.3-153.3s149.3 68.5 149.3 153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448 136.2 362 48 256 48z" />
            </svg>
            <h1 className="mx-3 text-white font-semibold text-lg">
              {userData?.role}
            </h1>
          </div>
          <div className="py-4 px-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {userData?.email}
            </h1>
            <p className="py-2 text-lg text-gray-700">{userData?.userId}</p>
            <div className="flex items-center mt-4 text-gray-700">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                <path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z" />
                <g>
                  <path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z" />
                </g>
              </svg>
              <h1 className="px-2 text-sm">
                {course?.membership?.title}
                {" (Package )"}
              </h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
              </svg>
              <h1 className="px-2 text-sm">{course?.payment?.transactionId}</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
              </svg>
              <h1 className="px-2 text-sm">{userData?.email}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
