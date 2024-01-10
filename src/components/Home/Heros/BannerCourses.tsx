"use client";
import React from "react";
import Link from "next/link";
import InternelError from "@/components/shared/Error/InternelError";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import CategoryButtonSKeletton from "@/components/ui/Loading/CategoryButtonSKeletton";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";

const BannerCourses = () => {


  const query: Record<string, any> = {};
  query["limit"] = 999999
  query["sortOrder"] = "asc";
  query["status"] = "active";

  const { data, isLoading, error } = useGetAllCategoryQuery({ ...query });
  
  const categoryData = data?.data || [];

  console.log("🚀 ~ BannerCourses ~ categoryData:", categoryData)



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
    <div className="-mt-[5px] relative">
    <div
      style={{
        backgroundImage: `url('/banner/courses_banner.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "28rem",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        margin: "0",
        marginTop: "0px"
      }}
    >
      <div className="flex uppercase justify-between items-center gap-5 font-[550] mb-[3rem] pl-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
        {isLoading ? (
          <CategoryButtonSKeletton/>
        ) : (
          categoryData?.map((category, index) => (
            <Link
              href="/learning"
              key={index + 1}
              className={`py-3 px-7 rounded-tl-[20px] rounded-br-[20px] ${index % 2 === 0 ? 'bg-green-500' : 'bg-primary'} ${index % 3 === 1 && 'bg-secondary'} text-white`}
            >
              {category?.title}
            
            </Link>
          ))
        )}
      </div>
    </div>
    {/* <div className="mt-[5rem]">
      <svg className="mt- absolute inset-x-0 -bottom-0 text-white" viewBox="0 0 1160 163">
        <path
          fill="currentColor"
          d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
        ></path>
      </svg>
    </div> */}
  </div>
  );
};

export default BannerCourses;
