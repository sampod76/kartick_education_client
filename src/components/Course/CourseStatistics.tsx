"use client";
import React from "react";
import skillIcon from "@/assets/Icon/dimond.png";
import lessonIcon from "@/assets/Icon/lesson.png";
import videoIcon from "@/assets/Icon/video.png";
import Image from "next/image";
import { useGetSingleCourseModuleLessonQuizVideoSizeQuery } from "@/redux/api/adminApi/courseApi";

const CourseStatistics = ({ courseId }: { courseId: any }) => {
  const { data, isLoading } =
    useGetSingleCourseModuleLessonQuizVideoSizeQuery(courseId);
  const allData: any = data;


  let overViews: any[] = [
    {
      name: "Modules",
      icon: skillIcon,
      No: isLoading ? (
        <h1 className="w-4 h-4 mx-auto bg-gray-200 rounded-lg animate-pulse"></h1>
      ) : allData?.modulesSize,
    },
    {
      name: "Lesson",
      icon: lessonIcon,
      No: isLoading ? (
        <h1 className="w-4 h-4 mx-auto bg-gray-200 rounded-lg animate-pulse"></h1>
      ) : allData?.lessonsSize,
    },
    {
      name: "Video",
      icon: videoIcon,
      No: isLoading ? (
        <h1 className="w-4 h-4 mx-auto bg-gray-200 rounded-lg animate-pulse"></h1>
      ) : allData?.totalVideoSize,
    },
    {
      name: "Quiz",
      icon: lessonIcon,
      No: isLoading ? (
        <h1 className="w-4 h-4 mx-auto bg-gray-200 rounded-lg animate-pulse"></h1>
      ) : allData?.quizzesSize,
    },
  ];

  return (
    <div className="bg-white grid grid-cols-2 lg:grid-cols-4 w-full lg:w-[60%] mx-auto gap-5 p-4">
      {overViews?.map((item: any, index: number) => (
        <div
          className="flex flex-col justify-between items-center gap-2 p-5 rounded-md shadow w-[7rem] md:w-[9rem] mx-auto"
          key={index}
        >
          {typeof item.No === 'number' ? (
            <>
              <Image
                src={item?.icon}
                height={50}
                width={50}
                className="h-[2rem] w-[2rem]"
                alt="overviews"
              />
              <h1 className="font-[500] text-base md:text-lg whitespace-nowrap">
                {item?.No} {item?.name}
              </h1>
            </>
          ) : (
            item.No // Render placeholder during loading
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseStatistics;