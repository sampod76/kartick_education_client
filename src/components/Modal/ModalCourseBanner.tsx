"use clint";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ICourseData } from "@/types/courseType";
import { Button, Modal, Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import SIngleCourse from "../Home/coureses/SIngleCourse";
import SIngleBannerSIngleCourse from "../Home/coureses/SIngleBannerSIngleCourse";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
const { Option } = Select;
export default function ModalCourseBanner({
  categoryId,
  showModal, isModalOpen, setIsModalOpen
}: {
  categoryId: string | null;
  showModal: any
  isModalOpen: any
  setIsModalOpen: any

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

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  {
    isLoading &&
      <LoadingSkeleton />
  }
  return (


    <Modal
      title="Select Course"
      open={isModalOpen}
      style={{ top: 20 }}
      // onOk={handleOk}
      onCancel={handleCancel}

      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          {/* <Button>Custom Button</Button>
            <CancelBtn />
            <OkBtn /> */}
          <Button onClick={handleOk}>Ok </Button>
        </>
      )}
    >
      {/* <Course */}
      <div className="grid grid-cols-1 gap-2">
        {CourseData?.map((item: ICourseData, index: number) => {
          return <div onClick={handleOk} key={index + 1} >
            <SIngleBannerSIngleCourse course={item} />;
          </div>
        })}
      </div>

    </Modal>





  )
}
