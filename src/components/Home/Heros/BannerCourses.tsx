"use client";
import React from "react";
import Link from "next/link";
import InternelError from "@/components/shared/Error/InternelError";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import CategoryButtonSKeletton from "@/components/ui/Loading/CategoryButtonSKeletton";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import CoverSvg from "@/assets/svg/CoverBackground";

const BannerCourses = () => {
  const query: Record<string, any> = {};
  query["limit"] = 999999;
  query["sortOrder"] = "asc";
  query["status"] = "active";

  const { data, isLoading, error } = useGetAllCategoryQuery({ ...query });

  const categoryData = data?.data || [];

  console.log("🚀 ~ BannerCourses ~ categoryData:", categoryData);

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
        <div className="flex   uppercase justify-between items-center gap-5  font-[550] mb-9 md:mb-[8rem] pl-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
          {isLoading ? (
            <CategoryButtonSKeletton />
          ) : (
            categoryData?.map((category: any, index: number) => {
              return (
                <Link
                  className={`py-3 px-7 rounded-tl-[20px] rounded-br-[20px] ${
                    index % 2 === 0 ? "bg-green-500" : "bg-primary"
                  } ${index % 3 === 1 && "bg-secondary"} text-white`}
                  href="/learning"
                  key={index + 1}
                >
                  {category?.title}
                </Link>
              );
            })
          )}

        
        </div>
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
    </div>
  );
};

export default BannerCourses;
