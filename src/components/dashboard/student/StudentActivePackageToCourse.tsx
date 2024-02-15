"use client";
import React from "react";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { Error_model_hook } from "@/utils/modalHook";
import NotFoundCourse from "@/components/ui/NotFound/NotFoundCourse";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { AllImage } from "@/assets/AllImge";
import Image from "next/image";
import { Dropdown, Menu, Progress, Rate, Space } from "antd";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import { ICourseData } from "@/types/courseType";
import formatMongoCreatedAtDate from "@/hooks/formateMongoTimeToLocal";
import { getUserInfo } from "@/services/auth.service";
import { useGetAllPackageAndCourseQuery } from "@/redux/api/sellerApi/addPackageAndCourse";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UMTable from "@/components/ui/UMTable";

export default function StudentActivePackageToCourse() {
  const userInfo = getUserInfo() as any;

  const router = useRouter();

  // !auto detection userid
  const { data, isLoading, error } = useGetAllPackageAndCourseQuery(
    { user: userInfo.id },
    { skip: !Boolean(userInfo.id) }
  );
  //@ts-ignore

  // if (isLoading) {
  //   return <LoadingSkeleton number={20} />;
  // }
  const packageData = data?.data || [];
  if (error) {
    const errorType: any = error;
    Error_model_hook(errorType?.message);
  }
  const columns = [
    {
      title: "Name",
      render: function (data: any) {
        // console.log(data);
        const fullName = `${data?.sellerPackageDetails?.title}  `;
        return <>{fullName}</>;
      },
    },
    {
      title: "Total subject",
      render: function (data: any) {
        // console.log(data);
        const total = `${data?.sellerPackageDetails?.categories?.length}  `;
        return <>{total}</>;
      },
    },
    {
      title: "Time",
      render: function (data: any) {
        // console.log(data);
        const label = `${data?.sellerPackageDetails?.purchase?.label}  `;
        return <>{label}</>;
      },
    },
    {
      title: "Expiry date",
      render: function (data: any) {
        // console.log(data);
        const label = `${data?.sellerPackageDetails?.expiry_date &&
          dayjs(data?.sellerPackageDetails?.expiry_date).format("MMMM D, YYYY")
          } `;
        return <>{label}</>;
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
              {/* <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="details">
                      <Link href={`/${userInfo?.role}/students/details/${id}`}>
                        View
                      </Link>
                    </Menu.Item>
                  </Menu>
                }
              >
                <button className="text-blue-700">Action</button>
              </Dropdown> */}
              <button
                onClick={() =>
                  navigatePackage(data?.sellerPackageDetails?.categoriesDetails)
                }
              >
                View
              </button>
            </Space>
          </>
        );
      },
    },
  ];

  const navigatePackage = (getPackage: any[]) => {
    console.log("🚀 ~ navigatePackage ~ getPackage:", getPackage);

    //@ts-ignore
    const data =
      getPackage?.map((single: any) => ({
        _id: single._id,
        title: single.title,
      })) || []; // Example nested array of objects
    const stringifiedData = JSON.stringify(data);
    const encodedData = encodeURIComponent(stringifiedData);
    const href = `/${userInfo?.role}/package_category_and_course?data=${encodedData}`;
    router.push(href);
  };
  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : packageData?.length === 0 ? (
        <NotFoundCourse />
      ) : (
        <>
          <UMTable
            loading={isLoading}
            columns={columns}
            dataSource={packageData}
          />
        </>
      )}
    </>
  );
}
