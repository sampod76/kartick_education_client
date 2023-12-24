import { Col, Row, Tabs } from "antd";
import React from "react";
import SIngleCourse from "./SIngleCourse";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";

const Courses = ({ query }: { query: any }) => {

  const {data} = useGetAllCourseQuery({...query})
  // console.log("🚀 ~ file: Courses.tsx:5 ~ Courses ~ data:", data?.data)

  return (
    <div className="mt-[5rem] container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data?.data?.map((item: any, index: number) => {
          return <SIngleCourse course={item} key={index + 1} />;
        })}
      </div>
    </div>
  );
};

export default Courses;
