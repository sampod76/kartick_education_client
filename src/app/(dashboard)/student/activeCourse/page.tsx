"use client";
import PurchaseCategoryTab from "@/components/Home/coureses/PurchaseCategoryTab";
import SIngleCourse from "@/components/Home/coureses/SIngleCourse";
import { ENUM_YN } from "@/constants/globalEnums";
import { useGetCheckPurchasesCourseQuery } from "@/redux/api/public/purchaseCourseApi";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

export default function ActiveCourse() {
  const userInfo = getUserInfo() as any;
  const { data, isLoading } = useGetCheckPurchasesCourseQuery(
    {
      user: userInfo.id,
      isDelete: ENUM_YN.NO,
      limit: 9999,
    },
    { skip: !Boolean(userInfo), refetchOnMountOrArgChange: true }
  );
  console.log("🚀 ~ ActiveCourse ~ data:", data);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data?.data?.map((singleCourse: any) => (
          <SIngleCourse
            key={singleCourse?.course}
            course={singleCourse?.course}
          />
        ))}
      </div>
    </>
  );
}
