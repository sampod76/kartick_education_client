"use client";
import React, { useState } from "react";
import Link from "next/link";
import InternelError from "@/components/shared/Error/InternelError";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import CategoryButtonSKeletton from "@/components/ui/Loading/CategoryButtonSKeletton";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import CoverSvg from "@/assets/svg/CoverBackground";
import { useSearchParams } from "next/navigation";

import { Modal, Button } from "antd";
import ModalCourseBanner from "@/components/Modal/ModalCourseBanner";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addBackgroundColor } from "@/redux/features/bannerCourseSlice";


interface BannerLearningProps {
    learningCategoryId: string | null;
    setLearningCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
}
const BannerLearning: React.FC<BannerLearningProps> = ({ learningCategoryId, setLearningCategoryId }) => {

    const dispatch = useAppDispatch();
    const query: Record<string, any> = {};
    query["limit"] = 999999;
    query["sortOrder"] = "asc";
    query["status"] = "active";

    const { data, isLoading, error } = useGetAllCategoryQuery({ ...query });

    const categoryData = data?.data || [];

    const searchParams = useSearchParams();

    const categoryId = searchParams.get("category");



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



    const colors = [
        "#108213",
        "#FFDA15",
        "#FB8500",
        "#5371FF",
        "#2C92A8",
    ];


    const bgColors = [
        '#E8EABD',
        '#F5F5D5',
        '#d38f41',
        '#8093e5',
        '#5ba8b7'
    ]

    const getCategoryColor = (index: number): string => {
        return colors[index % colors.length];
    };
    const getBGColor = (index: number): string => {
        return bgColors[index % bgColors.length];
    };

    const modalButtonHandler = (id: string, index: number) => {
        // showModal(id);
        setLearningCategoryId(id);
        const color = getCategoryColor(index);
        const bg = getBGColor(index)
        dispatch(addBackgroundColor({ color, bg }));
    };
    return (
        <div className="-mt-[5px] ">

            <Image alt="" src={"/banner/v2CourseBanner.png"} className="object-cover -z-10 w-[100vw] h-[50vh] lg:h-[70vh] 2xl:h-[45.75rem] -mt-[6rem]" width={1900} height={1900} />

            <div className="flex   uppercase justify-between items-center gap-2  font-[800] mt-7 md:mt-[1rem] pl-4 overflow-x-auto scrollbar-hide whitespace-nowrap container mx-auto">
                {isLoading ? (
                    <CategoryButtonSKeletton />
                ) : (
                    categoryData?.map((category: any, index: number) => {
                        return (
                            <div key={index + 1} onClick={() => modalButtonHandler(category?._id, index)} className={`p-3`}>
                                <button
                                    style={{ backgroundColor: colors[index % colors.length], color: "white" }} // Apply the background color
                                    className={`py-2 px-3 text-[12px] shadow-lg scale-105 lg:text-[18px] rounded-tl-[20px rounded-br-[20px rounded-[28rem] ${index % 3 === 0 && "bg-[#FB8500]"} ${categoryId === category?._id &&
                                        "border-[4px] border-white bg-gradient-to-r  via-[#059669] scale-105 duration-300 from-[#047857] to-[#14b8a6] p-2 text-white"
                                        }`}
                                >
                                    {category?.title}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

        </div >
    );
};

export default BannerLearning;