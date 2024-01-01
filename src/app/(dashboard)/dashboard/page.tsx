import React from "react";
import { FaUser } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { SiSellfy } from "react-icons/si";
import { FaUserTimes } from "react-icons/fa";
import { FaUserNurse } from "react-icons/fa";
import { FaUserNinja } from "react-icons/fa";
import { Col, Row } from "antd";
const DashboardPage = () => {
  return (
    <>
      {/* <Chart></Chart> */}
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
                <span>{3}</span>
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
                <span>{4}</span>
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
                <span>{1}</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg bg-white max-w-full md:min-h-[40vh] lgg:min-h-[80vh] px-4 py-5 shadow">
          <div className="py-2 align-middle px-2">
            <h3 className="text-base font-medium underline underline-offset-2">
              Recent sales courses
            </h3>
            <div className="w-full divide-y divide-gray-300">
              <div className="flex justify-between">
                <p className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Name
                </p>
                <p className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  email
                </p>
              </div>
              <div className="divide-y divide-gray-200 space-y-4"></div>
            </div>
          </div>
        </div>
        <div className=" rounded-lg bg-white max-w-full md:min-h-[40vh] lgg:min-h-[80vh] px-4 py-5 shadow">
          <div className="py-2 align-middle px-2">
            <h3 className="text-base font-medium underline underline-offset-2">
              Recent publish courses
            </h3>
            <div className="w-full divide-y divide-gray-300">
              <div className="flex justify-between">
                <p className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Title
                </p>
                <p className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Details
                </p>
              </div>
              <div className="divide-y divide-gray-200 space-y-5"></div>
            </div>
          </div>
        </div>
        <div className=" rounded-lg bg-white max-w-full md:min-h-[40vh] lgg:min-h-[80vh] px-4 py-5 shadow">
          <div className="py-2 align-middle px-2">
            <h3 className="text-base font-medium underline underline-offset-2">
              Recent publish video{" "}
            </h3>
            <div className="divide-y divide-gray-300">
              <div className="flex justify-between">
                <p className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Title
                </p>
                <p className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Details
                </p>
              </div>
              <div className="divide-y divide-gray-200 space-y-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
