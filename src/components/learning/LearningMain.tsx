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
import { ICourseData } from '@/types/courseType';
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

    if (labelId) {
        query['label_id'] = labelId
    }


    const { data: courseAllData, isLoading, error } = useGetAllCourseQuery({ ...query });

    const courseFirstData = courseAllData?.data[0] as any


    console.log(courseAllData, 'courseAllData', labelId)

    const categoryId = learningCategoryId || courseFirstData?.category?._id
    const { data: courseLevelData, isLoading: courseLevelLoading, error: categoryLevelError } = useGetAllCourse_labelQuery({ ...query, category: categoryId })
   

    if (error || categoryLevelError) {
        console.log(error, categoryLevelError);
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
            <CourseStatistics courseId={courseFirstData?._id} />

            {isLoading ? (
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
                        {courseFirstData?.title}
                    </h2>
                    <p className="text-center my-3 text-lg lg:text-xl">
                        <EllipsisMiddle suffixCount={3} maxLength={120}>
                            {courseFirstData?.short_description}
                        </EllipsisMiddle>
                    </p>
                    <div className="absolute -top-8 lg:top-0 right-0 animate-pulse">
                        <PaypalCheckoutByCourse courseData={courseFirstData} />
                    </div>
                    <div className="block lg:flex justify-between items-start mt-3 lg:mt-5 md:mt-3 xl:mt-7">
                        {/*//! label section */}
                        <div className="w-full lg:w-[20%]">
                            
                            <h2 className="uppercase text-2xl text-[#1C3052] text-center font-bold">Label</h2>
                            <div className="flex flex-col justify-self-start gap-3 mt-3 w-full lg:w-[70%] md:w-[70%] xl:w-[76%] ">
                                {
                                     courseLevelData?.data?.map((label: ICourseLevelData) => (
                                        <button onClick={() => setLabelId(label?._id)} key={label?._id} className=' py-2 rounded-r-lg px-3 text-xl font-bold text-[#1C3052]' style={{
                                            background: '#C3C399'
                                        }}>
                                            {label?.title}
                                        </button>
                                    ))
                                }
                    
                
                            </div>
                        </div>
                        <div className="w-full lg:w-[70%] md:w-[70%] xl:w-[75%] mt-3 lg:mt-0 md:mt-2 xl:mt-0 container mx-auto">
                            <h1 className='py-1 text-center text-white h-[2.8rem] text-xl font-bold text-nowrap' style={{ backgroundColor: '#8CA46D' }}> {courseFirstData?.title ? courseFirstData?.title : "Course Title"}</h1>
                            <div className="" >
                                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3 px-3 py-3" style={{
                                    backgroundColor: '#CCEDBC'
                                }}>
                                    {
                                        courseAllData?.data?.map((course: ICourseData, index: number) => (
                                            <div className="" key={course?._id}>
                                                {/* <h5 className='text-lg font-[600] my-2'>{course?.title}</h5> */}
                                                <p className="text-gray-900 text-start flex justify-start gap-1 "
                                                > <p className=" text-lg"> {index + 1} {course?.title}</p>
                                                    <LockOutlined />
                                                </p>
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
