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
import { useGetAllTrainersQuery } from "@/redux/api/adminApi/trainerApi";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { ENUM_YN } from "@/constants/globalEnums";
import {
  useGetAllPurchaseAcceptedCourseAmountQuery,
  useGetAllPurchaseAcceptedCourseQuery,
  useGetAllPurchaseAcceptedPackageAmountQuery,
  useGetAllPurchaseAcceptedPackageQuery,
  useGetAllPurchasePendingAndAcceptedCourseQuery,
} from "@/redux/api/public/purchaseAPi";

type ICard = {
  _id: string;
  title: string;
  icon: any;
  count: any;
  link?: string;
};
export default function TopDashStatistics() {

  const {
    data: allUserData,
    error: UserError,
    isLoading: userLoading,
  } = useGetAllUsersQuery({ isDelete: ENUM_YN.NO });
  const {
    data: allCourseData,
    error: CourseError,
    isLoading: courseLoading,
  } = useGetAllCourseQuery({ isDelete: ENUM_YN.NO });
  console.log("🚀 ~ TopDashStatistics ~ allCourseData:", allCourseData);
  const {
    data: allTrainer,
    error: trainerError,
    isLoading: trainerLoading,
  } = useGetAllTrainersQuery({ isDelete: ENUM_YN.NO });
  const {
    data: allAcceptedCourse,
    error: allAcceptedCourseError,
    isLoading: allAcceptedCourseLoading,
  } = useGetAllPurchaseAcceptedCourseQuery({ isDelete: ENUM_YN.NO });
  const {
    data: allSellPackage,
    error: allSellPackageError,
    isLoading: allSellPackageLoading,
  } = useGetAllPurchaseAcceptedPackageQuery({ isDelete: ENUM_YN.NO });
  const {
    data: allSellPackageAmount,
    error: allSellPackageAmountError,
    isLoading: allSellPackageAmountLoading,
  } = useGetAllPurchaseAcceptedPackageAmountQuery({ isDelete: ENUM_YN.NO });

  console.log(
    "🚀 ~ TopDashStatistics ~ allSellPackageAmount:",
    allSellPackageAmount
  );
  const {
    data: allSellCourseAmount,
    error: allSellCourseErrorAmount,
    isLoading: allSellCourseAmountLoading,
  } = useGetAllPurchaseAcceptedCourseAmountQuery({ isDelete: ENUM_YN.NO });



  const userNumber = allUserData?.meta?.total;
  const allCourseNumber = allCourseData?.meta?.total;

  const cardData: ICard[] = [
    {
      _id: "1",
      title: "Total Users",
      icon: <FaUser className="h-7 w-7" />,
      count: userNumber,
      link: "",
    },
    {
      _id: "2",
      title: "Total Course",
      icon: <GiBookCover className="h-7 w-7" />,
      count: allCourseNumber,
      link: "",
    },
    {
      _id: "3",
      title: "Total Amount",
      icon: <MdAccountBalance className="h-7 w-7" />,
      count: 50,
      link: "",
    }, // Assign a number, not a string
    {
      _id: "4",
      title: "Total Sold Course",
      icon: <SiSellfy className="h-7 w-7" />,
      count: "",
      link: "",
    },
    {
      _id: "5",
      title: "Total Admin",
      icon: <FaUserTimes className="h-7 w-7" />,
      count: "",
      link: "",
    },
    {
      _id: "6",
      title: "Total Trainers",
      icon: <FaUserNurse className="h-7 w-7" />,
      count: allTrainer?.meta?.total,
      link: "",
    },
  ];

  if (
    userLoading ||
    courseLoading ||
    trainerLoading ||
    allAcceptedCourseLoading ||
    allSellPackageLoading ||
    allSellCourseAmountLoading ||
    allSellPackageAmountLoading
  ) {
    return <LoadingSkeleton />;

  }
  return (
    <div>
      {/* <Row gutter={[16, 16]}>
        {cardData?.map((item: ICard, index: number) => (
          <Col style={{ width: "100%" }} sm={16} md={6} key={index + 1}>
            <div className="w-full col-span-12 sm:col-span-6 md:col-span-3">
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
        ))}
      </Row> */}
      <>
        {
          <div className="w-full mx-auto p-4 grid grid-cols-12 gap-2 min-h-screen">
            <section className="col-span-12 relative top-0 z-10">
              {/* <Chart></Chart> */}
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-4 xl:gap-6 text-[30px]">
                <div className="border text-white bg-[#4e36e2] w-full p-4 shadow rounded-xl flex justify-between items-center h-28 ">
                  <p className="border-2 border-white rounded-md p-1">
                    <FaUser className="h-7 w-7" />
                  </p>
                  <div className="space-y-2">
                    <p className="text-end font-normal text-base lggg:text-lg">
                      Total Users
                    </p>

                    <div className="font-bold font-sans text-end text-2xl">
                      <span>{userNumber || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="border text-white bg-[#1ad588] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                  <p className="border-2 border-white rounded-md p-1">
                    <GiBookCover className="h-7 w-7" />
                  </p>
                  <div className="space-y-2">
                    <p className="text-end font-normal text-base lggg:text-lg">
                      Total Course
                    </p>
                    <div className="font-bold font-sans text-end text-2xl">
                      <span>{allCourseNumber || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="border text-white bg-[#60803b] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                  <p className="border-2 border-white rounded-md p-1">
                    <MdAccountBalance className="h-7 w-7" />
                  </p>
                  <div className="space-y-2">
                    <p className="text-end font-normal text-base lggg:text-lg">
                      Total Amount
                    </p>
                    <div className="font-bold font-sans text-end text-xl lgg:text-2xl">
                      <span>
                        $
                        {allSellCourseAmount?.data[0]?.totalAmount +
                          allSellPackageAmount?.data[0]?.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border text-white bg-[#508baa] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                  <p className="border-2 border-white rounded-md p-1">
                    <SiSellfy className="h-7 w-7" />
                  </p>
                  <div className="space-y-2">
                    <p className="text-end font-normal text-base lggg:text-lg">
                      Total Sales courses
                    </p>
                    <div className="font-bold font-sans text-end text-xl lgg:text-2xl">
                      <span>${allSellCourseAmount?.data[0]?.totalAmount}</span>
                    </div>
                  </div>
                </div>
                <div className="border text-white bg-[#5eacd6] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                  <p className="border-2 border-white rounded-md p-1">
                    <SiSellfy className="h-7 w-7" />
                  </p>
                  <div className="space-y-2">
                    <p className="text-end font-normal text-base lggg:text-lg">
                      Total Sales Package
                    </p>
                    <div className="font-bold font-sans text-end text-xl lgg:text-2xl">
                      <span>${allSellPackageAmount?.data[0]?.totalAmount}</span>
                    </div>
                  </div>
                </div>
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
              </section>
              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-lg bg-white max-w-full md:min-h-[40vh] lgg:min-h-[60vh] px-4 py-5 shadow">
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
                      <div className="divide-y divide-gray-200 space-y-4">
                        {allAcceptedCourse?.data?.length ? (
                          allAcceptedCourse?.data?.map(
                            ({
                              user,

                              _id,
                              createdAt,
                              course,
                            }: any) => (
                              <div
                                key={_id}
                                className="flex justify-between gap-3 hover:bg-slate-50 pt-4"
                              >
                                <div className="font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200 ">
                                  <p className="line-clamp-1">{user?.email}</p>
                                  <p>{new Date(createdAt).toLocaleString()}</p>
                                </div>
                                <div className="py-4 text-sm text-gray-500 capitalize">
                                  <p>{course?.title}</p>
                                  <p className="line-clamp-1">
                                    {course?.price}
                                  </p>{" "}
                                  <br />
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="py-20 w-full text-center text-red-400">
                            Empty !
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-white max-w-full md:min-h-[40vh] lgg:min-h-[60vh] px-4 py-5 shadow">
                  <div className="py-2 align-middle px-2">
                    <h3 className="text-base font-medium underline underline-offset-2">
                      Recent sales Package
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
                      <div className="divide-y divide-gray-200 space-y-4">
                        {allSellPackage?.data?.length ? (
                          allSellPackage?.data?.map(
                            ({
                              user,
                              _id,
                              createdAt,
                              title,
                              total_price,
                            }: any) => (
                              <div
                                key={_id}
                                className="flex justify-between gap-3 hover:bg-slate-50 pt-4"
                              >
                                <div className="font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200 ">
                                  <p className="line-clamp-1">{user?.email}</p>
                                  <p>{new Date(createdAt).toLocaleString()}</p>
                                </div>
                                <div className="py-4 text-sm text-gray-500 capitalize">
                                  <p>{title}</p>
                                  <p className="line-clamp-1">
                                    {total_price}
                                  </p>{" "}
                                  <br />
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="py-20 w-full text-center text-red-400">
                            Empty !
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" rounded-lg bg-white max-w-full md:min-h-[40vh] lgg:min-h-[60vh] px-4 py-5 shadow">
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
                      <div className="divide-y divide-gray-200 space-y-5">
                        {allCourseData?.data?.length ? (
                          allCourseData?.data?.map(
                            ({ title, createdAt, _id, price }, i) => (
                              <div
                                key={_id}
                                className="hover:bg-slate-50 flex justify-between items-center gap-x-3 pt-4 w-full max-w-full"
                              >
                                <div className="font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200">
                                  <p className="line-clamp-1">
                                    {" "}
                                    {title.length > 30
                                      ? title.slice(20, 200000) + "..."
                                      : title}
                                  </p>
                                  <p>{new Date(createdAt).toLocaleString()}</p>
                                </div>
                                <div className="text-sm text-gray-500  capitalize space-y-2 text-right">
                                  <span className="line-clamp-1">
                                    {"publisherName"},
                                  </span>
                                  <span>{price}$</span>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="py-20 w-full text-center text-red-400">
                            Empty !
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <Modal
          closeModal={setOpenModal}
          isOpen={openModal?.link ? true : false}
          ownClass={
            "relative w-fit max-w-5xl transform overflow-hidden bg-white shadow-xl transition-all"
          }
        >
          <VimeoPlayer link={openModal.link} />
        </Modal> */}
          </div>
        }
      </>
    </div>
  );
}
