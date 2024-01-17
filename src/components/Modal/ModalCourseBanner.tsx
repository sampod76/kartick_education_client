"use clint";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ICourseData } from "@/types/courseType";
import { Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";
import SIngleCourse from "../Home/coureses/SIngleCourse";
import SIngleBannerSIngleCourse from "../Home/coureses/SIngleBannerSIngleCourse";

const { Option } = Select;
export default function ModalCourseBanner({
  categoryId,
  setIsModalOpen,
}: {
  categoryId: string | null;
  setIsModalOpen: any;
}) {
  //   console.log(categoryId);
  const router = useRouter();
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";

  const { data: Course, isLoading } = useGetAllCourseQuery({
    ...query,
    category: categoryId,
  });
  const CourseData = Course?.data;
  // console.log(CourseData)
  //   const CourseOptions = CourseData?.map((item: any) => {
  //     return {
  //       label: item?.title,
  //       value: item?._id,
  //     };
  //   });
  //   console.log(CourseOptions);

  const handleChange = (courseId: string) => {
    // console.log(courseId, "courseIdcourseId");
    router.push(`/course/milestone/${courseId}?category=${categoryId}`);
    setIsModalOpen(false);
  };
  return (
    <div>
      {/* <Select
        placeholder="Select course "
        style={{ width: "100%" }}
        loading={isLoading}
        defaultActiveFirstOption
        listHeight={150}
        onChange={handleChange}
      >
        {CourseData?.map((course: ICourseData) => {
          return (
            <Option value={course?._id} key={course?._id}>
              {course?.title}
            </Option>
          );
        })}
      </Select> */}

      {/* <Course */}
      <div className="grid grid-cols-1 gap-2">
        {CourseData?.map((item: ICourseData, index: number) => {
          return <SIngleBannerSIngleCourse course={item} key={index + 1} />;
        })}
      </div>
    </div>
  );
}
