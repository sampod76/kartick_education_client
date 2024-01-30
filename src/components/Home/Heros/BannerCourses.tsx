"use client";
import React, { useState } from "react";
import Link from "next/link";
import InternelError from "@/components/shared/Error/InternelError";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import CategoryButtonSKeletton from "@/components/ui/Loading/CategoryButtonSKeletton";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import CoverSvg from "@/assets/svg/CoverBackground";
import { useSearchParams } from "next/navigation";

import { Modal, Button } from "antd";
import ModalCourseBanner from "@/components/Modal/ModalCourseBanner";

const BannerCourses = () => {
  const query: Record<string, any> = {};
  query["limit"] = 999999;
  query["sortOrder"] = "asc";
  query["status"] = "active";

  const { data, isLoading, error } = useGetAllCategoryQuery({ ...query });

  const categoryData = data?.data || [];

  const searchParams = useSearchParams();

  const categoryId = searchParams.get("category");

  // console.log(
  //   "🚀 ~ file: BannerCourses.tsx:22 ~ BannerCourses ~ searchParams:",
  //   categoryId
  // );

  // ! for categoryMoadal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCategoryId, setIsModalCategoryId] = useState<string | null>(
    categoryId
  );

  const showModal = (categoryId: string) => {
    setIsModalOpen(true);
    setIsModalCategoryId(categoryId);
  };


  // console.log("🚀 ~ BannerCourses ~ categoryData:", categoryData);

  // const firstId=categoryData.length ? categoryData[0]._id : ""
  //   const {data:courseData,isLoading:courseDataLoading} = useGetSingleCourseQuery(firstId,{skip:!Boolean(firstId)})
  // console.log(courseData)

  if (error) {
    return (
      <InternelError
        message={
          //@ts-ignore
          error?.data ||
          //@ts-ignore
          data?.data?.message
        }
      />
    );
  }
  return (
    <div className="-mt-[5px] ">
      <div
        // className="wrapper"
        style={{
          // backgroundImage: `url('/banner/bannerBG.png')`,
          backgroundImage: `url('/banner/courses_banner.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // minHeight: "50vh",
          // position: "relative",

          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          margin: "0",
          position: "relative",
          // backgroundColor:"white",
          marginTop: "0px",
        }}
        className="h-36 md:h-[40rem]"
      >
        {/* border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] */}
        <div className="flex   uppercase justify-between items-center gap-2  font-[550] mb-9 md:mb-[8rem] pl-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
          {isLoading ? (
            <CategoryButtonSKeletton />
          ) : (
            categoryData?.map((category: any, index: number) => {
              return (
                <div key={index + 1} onClick={() => showModal(category?._id)} className={`p-3`}>
                  <button
                    className={`py-2 lg:py-3 px-2  lg:px-3 text-[12px] lg:text-[18px] rounded-tl-[20px] rounded-br-[20px] ${index % 2 === 0 ? "bg-green-500" : "bg-primary"
                      } ${index % 3 === 1 && "bg-secondary"} text-white ${categoryId === category?._id &&
                      "border-[4px] border-white bg-gradient-to-r  via-[#059669] shadow-xl shadow-green-600 scale-105 duration-300 from-[#047857] to-[#14b8a6]"
                      }`}
                  >
                    {category?.title}
                  </button>
                </div>
              );
            })
          )}
        </div>
        <ModalCourseBanner
          categoryId={isModalCategoryId}
          showModal={showModal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}

        />
      </div>
      {/* <div className="">
            <CoverSvg />
          </div> */}
      {/* <img
        src="/banner/wave.png"
        className="h-[5rem] w-full absolute bottom-[-15] "
        // height={100}
        // width={100}
        alt="wave"
      /> */}
    </div >
  );
};

export default BannerCourses;
