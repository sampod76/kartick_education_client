"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { SiSellfy } from "react-icons/si";
import { FaUserTimes } from "react-icons/fa";
import { FaUserNurse } from "react-icons/fa";
import { FaUserNinja } from "react-icons/fa";
import { Col, Row } from "antd";
import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useGetAllTrainersQuery } from "@/redux/api/adminApi/trainer";
export default function TopDashStatistics() {
  const { data: allUserData } = useGetAllUsersQuery({});
  console.log(
    "🚀 ~ file: TopDashStatistics.tsx:14 ~ TopDashStatistics ~ allUserData:",
    allUserData
  );

  const { data: allCourseData } = useGetAllCourseQuery({});
  const { data: allTrainer } = useGetAllTrainersQuery({});

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col sm={8} md={6}>
          <div className="border text-white bg-[#4e36e2] w-full p-4 shadow rounded-xl flex justify-between items-center h-28 ">
            <p className="border-2 border-white rounded-md p-1">
              <FaUser className="h-7 w-7" />
            </p>
            <div className="space-y-2">
              <p className="text-end font-normal text-base lggg:text-lg">
                Total Users
              </p>

              <div className="font-bold font-sans text-end text-2xl">
                <span>{allUserData?.meta?.total}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={8} md={6}>
          <div className="border text-white bg-[#1ad588] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
            <p className="border-2 border-white rounded-md p-1">
              <GiBookCover className="h-7 w-7" />
            </p>
            <div className="space-y-2">
              <p className="text-end font-normal text-base lggg:text-lg">
                Total Course
              </p>
              <div className="font-bold font-sans text-end text-2xl">
                <span>{allCourseData?.meta?.total}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={8} md={6}>
          <div className="border text-white bg-[#60803b] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
            <p className="border-2 border-white rounded-md p-1">
              <MdAccountBalance className="h-7 w-7" />
            </p>
            <div className="space-y-2">
              <p className="text-end font-normal text-base lggg:text-lg">
                Total Amount
              </p>
              <div className="font-bold font-sans text-end text-xl lgg:text-2xl">
                <span>${0}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={8} md={6}>
          <div className="border text-white bg-[#508baa] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
            <p className="border-2 border-white rounded-md p-1">
              <SiSellfy className="h-7 w-7" />
            </p>
            <div className="space-y-2">
              <p className="text-end font-normal text-base lggg:text-lg">
                Total Sales courses
              </p>
              <div className="font-bold font-sans text-end text-xl lgg:text-2xl">
                <span>{0}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={8} md={6}>
          <div className="border text-white bg-[#1d7ca5] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
            <p className="border-2 border-white rounded-md">
              <FaUserTimes className="h-7 w-7" />
            </p>
            <div className="space-y-2">
              <p className="text-end font-normal text-base lggg:text-lg">
                Total Admin
              </p>
              <div className="font-bold font-sans text-end text-xl lgg:text-2xl">
                <span>{2}</span>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={8} md={6}>
          <div className="border text-white bg-[#1d7ca5] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
            <p className="border-2 border-white rounded-md p-1">
              <FaUserNurse className="h-7 w-7" />
            </p>
            <div className="space-y-2">
              <p className="text-end font-normal text-base lggg:text-lg">
                Total Trainer
              </p>
              <div className="font-bold font-sans text-end text-xl lgg:text-2xl">
                <span>{allTrainer?.meta?.total}</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
