"use client";
import { useGetAllCourseQuery, useGetSingleCourseQuery } from '@/redux/api/adminApi/courseApi';
import React, { useState } from 'react'
import BannerCourses from '../Home/Banner&hero/BannerCourses';
import CourseStatistics from '../Course/CourseStatistics';
import { ENUM_YN } from '@/constants/globalEnums';
import { useGetAllMilestoneQuery } from '@/redux/api/adminApi/milestoneApi';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';
import { EllipsisMiddle } from '@/utils/CutTextElliples';
import PaypalCheckoutByCourse from '../Utlis/PaypalCheckoutByCourse';
import { Divider } from 'antd';
import SingleMilestone from '../milestone/SingleMilestone';
import { IMilestoneData } from '@/types/miestoneType';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import BannerLearning from '../Home/Banner&hero/BannerLearning';
import { LockOutlined } from "@ant-design/icons"
import { useGetAllCourse_labelQuery } from '@/redux/api/adminApi/courseLevelApi';
import { ICourseLevelData } from '@/types/courseLevelDataType';
export default function LearningMain() {

    ////!learging select category id

    const [learningCategoryId, setLearningCategoryId] = useState<string | null>(null);
    const [labelId, setLabelId] = useState<string | null>(null);


    const { generateColor } = useAppSelector((state) => state.bannerSearch);
    // bg - [${ generateBgColor }]

    const bg = generateColor?.bg


    const query: Record<string, any> = {};
    query["limit"] = 999999;
    query["sortOrder"] = "asc";
    query["status"] = "active";
    query["isDelete"] = ENUM_YN.NO;




    const { data: courseAllData, isLoading, error } = useGetAllCourseQuery({ ...query });

    const courseData = courseAllData?.data[0] as any


    // console.log(courseData, 'courseData')

    const categoryId = learningCategoryId || courseData?.category?._id
    const { data: courseLevelData, isLoading: courseLevelLoading, error: categoryLevelError } = useGetAllCourse_labelQuery({ ...query, category: categoryId })
    // const courseId = courseData?._id || ''

    // console.log(courseLevelData, 'courseLevelData', categoryId)

    // const {
    //     data: courseData = {},
    //     isLoading: courseLoading,
    //     error,
    // } = useGetSingleCourseQuery(courseId);
    // console.log("🚀 ~ MilestoneList ~ courseData:", courseData)


    const { data, isLoading: milestoneLoading,
        error: milestonError } = useGetAllMilestoneQuery({
            course: courseData?._id,
            module: "yes",
            ...query,
        })
    // console.log("🚀 ~ MilestoneList ~ data:", data)
    // console.log(data,"courseId");
    const milestoneData = data?.data || [];

    console.log(milestoneData)

    if (error || milestonError || categoryLevelError) {
        console.log(error, milestonError, categoryLevelError);
    }

    // console.log(learningCategoryId, 'learningCategoryId')
    return (
        <div style={{
            // backgroundColor: bg
        }}>
            <div className="-mt-[5.8rem] mb-4 lg:mb-6 ">
                <div className="w-full min-h-[7rem] bg-[#BEDDF9]"></div>
                <BannerLearning learningCategoryId={learningCategoryId} setLearningCategoryId={setLearningCategoryId} />
            </div>
            <CourseStatistics courseId={courseData?._id} />

            {isLoading || milestoneLoading || courseLevelLoading ? (
                <LoadingSkeleton number={20} />
            ) : (
                <div
                    style={{
                        marginTop: "1.5rem",
                        border: "2px solid #31FF6B"
                    }}
                    className="relative min-h-screen container mx-auto py-2 md:py-3 lg:py-5 xl:py-6 "
                >
                    <h2
                        style={{
                            fontWeight: 400,
                            textAlign: "center",
                            color: "black",
                            textTransform: "uppercase",
                            fontSize: "35px",
                            fontFamily: "Latao",

                        }}
                    >
                        {courseData?.title}
                    </h2>
                    <p className="text-center my-3 text-lg lg:text-xl">
                        <EllipsisMiddle suffixCount={3} maxLength={120}>
                            {courseData?.short_description}
                        </EllipsisMiddle>
                    </p>
                    <div className="absolute -top-8 lg:top-0 right-0 animate-pulse">
                        <PaypalCheckoutByCourse courseData={courseData} />
                    </div>
                    <div className="block lg:flex justify-between items-start">
                        {/*//! label section */}
                        <div className="w-full lg:w-[20%]">
                            <h2 className="uppercase text-2xl text-[#1C3052] text-center font-bold">Label</h2>
                            <div className="flex flex-col justify-self-start gap-3 mt-3 w-[70%]">
                                {
                                    courseLevelData?.data?.map((label: ICourseLevelData) => (
                                        <button onClick={() => setLabelId(label?._id)} key={label?._id} className='bg-[#C3C399] py-2 rounded-r-lg px-3 text-xl font-bold'>
                                            {label?.title}
                                        </button>
                                    ))
                                }

                            </div>
                        </div>

                        <div className="w-full lg:w-[80%]">
                            <h1 className='py-1 text-center text-white h-[2.5rem] text-xl font-bold text-nowrap' style={{ backgroundColor: '#8CA46D' }}>Course Title</h1>
                            <div className="" >


                                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3 px-3" style={{
                                    backgroundColor: '#CCEDBC'
                                }}>
                                    {
                                        milestoneData?.map((milestone) => (
                                            <div className="" key={milestone?._id}>
                                                <h5 className='text-lg font-[600] my-2'>{milestone?.title}</h5>
                                                {milestone?.modules?.map((module: any, index: number) => {
                                                    return (
                                                        <Link
                                                            href={`/lesson/module/${module?._id}?module=${module?.title}`}
                                                            key={module?._id || index}
                                                            className="text-gray-900 text-start flex justify-start gap-1 "
                                                        >

                                                            <p className=" text-lg"> {index + 1} {module?.title}</p>
                                                            <LockOutlined />
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
