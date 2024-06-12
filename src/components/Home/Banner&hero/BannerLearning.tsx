/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import InternelError from "@/components/shared/Error/InternelError";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import CategoryButtonSKeletton from "@/components/ui/Loading/CategoryButtonSKeletton";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import CoverSvg from "@/assets/svg/CoverBackground";
import { useRouter, useSearchParams } from "next/navigation";

import { Modal, Button } from "antd";
import ModalCourseBanner from "@/components/Modal/ModalCourseBanner";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addBackgroundColor } from "@/redux/features/bannerCourseSlice";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import LearningPageImage from "../../../assets/svg/LearningPage.svg";
import LearningPageImage2 from "../../../assets/svg/LearningPageImage2.svg";

interface BannerLearningProps {
  learningCategoryId: string | null;
  setLearningCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
}
const BannerLearning: React.FC<BannerLearningProps> = ({
  learningCategoryId,
  setLearningCategoryId,
}) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const query: Record<string, any> = {};
  query["limit"] = 999999;
  query["sortOrder"] = "asc";
  query["sortBy"] = "serial_number";
  query["status"] = "active";

  const { data, isLoading, error } = useGetAllCategoryQuery({ ...query });
  // console.log("🚀 ~ learningCategoryId:", learningCategoryId);

  const categoryData = data?.data || [];

  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data");
  // Check if encodedData is not null and not an empty string before decoding
  const decodedData =
    encodedData && encodedData.trim() !== ""
      ? decodeURIComponent(encodedData)
      : "";
  let queryData;
  try {
    if (decodedData) {
      queryData = JSON.parse(decodedData);
    }
  } catch (error) {
    // Handle the error, log it, or provide a default value for queryData
    console.error("Error parsing JSON:", error);
    queryData = {}; // Provide a default value if parsing fails
  }
  const categoryId = queryData?.categoryId;

  useEffect(() => {
    if (!categoryId) {
      setLearningCategoryId(categoryData[0]?._id);
    } else {
      setLearningCategoryId(categoryId);
    }

    return () => {};
  }, [categoryData, categoryId, setLearningCategoryId]);

  // const [LearningCategoryId, setLearningCategoryId] = useState<string | null>(
  //     categoryId
  // );

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

  const colors = ["#108213", "#FFDA15", "#FB8500", "#5371FF", "#2C92A8"];

  const bgColors = ["#E8EABD", "#F5F5D5", "#d38f41", "#8093e5", "#5ba8b7"];

  const getCategoryColor = (index: number): string => {
    return colors[index % colors.length];
  };
  const getBGColor = (index: number): string => {
    return bgColors[index % bgColors.length];
  };

  // const encodedData = router.query.data
  // const searchParams = useSearchParams()
  // const searchParams = useSearchParams();

  const modalButtonHandler = (id: string, index: number) => {
    // showModal(id);
    setLoading(true);
    setTimeout(() => {
      setLearningCategoryId(id);
      const color = getCategoryColor(index);
      // const bg = getBGColor(index)
      // dispatch(addBackgroundColor({ color, bg }));
      const data = { categoryId: id, color };

      const stringifiedData = JSON.stringify(data);
      const encodedData = encodeURIComponent(stringifiedData);
      setLoading(false);
      const href = `/learning?data=${encodedData}`;
      router.push(href);
    }, 1000);
  };
  if (loading) {
    return <LoadingSkeleton number={40} sectionNumber={30} />;
  }
  return (
    <div className="">
      <div className="object-cover  bg-[#F7EEE5] overflow-hidden -z-10 w-[100%] h-[50vh] lg:h-[70vh] 2xl:h-[45.75rem] -mt-[7rem] grid sm:grid-cols-2 items-center">

        <div className="px-4 sm:mt-4 flex flex-col gap-5">
          <h1 className="lg:text-6xl md:text-4xl text-3xl">
          Build a healthier foundation for lifelong learning
          </h1>
          <p className="text-lg">
          At iBLossomLearn, we prioritize building a healthier foundation for lifelong learning. Through our comprehensive curriculum and dedicated support, we empower students to develop essential skills and habits that foster academic success and personal growth well beyond their schooling years. With iBLossomLearn, students are equipped with the tools and mindset needed to thrive in an ever-changing world.
          </p>
        </div>
        <div className="sm:flex hidden justify-end">
          <Image src={LearningPageImage2} alt=""/>
        </div>

      </div>

      <div className="flex   uppercase justify-start items-center gap-2  font-[800] mt-2 md:mt-[1rem] pl-4 overflow-x-auto  whitespace-nowrap scrollbar-thumb-rounded-full scrollbar-track-rounded-full  container mx-auto">
        {isLoading ? (
          <CategoryButtonSKeletton />
        ) : (
          categoryData?.map((category: any, index: number) => {
            return (
              <div
                key={index + 1}
                onClick={() => modalButtonHandler(category?._id, index)}
                className={`p-3`}
              >
                <button
                  style={{}} // Apply the background color
                  className={`py-2 px-3 text-[12px]  scale-105 lg:text-[18px] brightness-95  rounded-md ${
                    categoryId === category?._id &&
                    " border-white text-[#5371FB] bg-[#d2e1fe]  scale-105 duration-300  p-2 brightness-105"
                  }`}
                >
                  {category?.title}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BannerLearning;
