"use client";
import {
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
} from "@/redux/api/adminApi/courseApi";
import React, { useEffect, useState } from "react";
import BannerCourses from "../Home/Banner&hero/BannerCourses";
import CourseStatistics from "../Course/CourseStatistics";
import { ENUM_YN } from "@/constants/globalEnums";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import PaypalCheckoutByCourse from "../Utlis/PaypalCheckoutByCourse";
import { Divider, Popconfirm } from "antd";
import SingleMilestone from "../milestone/SingleMilestone";
import { IMilestoneData } from "@/types/miestoneType";
import Link from "next/link";
import { IoIosArrowDropdown } from "react-icons/io";
import LearningPageImage from "../../assets/svg/LearningPage.svg";

import { useAppSelector } from "@/redux/hooks";
import BannerLearning from "../Home/Banner&hero/BannerLearning";
import { LockOutlined } from "@ant-design/icons";
import { useGetAllCourse_labelQuery } from "@/redux/api/adminApi/courseLevelApi";
import { ICourseLevelData } from "@/types/courseLevelDataType";
import { ICourseData } from "@/types/courseType";
import { Button, Modal, Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { GiToggles } from "react-icons/gi";
import Arrow from "../../assets/svg/Arrow.svg";
import Image from "next/image";
export default function LearningMain() {
  const router = useRouter();
  const [learningCategoryId, setLearningCategoryId] = useState<string | null>(
    null
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleOpen = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data");
  // Check if encodedData is not null and not an empty string before decoding
  const decodedData =
    encodedData && encodedData.trim() !== ""
      ? decodeURIComponent(encodedData)
      : "";
  let queryData;
  try {
    if (decodedData) {
      queryData = JSON.parse(decodedData);
    }
  } catch (error) {
    // Handle the error, log it, or provide a default value for queryData
    console.error("Error parsing JSON:", error);
    queryData = {}; // Provide a default value if parsing fails
  }
  const [selectLabelData, setLabelData] = useState<any>({});
  const query: Record<string, any> = {};
  query["limit"] = 999999;
  query["sortOrder"] = "asc";
  query["status"] = "active";
  query["isDelete"] = ENUM_YN.NO;

  const categoryId = queryData?.categoryId;
  let labelQuery = { ...query };

  labelQuery["limit"] = 999999;
  labelQuery["sortOrder"] = "asc";
  labelQuery["status"] = "active";
  labelQuery["isDelete"] = ENUM_YN.NO;
  labelQuery["category"] =
    categoryId || learningCategoryId || "63621c9cc6e03d494145bea0";
  // console.log("🚀 ~ LearningMain ~ labelQuery:", labelQuery)

  // console.log(labelQuery);

  const {
    data: courseLevelData,
    isLoading: courseLevelLoading,
    error: categoryLevelError,
  } = useGetAllCourse_labelQuery({ ...labelQuery });
  // console.log("🚀 ~ LearningMain ~ courseLevelData:", courseLevelData);

  let courseQuery = { ...query };
  if (selectLabelData?._id) {
    courseQuery["label_id"] = selectLabelData?._id;
  } else {
    courseQuery["label_id"] = "63621c9cc6e03d494145bea0"; //only damping
  }
  // console.log(courseQuery)
  const {
    data: courseAllData,
    isLoading,
    error,
  } = useGetAllCourseQuery({ ...courseQuery }) as any;
  // console.log("🚀 ~ LearningMain ~ courseAllData:", courseAllData);

  if (error || categoryLevelError) {
    console.log(error, categoryLevelError);
  }

  // ! for categoryModal //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (categoryId: string) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLabelData(courseLevelData?.data[0] || "");
  }, [courseLevelData?.data]);

  if (courseLevelLoading || isLoading) {
    return <LoadingSkeleton />;
  }

  // console.log(learningCategoryId, 'learningCategoryId')
  // console.log(courseAllData?.data, "hyfghygf");

  return (
    <div
      className="bg-opacity relative py-6"
      style={
        {
          // backgroundColor: "#EBFFE3",
          // opacity:0.05
        }
      }
    >
      {/* //! for bg opacity color */}
      {/* <div className={`absolute top-0 left-0 w-full h-full bg-[${color}] bg-opacity-20`}></div> */}

      <div className="-mt-[5.8rem] mb-4 lg:mb-6 ">
        <div className="w-full min-h-[7rem] bg-[#BEDDF9]"></div>
        <BannerLearning
          learningCategoryId={learningCategoryId}
          setLearningCategoryId={setLearningCategoryId}
        />
      </div>
      {/* <CourseStatistics courseId={learningCategoryId || courseFirstData?._id} /> */}

      {isLoading ? (
        <LoadingSkeleton number={40} />
      ) : (
        <div
          style={{
            marginTop: "1.8rem",
          }}
          className="relative min-h-screen container rounded-xl p-2 mx-auto mt-12 lg:mt-5 md:mt-6 xl:mt-6 py-2 md:py-3 lg:py-5 xl:py-6 "
        >
          <h2
            style={{
              fontWeight: 400,
              textAlign: "center",
              color: "black",
              textTransform: "uppercase",
              fontSize: "35px",
              fontFamily: "Latao",
            }}
          >
            {selectLabelData?.categoryDetails?.title
              ? courseLevelData?.data[0]?.categoryDetails?.title
              : ""}
          </h2>

          <p className="text-center my-3 text-lg lg:text-xl">
            <EllipsisMiddle suffixCount={3} maxLength={120}>
              {selectLabelData?.categoryDetails?.short_description ||
                courseLevelData?.data[0]?.categoryDetails?.short_description}
            </EllipsisMiddle>
          </p>
          {/*//! label button */}
          <div className="flex lg:hidden md:hidden xl:hidden absolute -top-8 lg:top-0 left-0  ">
            {/* <PaypalCheckoutByCourse courseData={courseFirstData} /> */}

            {/* <button
              onClick={() => showModal(categoryId)}
              className="uppercase inline-flex items-center gap-1 p-1 rounded-md text:lg md:text-2xl text-[#1C3052] text-center font-bold"
            >
              {" "}
              <IoIosArrowDropdown /> Level
            </button> */}
          </div>
          <div className="items-start mt-3 lg:mt-5 md:mt-3 xl:mt-7">
            {/*//! label section */}
            <div className="flex flex-col w-full">
              <div className="flex relative flex-col justify-self-start gap-3 mt-3 w-full mr-2 ">
                <hr />
                {courseLevelData?.data?.map(
                  (label: ICourseLevelData, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between pr-2">
                        <button
                          onClick={() => {
                            toggleOpen(index), setLabelData(label);
                          }}
                          key={label?._id}
                          className={`py-2  px-3 text-xl font-bold text-[#1C3052] relative`}
                          style={
                            {
                              // background: color,
                            }
                          }
                        >
                          <div
                            className={`absolute top-0 left-0 w-full h-full] `}
                          ></div>
                          {label?.title}
                        </button>
                        <Image
                          style={{
                            transform: `${
                              openIndex === index
                                ? "rotate(180deg)"
                                : "rotate(0deg)"
                            }`,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            toggleOpen(index), setLabelData(label);
                          }}
                          src={Arrow}
                          alt=""
                        />
                      </div>

                      {openIndex === index && (
                        <div className="w-full  mt-3 lg:mt-0 md:mt-2 xl:mt-0 ">
                          <div className="">
                            <div className=" grid grid-cols-1 lg:grid-cols-4 gap-3 px-3 py-3 relative">
                              {/*//! for background opacity */}
                              <div
                                className={`absolute top-0 left-0 w-full bg-[#CCEDBC] bg-opacity-30`}
                              ></div>
                              {courseAllData?.data?.length > 0 ? (
                                courseAllData?.data?.map(
                                  (course: ICourseData, index: number) => (
                                    // console.log()

                                    <div
                                      key={course?._id}
                                      className="border-2 text-center p-2 flex flex-col gap-5 rounded-lg"
                                    >
                                      <h1 className="text-[22px]">
                                        {index + 1}. {course?.title}
                                      </h1>
                                      <h1 className="text-[#FB8500]">
                                        ${course?.price}
                                      </h1>
                                      <div className="flex justify-between gap-2 px-2">
                                        <h1
                                          className="bg-[#5371FB] p-2 w-full hover:bg-[#4365fb] cursor-pointer  text-white font-bold rounded-md"
                                          onClick={() => {
                                            router.push(
                                              `/payment/checkout/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`
                                            );
                                          }}
                                        >
                                          Buy Now
                                        </h1>
                                        <h1
                                          className="bg-[#5371FB] w-full p-2 hover:bg-[#4365fb] cursor-pointer  text-white font-semibold rounded-md"
                                          onClick={() => {
                                            router.push(
                                              `/course/milestone/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`
                                            );
                                          }}
                                        >
                                          Visit Now
                                        </h1>
                                      </div>
                                    </div>
                                    //     <Popconfirm
                                    //       title="Do you want to purchase?"
                                    //       // description="Are you sure to delete this task?"
                                    //       //   icon={<QuestionCircleOutlined style={{ color: 'red' }} />
                                    //       // }
                                    //       key={course?._id}
                                    //       onConfirm={() => {
                                    //         router.push(
                                    //           `/course/milestone/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`
                                    //         );
                                    //       }}
                                    //       okText="View Course"
                                    //       onCancel={() => {
                                    //         router.push(
                                    //           `/payment/checkout/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`
                                    //         );
                                    //       }}
                                    //       cancelText="BUY NOW"
                                    //     >
                                    //       <Button
                                    //         style={{
                                    //           border: "0px",
                                    //           boxShadow: "0px",
                                    //           fontSize: "1.125rem",
                                    //           textAlign: "start",
                                    //         }}
                                    //       >
                                    //         {index + 1}. {course?.title}
                                    //       </Button>
                                    //       {/* <Link
                                    //   href={`/course/milestone/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`}
                                    //   className="text-gray-900 text-start flex justify-start gap-1 cursor-pointer"
                                    // >
                                    //   <p className="text-lg">
                                    //     {" "}
                                    //     {index + 1}. {course?.title}
                                    //   </p>

                                    // </Link> */}
                                    //     </Popconfirm>
                                  )
                                )
                              ) : (
                                <div>
                                  <p className="text-gray-900 text-start flex justify-start gap-1">
                                    <p className="text-lg text-center">
                                      {" "}
                                      No data found
                                    </p>
                                    {/* <LockOutlined /> */}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <hr />
                    </div>
                  )
                )}
                <div className="flex justify-center items-center gap-5 mt-3">
                  {/* <button className="bg-white shadow-lg p-2 rounded-lg border-2 border-[#92E3A9] text-[#92E3A9] text-lg font-bold">BUY NOW</button> */}
                  <Link
                    href={"/subscription"}
                    className="bg-white shadow-lg p-2 rounded-lg border-2 border-blue-500 text-blue-500 text-lg font-bold"
                  >
                    Check Out Our MEMBERSHIP
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* //! lebel modal */}

      <Modal
        title="Select Level"
        open={isModalOpen}
        style={{ top: 20 }}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button onClick={handleOk}>Ok </Button>
          </>
        )}
      >
        <div
          onClick={handleCancel}
          className="flex flex-col justify-self-start gap-3 mt-3 w-full "
        >
          {courseLevelData?.data?.map((label: ICourseLevelData) => (
            <button
              onClick={() => setLabelData(label?._id)}
              key={label?._id}
              className=" py-2 rounded-r-lg px-3 text-xl font-bold text-[#1C3052]"
              style={{
                background: "#C3C399",
              }}
            >
              {label?.title}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
