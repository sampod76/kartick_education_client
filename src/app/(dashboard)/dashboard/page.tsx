import React from "react";
import { FaUser } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { SiSellfy } from "react-icons/si";
import { FaUserTimes } from "react-icons/fa";
import { FaUserNurse } from "react-icons/fa";
import { FaUserNinja } from "react-icons/fa";
import { Col, Row } from "antd";
import TopDashStatistics from "@/components/dashboard/mainpage/TopDashStatistics";
const DashboardPage = () => {
  return (
    <>
      {/* <Chart></Chart> */}

      <TopDashStatistics />

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
