"use client";
import { AllImage } from "@/assets/AllImge";
import { IPurchasedCategory, IPurchasedData } from "@/types/purchasedType";

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


export default function SInglePurchased({
  packages,
}: {
  packages: IPurchasedData;
}) {
  console.log("🚀 ~ packages:", packages)
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
  return (
    <div
      // href={`/packages/milestone/${packages?._id}?category=${packages?.category?._id}`}
      onClick={() => navigatePackage(packages?.categories)}
      className="cursor-pointer"
    >
      <div

        className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-md overflow-hidden transition-all duration-500 hover:scale-105 relative bg-blue-200 min-h-full  lg:min-h-[30rem] "
      >
        <span
          className={`px-2 py-1 text-[16px] font-semibold  rounded-md ml-3 absolute -left-4 top-0 capitalize
                 bg-white
                  `}
        >
          {packages?.purchase?.label}
        </span>
        <div
          className={`h-28 bg-green-600
                    } text-center p-4`}
        >
          <h3 className="text-2xl text-white uppercase font-semibold mb-1">
            {packages?.title}
          </h3>
          <p className="text-xs text-white">

          </p>
        </div>
        <div
          className={`h-24 w-24 mx-auto -mt-8 shadow-xl rounded-full ${new Date(packages?.expiry_date) < new Date()
            ? "bg-green-600"
            : "bg-gray-700"
            } text-white border-4 flex flex-col items-center justify-center border-white`}
        >
          <h3 className="text-2xl font-semibold">
            ${packages?.total_price}
          </h3>
        </div>
        <div className="px-6 py-4 mt-4 h-max ">
          <ul className="space-y-4">
            {/* //! for bundle type */}
            {packages?.type &&
              packages?.categories?.map(
                (categoryData: IPurchasedCategory) => {
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
                      <span className="text-[16px]">
                        {" "}
                        {category?.title}
                      </span>
                      {/* <span>{category?.title}</span> */}
                      <span className="text-[12px] text-slate-600 ml-2">
                        {categoryData?.label}
                      </span>
                    </li>
                  );
                }
              )}

          </ul>

        </div>
      </div>
    </div >
  );
}
