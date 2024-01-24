"use client";
import { AllImage } from "@/assets/AllImge";
import { IPurchasedData } from "@/types/purchasedType";

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
  const router = useRouter();
  const userInfo = getUserInfo() as any;
  console.log("🚀 ~ packages:", packages);
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
      <div className="p-2">
        <div className="flex w-full justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden p-2">
          <div>
            <Image
              src={packages?.package?.img || AllImage?.notFoundImage}
              width={300}
              height={500}
              alt=""
              className="h-36 w-40"
            />
          </div>
          <div className="w-full p-2">
            <h1 className="text-gray-900 capitalize text-center font-bold text-2xl border-b-2 ">
              {" "}
              <EllipsisMiddle suffixCount={3} maxLength={90}>
                {packages?.title}
              </EllipsisMiddle>
            </h1>
            <div className="mt-2 flex justify-between ">
              <p className="mt-2 font-bold capitalize text-gray-700 text-base">
                {" "}
                <EllipsisMiddle suffixCount={3} maxLength={160}>
                  {packages?.membership?.title}
                </EllipsisMiddle>
              </p>

              {/* <ModalComponent buttonText="Add Student">
                <AddStudentComponent />
              </ModalComponent> */}
            </div>

            <div className="mt-2 flex justify-between ">
              <h1 className="text-base text-gray">
                Total Student: {packages?.total_purchase_student}
              </h1>
              <h1 className="text-base text-gray capitalize">
                Remaining Student:{" "}
                {packages?.total_purchase_student - packages?.students?.length}
              </h1>
            </div>

            <div className="flex item-center justify-between mt-3">
              <h1 className="text-gray-700 font-bold text-base capitalize">
                Package type: {packages?.purchase?.label}
              </h1>
              <p className="text-gray-700 font-bold text-base capitalize">
                Expiry date:{" "}
                {packages?.expiry_date &&
                  dayjs(packages?.expiry_date).format("MMMM D, YYYY")}
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
}
