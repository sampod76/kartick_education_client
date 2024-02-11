"use client";
import React from "react";

import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { IPurchasedData } from "@/types/package/purchasedType";
import SInglePurchased from "./SinglePurchasedCard";
import { ENUM_YN } from "@/constants/globalEnums";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { AllImage } from "@/assets/AllImge";
import Image from "next/image";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import dayjs from "dayjs";
import { useAddPackageAndCourseMutation } from "@/redux/api/sellerApi/addPackageAndCourse";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import {
  useUpdateIncreaseStudentPackageMutation,
  useUpdatePackageMutation,
} from "@/redux/api/userApi/packageAPi";
import { Button } from "antd";
import { useGetAllPurchaseAcceptedPackageQuery } from "@/redux/api/public/purchaseAPi";

export default function SellerAddPackageStudent({ setOpen, userId }: any) {
  const userInfo = getUserInfo() as IDecodedInfo;
  const [addPackageAndCourse, { isLoading: addPackageAndCourseLoading }] =
    useAddPackageAndCourseMutation();
  const [updateIncreaseStudentPackage, { isLoading: packageUpdateLoading }] =
    useUpdateIncreaseStudentPackageMutation();
  const { data: purchasedData, isLoading } = useGetAllPurchaseAcceptedPackageQuery({
    status: "active",
    isDelete: ENUM_YN.NO,
    limit: 99999,
    user: userInfo?.id,
  });

  if (isLoading) {
    return <LoadingSkeleton number={10} />;
  }
  const addPackageForStudent = async (packageId: string) => {
    try {
      const data = await addPackageAndCourse({
        sellerPackage: packageId,
        user: userId,
        author: userInfo.id,
      }).unwrap();
      console.log("🚀 ~ addPackageForStudent ~ data:", data);

      const data2 = await updateIncreaseStudentPackage({
        id: packageId,
        data: { studentId: userId },
      });
      console.log("🚀 ~ addPackageForStudent ~ data2:", data2);

      Success_model("Successfully added package");
      setOpen(false);
    } catch (error: any) {
      Error_model_hook(error.message);
      console.log(error);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {purchasedData?.data?.map((item: IPurchasedData, index: number) => {
          return (
            <div
              key={item._id || index}
            // href={`/packages/milestone/${packages?._id}?category=${packages?.category?._id}`}
            >
              <div className="p-3">
                <div className="flex flex-col w-full justify-center items-center bg-white shadow-2xl rounded-lg overflow-hidden p-2">
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
                        {item?.title}
                      </EllipsisMiddle>
                    </h1>
                    <div className="mt-2 flex justify-between ">
                      <p className="mt-2 font-bold capitalize text-gray-700 text-sm lg:text-base">
                        {" "}
                        <EllipsisMiddle suffixCount={3} maxLength={160}>
                          {item?.membership?.title}
                        </EllipsisMiddle>
                      </p>

                      {/* <ModalComponent buttonText="Add Student">
                      <AddStudentComponent />
                    </ModalComponent> */}
                    </div>

                    <div className="mt-2 flex justify-between ">
                      <h1 className="text-sm lg:text-base text-gray">
                        Total Student: {item?.total_purchase_student}
                      </h1>
                      <h1 className="text-sm lg:text-base text-gray capitalize">
                        Remaining Student:{" "}
                        {item?.total_purchase_student - item?.students?.length}
                      </h1>
                    </div>

                    <div className="flex item-center justify-between mt-3">
                      <h1 className="text-gray-700 font-bold text-sm lg:text-base capitalize">
                        Package type: {item?.purchase?.label}
                      </h1>
                      <p className="text-gray-700 font-bold text-sm lg:text-base capitalize">
                        Expiry date:{" "}
                        {item?.expiry_date &&
                          dayjs(item?.expiry_date).format("MMMM D, YYYY")}
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
                  <div className="flex justify-center items-center  text-white px-10 py-2 rounded-md">
                    <Button
                      loading={addPackageAndCourseLoading}
                      style={{ background: "blue", color: "white", padding: "5px 10px" }}
                      onClick={() => addPackageForStudent(item._id)}
                    >
                      Add +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
