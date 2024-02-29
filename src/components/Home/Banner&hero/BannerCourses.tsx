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
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addBackgroundColor } from "@/redux/features/bannerCourseSlice";

const BannerCourses = () => {
  const dispatch = useAppDispatch();
  const query: Record<string, any> = {};
  query["limit"] = 999999;
  query["sortOrder"] = "asc";
  query["sortBy"] = "serial_number";
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



  const colors = [
    "#108213",
    "#FFDA15",
    "#FB8500",
    "#5371FF",
    "#2C92A8",
  ];


  const bgColors = [
    '#E8EABD',
    '#F5F5D5',
    '#d38f41',
    '#8093e5',
    '#5ba8b7'
  ]

  const getCategoryColor = (index: number): string => {
    return colors[index % colors.length];
  };
  const getBGColor = (index: number): string => {
    return bgColors[index % bgColors.length];
  };

  const modalButtonHandler = (id: string, index: number) => {
    showModal(id);
    const color = getCategoryColor(index);
    const bg = getBGColor(index)
    // dispatch(addBackgroundColor({ color, bg }));
  };
  return (
    <div className="-mt-[5px] ">

      <Image alt=""  src={"/banner/v2CourseBanner.png"} className="object-cover -z-10 w-[100vw] h-[50vh] lg:h-[70vh] 2xl:h-[45.75rem] -mt-[6rem]" width={1900} height={1900} />
      <div
      // className="wrapper"
      // style={{
      //   // backgroundImage: `url('/banner/bannerBG.png')`,
      //   backgroundImage: `url('/banner/v2CourseBanner.png')`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   // minHeight: "50vh",
      //   // position: "relative",

      //   display: "flex",
      //   alignItems: "flex-end",
      //   justifyContent: "flex-start",
      //   margin: "0",
      //   position: "relative",
      //   // backgroundColor:"white",
      //   marginTop: "0px",
      // }}
      // className="h-[] md:h-[40rem]"
      >
        {/* border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] */}

      </div>
      {/* <div className="flex   uppercase justify-between items-center gap-2  font-[800] mt-7 md:mt-[1rem] pl-4 overflow-x-auto scrollbar-hide whitespace-nowrap container mx-auto">
        {isLoading ? (
          <CategoryButtonSKeletton />
        ) : (
          categoryData?.map((category: any, index: number) => {
            return (
              <div key={index + 1} onClick={() => modalButtonHandler(category?._id, index)} className={`p-3`}>
                <button
                  style={{ backgroundColor: colors[index % colors.length], color: "white" }} // Apply the background color
                  className={`py-2 px-3 text-[12px] shadow-lg scale-105 lg:text-[18px] rounded-tl-[20px rounded-br-[20px rounded-[28rem] ${index % 3 === 0 && "bg-[#FB8500]"} ${categoryId === category?._id &&
                    "border-[4px] border-white bg-gradient-to-r  via-[#059669] scale-105 duration-300 from-[#047857] to-[#14b8a6] p-2 text-white"
                    }`}
                >
                  {category?.title}
                </button>
              </div>
            );
          })
        )}
      </div> */}
      <div className="flex uppercase justify-between items-center gap-2 font-[800] mt-7 md:mt-[1rem] pl-4 overflow-x-auto scroll-smooth  whitespace-nowrap container mx-auto">
        {isLoading ? (
          <CategoryButtonSKeletton />
        ) : (
          categoryData?.map((category: any, index: number) => {
            return (
              <div key={index + 1} onClick={() => modalButtonHandler(category?._id, index)} className={`p-3`}>
                <button
                  style={{ backgroundColor: colors[index % colors.length], color: "white" }}
                  className={`py-2 px-3 text-[12px] shadow-lg scale-105 lg:text-[18px] brightness-95 rounded-tl-[20px rounded-br-[20px rounded-[28rem] ${index % 3 === 0 && "bg-[#FB8500]"} ${categoryId === category?._id &&
                    "border-[4px] border-white  scale-105 duration-300  p-2 text-white brightness-105"
                    } sm:overflow-x-hidden`}
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
