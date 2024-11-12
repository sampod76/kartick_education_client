'use client';
import React from 'react';
import skillIcon from '@/assets/Icon/dimond.png';
import lessonIcon from '@/assets/Icon/lesson.png';
import videoIcon from '@/assets/Icon/video.png';
import Image from 'next/image';
import { useGetSingleCourseModuleLessonQuizVideoSizeQuery } from '@/redux/api/adminApi/courseApi';

const CourseStatistics = ({ courseId }: { courseId: string }) => {
  const { data, isLoading } =
    useGetSingleCourseModuleLessonQuizVideoSizeQuery(courseId);

  const allData: any = data;
  // console.log('🚀 ~ CourseStatistics ~ allData:', allData);

  let overViews: any[] = [
    {
      name: 'Modules',
      icon: skillIcon,
      No: isLoading ? (
        <h1 className="mx-auto h-4 w-4 animate-pulse rounded-lg bg-gray-200"></h1>
      ) : (
        allData?.modulesSize
      ),
    },
    {
      name: 'Lesson',
      icon: lessonIcon,
      No: isLoading ? (
        <h1 className="mx-auto h-4 w-4 animate-pulse rounded-lg bg-gray-200"></h1>
      ) : (
        allData?.lessonsSize
      ),
    },

    {
      name: 'Quiz',
      icon: lessonIcon,
      No: isLoading ? (
        <h1 className="mx-auto h-4 w-4 animate-pulse rounded-lg bg-gray-200"></h1>
      ) : (
        allData?.quizzesSize
      ),
    },
  ];

  return (
    <div className="mx-auto my-3 grid w-full grid-cols-2 gap-5 p-4 lg:w-[60%] lg:grid-cols-3">
      {overViews?.map((item: any, index: number) => (
        <div
          className="mx-auto w-[9rem] text-center uppercase shadow"
          key={index}
        >
          {typeof item.No === 'number' ? (
            <div className="font-bold">
              {/* <Image
                src={item?.icon}
                height={50}
                width={50}
                className="h-[2rem] w-[2rem]"
                alt="overviews"
              /> */}
              <h1 className="w-full whitespace-nowrap rounded-t-[8px] bg-[#24560a] px-2 py-2 text-center text-xl font-bold text-white">
                {item?.name}
              </h1>
              <p className="border-[3px] border-[#1C3052] bg-white p-6 text-5xl font-[900] text-[#1C3052]">
                {item?.No}
              </p>
            </div>
          ) : (
            item.No // Render placeholder during loading
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseStatistics;
