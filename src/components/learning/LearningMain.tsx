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

export default function LearningMain() {

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
        <div>
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
                    <div className="flex justify-between items-center bg-[#8CA46D]">
                        <div className="w-full lg:w-[20%]">
                            <h2 className="uppercase text-2xl font-bold">Label</h2>
                            <div className="flex flex-col gap-5 ">
                                <button>Lebel-1</button>
                                <button>Lebel-2</button>
                                <button>Lebel-3</button>
                            </div>
                        </div>

                        <div className="w-full lg:w-[80%] grid  grid-cols-1 lg:grid-cols-2 gap-3">
                            {milestoneData?.map((milestone: IMilestoneData, index: number) => {
                                return (
                                    <SingleMilestone key={index} milestoneData={milestone} index={index} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
