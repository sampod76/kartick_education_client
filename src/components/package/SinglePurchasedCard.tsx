"use client";
import { AllImage } from "@/assets/AllImge";
import { IPurchasedCategory, IPurchasedData } from "@/types/package/purchasedType";

import { EllipsisMiddle } from "@/utils/CutTextElliples";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiClock2 } from "react-icons/ci";
import dayjs from "dayjs";
import { Button } from "antd";
import ModalComponent from "../Modal/ModalComponents";
import AddStudentComponent from "../student/addStudentByAuthor/addStudentComponent";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import PackageToStudent from "./PackageToStudent";


export default function SInglePurchased({
  packages,
}: {
  packages: IPurchasedData;
}) {
  console.log("🚀 ~ packages:", packages);
  const router = useRouter();
  const userInfo = getUserInfo() as any;
  // console.log("🚀 ~ packages:", packages);
  const navigatePackage = (getPackage: any[]) => {
    //@ts-ignore
    const data = getPackage || []; // Example nested array of objects
    const stringifiedData = JSON.stringify(data);
    const encodedData = encodeURIComponent(stringifiedData);
    const href = `/${userInfo?.role}/package_category_and_course?data=${encodedData}`;
    router.push(href);
  };

  // console.log(new Date(packages?.expiry_date),'newDate', new Date())
  return (
    <div className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-md overflow-hidden bg-blue-200 min-h-full  lg:min-h-[30rem] cursor-pointer w-full lg:max-w-xl relative">
      <div onClick={() => navigatePackage(packages?.categories)}>
        <span
          className={`px-2 py-1 text-[16px] font-semibold  rounded-md ml-3 absolute -left-4 top-0 capitalize
                 bg-white

                  `}
        >
          {packages?.purchase?.label}
        </span>

        {/* //! top title section  */}
        <div
          className={`h-28 
        ${new Date(packages?.expiry_date) < new Date()
              ? "bg-red-600"
              : "bg-green-700"
            } text-center p-4`}
        >
          <h3 className="text-xl text-white uppercase font-semibold mb-1">
            {packages?.title}
            <span className="text-sm capitalize">
              {new Date(packages?.expiry_date) < new Date() && " (expired)"}
            </span>
          </h3>
          <p className="text-base font-mono text-slate-200">
            {packages?.user?.email}
          </p>
        </div>
        {/* //! round price  */}
        <div
          className={`h-24 w-24 mx-auto -mt-8 shadow-xl rounded-full ${new Date(packages?.expiry_date) < new Date()
              ? "bg-red-600"
              : "bg-green-700"
            } hover:brightness-125 transition-all duration-500 text-white border-4 flex flex-col items-center justify-center border-white`}
        >
          <h3 className="text-2xl font-semibold">${packages?.total_price}</h3>
        </div>
        {/* //! container or Category section */}
        <div className="px-6 py-5  mt-4  ">
          <ul className="space-y-4">
            {/* //! for bundle type */}
            {packages?.type &&
              packages?.categories?.map((categoryData: IPurchasedCategory) => {
                const category = categoryData?.category;
                // console.log(category);
                return (
                  <li
                    className="flex items-center text-sm text-gray-500"
                    key={category?._id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                        data-original="#000000"
                      />
                    </svg>
                    <span className="text-[16px]"> {category?.title}</span>
                    {/* <span>{category?.title}</span> */}
                    <span className="text-[12px] text-slate-600 ml-2">
                      {categoryData?.label}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
        {/* //! Footer section  */}
        <div className="px-3 bg-gray-200 rounded min-h-max py-3  w-full">
          <h4 className="text-center mb-3 uppercase text-lg">
            {" "}
            {packages?.membership?.title}
          </h4>
          <h2 className="text-sm capitalize flex justify-between">
            <span>Total Purchased: {packages?.total_purchase_student}</span>
            <span>
              Remaining Student:{" "}
              {packages?.total_purchase_student - packages?.students?.length}
            </span>
          </h2>
          <h4 className="flex justify-between my-2">
            <span>Paid by {packages?.payment?.platform}</span>
            <span>
              {" "}
              {packages?.paymentStatus === "approved" ? (
                <span className="text-sm p-1 rounded-sm text-white bg-green-700">
                  Approved
                </span>
              ) : packages?.paymentStatus === "pending" ? (
                <span className="text-sm p-1 rounded-sm text-white bg-red-600">
                  Pending
                </span>
              ) : (
                <span className="text-sm p-1 rounded-sm text-white bg-red-600">
                  Rejected
                </span>
              )}
            </span>{" "}
          </h4>
          <p className="mb-2 text-sm text-slate-900">
            Transaction: {packages?.payment?.transactionId}
          </p>
          <h2 className={`text-base  `}>
            Expire date:{" "}
            <span
              className={`text-sm 
          ${new Date(packages?.expiry_date) < new Date()
                  ? "text-red-700"
                  : "text-stone-700"
                }
          `}
            >
              {packages?.expiry_date &&
                dayjs(packages?.expiry_date).format("MMMM D, YYYY")}{" "}
              {new Date(packages?.expiry_date) < new Date() && " (expired)"}
            </span>
          </h2>
        </div>
      </div>
      <div className="flex justify-end items-center absolute bottom-0 right-0 ">
        <ModalComponent buttonText="View Student List">
          <PackageToStudent packageId={packages?._id} />
        </ModalComponent>
      </div>
    </div>
  );
}
