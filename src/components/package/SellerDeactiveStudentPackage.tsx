"use client";
import React, { useState } from "react";

import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { IPurchasedData } from "@/types/package/purchasedType";
import SInglePurchased from "./SinglePurchasedCard";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { AllImage } from "@/assets/AllImge";
import Image from "next/image";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import dayjs from "dayjs";
import {
  useAddPackageAndCourseMutation,
  useGetAllPackageAndCourseQuery,
  useUpdatePackageAndCourseMutation,
} from "@/redux/api/sellerApi/addPackageAndCourse";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import {
  useUpdateIncreaseStudentPackageMutation,
  useUpdatePackageMutation,
} from "@/redux/api/userApi/packageAPi";
import { Button, Dropdown, Menu, Space } from "antd";
import { useGetAllPurchaseAcceptedPackageQuery } from "@/redux/api/public/purchaseAPi";
import UMTable from "../ui/UMTable";
import Link from "next/link";

export default function SellerDeactivedStudentPackage({
  setOpen,
  userId,
}: any) {
  const userInfo = getUserInfo() as IDecodedInfo;

  const [updatePackageAndCourse, { isLoading: addPackageAndCourseLoading }] =
    useUpdatePackageAndCourseMutation();

  const { data: singleStudentPurchaseData, isLoading } =
    useGetAllPackageAndCourseQuery(
      {
        isDelete: ENUM_YN.NO,
        limit: 99999,
        author: userInfo?.id,
        user: userId,
      },
      { skip: !Boolean(userId) }
    );
  console.log(
    "🚀 ~ SellerAddPackageStudent ~ singleStudentPurchaseData:",
    singleStudentPurchaseData
  );

  if (isLoading) {
    return <LoadingSkeleton number={10} />;
  }
  const removePackage = async (packageId: string, data: any) => {
    try {
      const data2 = await updatePackageAndCourse({
        id: packageId,
        data: {
          status:
            data?.status === ENUM_STATUS.ACTIVE
              ? ENUM_STATUS.DEACTIVATE
              : ENUM_STATUS.ACTIVE,
        },
      });

      Success_model(
        `Successfully Update status`
      );
      setOpen(false);
    } catch (error: any) {
      Error_model_hook(error.message);
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Name",
      render: function (data: any) {
        // console.log(data);
        const fullName = `${data?.sellerPackageDetails?.title}  `;
        return <>{fullName}</>;
      },
    },

    // {
    //   title: "Gender",
    //   // dataIndex: "gender",
    //   render: function (data: any) {
    //     // console.log(data);
    //     const gender = `${data[data.role]?.gender}   `;
    //     return <>{gender}</>;
    //   },
    // },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: 130,
      render: function (id: string, data: any) {
        return (
          <>
            <Space size="middle">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="details">
                      <Link href={`/${userInfo?.role}/students/details/${id}`}>
                        View
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="delete"
                      onClick={() => {
                        removePackage(id, data);
                      }}
                    >
                      {data.status === ENUM_STATUS.ACTIVE
                        ? "Deactivate"
                        : "Active"}{" "}
                      Package
                    </Menu.Item>
                  </Menu>
                }
              >
                <button className="text-blue-700">Action</button>
              </Dropdown>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={singleStudentPurchaseData?.data}
      />
    </div>
  );
}
