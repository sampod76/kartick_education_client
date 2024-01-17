"use clint";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { Select } from "antd";
import Link from "next/link";
import React from "react";

const { Option } = Select;
export default function ModalCourseBanner({
  categoryId,
  setIsModalOpen,
}: {
  categoryId: string | null;
  setIsModalOpen: any;
}) {
  console.log(categoryId);
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";

  const { data: Course } = useGetAllCourseQuery({
    ...query,
    category: categoryId,
  });
  const CourseData = Course?.data;
  // console.log(CourseData)
  const CourseOptions = CourseData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  console.log(CourseOptions);
  return (
    <div>
      <Select style={{ width: "100%" }}>
        {CourseData?.map((item: any) => {
          return (
            <Option value={item?._id} key={item?._id}>
              <Link
                href={`/course/milestone/`}
                onClick={() => setIsModalOpen(false)}
              >
                {item?.title}
              </Link>
            </Option>
          );
        })}
      </Select>
    </div>
  );
}
