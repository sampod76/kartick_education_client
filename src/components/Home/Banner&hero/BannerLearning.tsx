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
  console.log("🚀 ~ learningCategoryId:", learningCategoryId);

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
    <div className="-mt-[5px] ">
      <Image
        unoptimized
        alt=""
        src={"/banner/v2CourseBanner.png"}
        className="object-cover -z-10 w-[100vw] h-[50vh] lg:h-[70vh] 2xl:h-[45.75rem] -mt-[6rem]"
        width={1900}
        height={1900}
      />

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
                  style={{
                    backgroundColor: colors[index % colors.length],
                    color: "white",
                  }} // Apply the background color
                  className={`py-2 px-3 text-[12px] shadow-lg scale-105 lg:text-[18px] brightness-95 rounded-tl-[20px rounded-br-[20px rounded-[28rem] ${
                    index % 3 === 0 && "bg-[#FB8500]"
                  } ${
                    categoryId === category?._id &&
                    "border-[3px] md:border-[5px] border-white shadow-2xl  scale-105 duration-300  p-2 text-white brightness-105"
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
