"use client";
import { useGetAllCourseQuery, useGetSingleCourseQuery } from '@/redux/api/adminApi/courseApi';
import React from 'react'
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

export default function LearningMain() {
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

    // const courseId = courseData?._id || ''


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

    if (error || milestonError) {
        console.log(error, milestonError);
    }
    return (
        <div style={{
            backgroundColor: bg
        }}>
            <div className="-mt-[5.8rem] mb-4 lg:mb-6 ">
                <div className="w-full min-h-[7rem] bg-[#BEDDF9]"></div>
                <BannerCourses />
            </div>
            <CourseStatistics courseId={courseData?._id} />

            {isLoading || milestoneLoading ? (
                <LoadingSkeleton number={20} />
            ) : (
                <div
                    style={{
                        marginTop: "1.5rem",
                    }}
                    className="relative min-h-screen container mx-auto"
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
                    <Divider
                        style={{
                            color: "red",
                            fontSize: "5px",
                            background: "red",
                        }}
                    />

                    <div className="block lg:flex justify-between items-start">
                        <div className="w-full lg:w-[20%]">
                            <h2 className="uppercase text-2xl font-bold">Label</h2>
                            <div className="flex flex-col justify-self-start gap-3 mt-3 w-[70%]">

                                <Link className='bg-[#C3C399] py-2 rounded-r-lg px-3 text-xl font-bold' href={`#`}>Label-1</Link>
                                <Link className='bg-[#C3C399] py-2 rounded-r-lg px-3 text-xl font-bold' href={`#`}>Label-2</Link>
                                <Link className='bg-[#C3C399] py-2 rounded-r-lg px-3 text-xl font-bold' href={`#`}>Label-3</Link>
                            </div>
                        </div>


                        <div className="w-full lg:w-[80%]">
                            <h1 className='py-1 text-center text-white h-[2.5rem] text-xl font-bold text-nowrap' style={{ background: generateColor?.color }}>Course Title</h1>
                            <div className="" >


                                <div className=" grid grid-cols-1 lg:grid-cols-2 px-3">
                                    {
                                        milestoneData?.map((milestone) => (
                                            <div className="" key={milestone?._id}>
                                                <h5 className='text-lg font-[550] my-2'>{milestone?.title}</h5>
                                                {milestone?.modules?.map((module: any, index: number) => {
                                                    return (
                                                        <Link
                                                            href={`/lesson/module/${module?._id}?module=${module?.title}`}
                                                            key={module?._id || index}
                                                            className="text-gray-900 text-start flex justify-start  gap-1"
                                                        >

                                                            <p className=" "> {index + 1} {module?.title}</p>
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
