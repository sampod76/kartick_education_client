"use client";
import StudentActivePackageToCourse from "@/components/dashboard/student/StudentActivePackageToCourse";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { useGetAllPackageAndCourseQuery } from "@/redux/api/sellerApi/addPackageAndCourse";
import { getUserInfo } from "@/services/auth.service";
import React from "react";

export default function ActivePackagePage() {
  // const userInfo = getUserInfo() as any;
  // const { data, isLoading } = useGetAllPackageAndCourseQuery(
  //   { user: userInfo.id },
  //   { skip: !Boolean(userInfo.id) }
  // );
  // //@ts-ignore
  // const getPackage= data.data
  // console.log("🚀 ~ ActivePackage ~ getPackage:", getPackage)
  // if (isLoading) {
  //   return <LoadingSkeleton number={20} />;
  // }
  return (
    <div>
      <StudentActivePackageToCourse />
    </div>
  );
}
