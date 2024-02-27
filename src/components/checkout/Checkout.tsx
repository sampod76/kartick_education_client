"use client";
import React, { useEffect, useState } from "react";
import UserAvatarUI from "../ui/NavUI/UserAvatarUI";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { Row, Space, Spin } from "antd";
import Image from "next/image";
import { AllImage } from "@/assets/AllImge";
import { LockOutlined } from "@ant-design/icons";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import { GrRadialSelected } from "react-icons/gr";
import ButtonLoading from "../ui/Loading/ButtonLoading";
import PaypalCheckoutByCourse from "../Utlis/PaypalCheckoutByCourse";

export default function Checkout({ courseId }: { courseId?: string }) {
  console.log("🚀 ~ Checkout ~ courseId:", courseId)

  // const userInfo = getUserInfo() as any;
  const { userInfo, userInfoLoading } = useGlobalContext();


  const { data, isLoading } = useGetSingleCourseQuery(courseId, {
    skip: !Boolean(courseId),
  });

  console.log("🚀 ~ Checkout ~ data:", data)
  if (userInfoLoading || isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin size="large"></Spin>
        </Space>
      </Row>
    );
  }
  return (
    <div className="min-h-screen px-2">
      <div className="container mx-auto my-9 flex items-center gap-3 text-lg">
        <UserAvatarUI />
        <h5 className="text-lg lg:text-xl">Logged in as {userInfo?.email} </h5>
      </div>
      <div className="container mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl ">Your Order</h1>
        <div className=" mt-8">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="py-5 px-4 border flex items-center gap-5  ">
                  <Image
                    src={data?.img || AllImage.notFoundImage}
                    style={{ height: "64px", width: "80px" }}
                    width={150}
                    height={150}
                    alt="course"
                  />
                  <h1 className="text-lg md:text-xl lg:text-2xl ">
                    {data?.title}
                  </h1>
                </th>
                <th className="py-5 px-4 border">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="py-5 px-4 border text-[#797979]">Sub Total</td>
                <td className="py-5 px-4 border text-xl lg:text-2xl font-bold">
                  $ {data?.price}
                </td>
              </tr>
              <tr className="bg-gray-100 border">
                <td className="py-5 px-4 border text-[#797979]">Total</td>
                <td className="py-5 px-4 border text-xl lg:text-2xl font-bold">
                  $ {data?.price}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 container mx-auto">
        <h2 className="my-3 text-lg lg:text-xl">Additional Note </h2>
        <textarea className="w-full min-h-[4rem] lg:min-h-[8rem] border border-[#DADADA] outline-none p-3" />

        <div className="mt-7">
          <div className="flex justify-between items-center uppercase">
            <h2 className="text-lg lg:text-xl font-bold uppercase my-3">
              PAYMENT
            </h2>
            <p className="text-sm text-slate-600">
              <LockOutlined style={{ marginInline: "3px" }} />
              secure payment
            </p>
          </div>

          <div className="text-2xl font-bold flex justify-start items-center gap-2 bg-[#d4d4d4] p-4">
            <GrRadialSelected />{" "}
            <p className="italic text-[#273b7c]">
              Pay<span className="text-[#1997cd]">Pal</span>
            </p>
          </div>

          <PaypalCheckoutByCourse courseData={data} />
        </div>
      </div>
    </div>
  );
}
