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

type ICard ={_id:string,title:string,icon:any,count:any,link?:string} 
export default function TopDashStatistics() {
  const { data: allUserData } = useGetAllUsersQuery({});
  // console.log(
  //   "🚀 ~ file: TopDashStatistics.tsx:14 ~ TopDashStatistics ~ allUserData:",
  //   allUserData
  // );

  const { data: allCourseData } = useGetAllCourseQuery({});
  const { data: allTrainer } = useGetAllTrainersQuery({});

  const userNumber =allUserData?.meta?.total
  const allCourseNumber =allCourseData?.meta?.total

  const cardData: ICard[] = [
    { _id: "1", title: "Total Users", icon: <FaUser className="h-7 w-7" />, count: userNumber, link: "" },
    { _id: "2", title: "Total Course", icon: <GiBookCover className="h-7 w-7" />, count: allCourseNumber, link: "" },
    { _id: "3", title: "Total Amount", icon: <MdAccountBalance className="h-7 w-7" />, count: 50, link: "" }, // Assign a number, not a string
    { _id: "4", title: "Total Sold Course", icon: <SiSellfy className="h-7 w-7" />, count: "", link: "" },
    { _id: "5", title: "Total Admin", icon: <FaUserTimes className="h-7 w-7" />, count: "", link: "" },
    { _id: "6", title: "Total Trainers", icon: <FaUserNurse className="h-7 w-7" />, count: allTrainer?.meta?.total, link: "" },
  ];
  return (
    <div>
      <Row gutter={[16, 16]}>

      {
  cardData?.map((item: ICard, index: number) => (
    <Col sm={16} md={6} key={index + 1}>
      <div className="col-span-12 sm:col-span-6 md:col-span-3">
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
          {item?.icon}
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">{item?.title}</div>
            <div className="font-bold text-lg">{item?.count}</div>
          </div>
        </div>
      </div>
    </Col>
  ))
}
   </Row>
    </div>
  );
}
