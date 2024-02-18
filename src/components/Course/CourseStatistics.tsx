"use client";
import React from "react";
import skillIcon from "@/assets/Icon/dimond.png";
import lessonIcon from "@/assets/Icon/lesson.png";
import videoIcon from "@/assets/Icon/video.png";
import Image from "next/image";
import { useGetSingleCourseModuleLessonQuizVideoSizeQuery } from "@/redux/api/adminApi/courseApi";


const CourseStatistics = ({ courseId }: { courseId: string }) => {
  console.log("🚀 ~ CourseStatistics ~ courseId:", courseId)
  const { data, isLoading } =
    useGetSingleCourseModuleLessonQuizVideoSizeQuery(courseId);
  // console.log("🚀 ~ CourseStatistics ~ data:", data)
  const allData: any = data;
  console.log("🚀 ~ CourseStatistics ~ allData:", allData)


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
    <div className=" grid grid-cols-2 lg:grid-cols-4 w-full lg:w-[60%] mx-auto gap-5 p-4 my-3">
      {overViews?.map((item: any, index: number) => (
        <div
          className="text-center shadow w-[9rem] mx-auto uppercase "
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
              <h1 className="font-bold rounded-t-[8px] bg-[#24560a] px-2 text-white text-center w-full whitespace-nowrap text-xl py-2">
                {item?.name}
              </h1>
              <p className="text-5xl font-[900] bg-white text-[#1C3052] border-[3px]  border-[#1C3052] p-6">{item?.No}</p>
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