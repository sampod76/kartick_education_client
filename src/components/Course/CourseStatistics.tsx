import React from "react";
import skillIcon from "@/assets/Icon/dimond.png";
import lessonIcon from "@/assets/Icon/lesson.png";
import videoIcon from "@/assets/Icon/video.png";
import Image from "next/image";

const CourseStatistics = () => {
  const overViews = [
    { name: "skills", icon: skillIcon, No: 353 },
    { name: "Lesson", icon: lessonIcon, No: 50 },
    { name: "Video", icon: videoIcon, No: 353 },
    { name: "Gems", icon: lessonIcon, No: 100 },
  ];
  return (
    <div className="bg-white grid grid-cols-2 lg:grid-cols-4 w-[60%] mx-auto gap-2 py-5">
      {overViews?.map((item: any, index: number) => {
        return (
          <div
            className="flex flex-col justify-center items-center gap-2 p-5  rounded-md  shadow w-[9rem]"
            key={index}
          >
            <Image
              src={item?.icon}
              height={50}
              width={50}
              className="h-[2rem] w-[2rem]"
              alt="skills"
            />
            <h1 className="font-[500] ">
              {item?.No} {item?.name}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default CourseStatistics;
