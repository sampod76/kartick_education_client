import React, { useState } from "react";
import milestoneIcon from "@/assets/Icon/milestoneIcon.png";
import Link from "next/link";
import Image from "next/image";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";

export default function MilestoneHomeFeatures() {
  const milestoneData = {
    _id: "milestone_di",
    title: "IBLossomLearn Proficiency Pro Academy",
    modules: [
      { _id: "1", title: "Math" },
      { _id: "2", title: "Calculus" },
      { _id: "3", title: "Mechanics" },
      { _id: "4", title: "Physics" },
      { _id: "5", title: "Chemistry" },
      { _id: "6", title: "Biology" },
      { _id: "7", title: "Computer Science" },
      { _id: "8", title: "Programming" },
      { _id: "9", title: "History" },
      { _id: "10", title: "Geography" },
      { _id: "11", title: "Literature" },
      { _id: "12", title: "Art" },
      { _id: "13", title: "Music" },
      { _id: "14", title: "Languages" },
      { _id: "15", title: "Economics" },
      { _id: "16", title: "Statistics" },
      { _id: "17", title: "Psychology" },
      { _id: "18", title: "Sociology" },
      { _id: "19", title: "Philosophy" },
      { _id: "20", title: "Environmental Science" },
      { _id: "21", title: "Political Science" },
      { _id: "22", title: "Astrophysics" },
      { _id: "23", title: "Environmental Engineering" },
      { _id: "24", title: "Psychiatry" },
      { _id: "25", title: "Business Administration" },
      { _id: "26", title: "Digital Marketing" },
      { _id: "27", title: "Robotics" },
      { _id: "28", title: "Astrobiology" },
      { _id: "29", title: "Criminal Justice" },
      { _id: "30", title: "Medical Ethics" },
      { _id: "31", title: "Film Studies" },
      { _id: "32", title: "Data Science" },
      { _id: "33", title: "Renewable Energy" },
      { _id: "34", title: "Neuroscience" },
      { _id: "35", title: "Graphic Design" },
      { _id: "36", title: "International Relations" },
      { _id: "37", title: "Cybersecurity" },
      { _id: "38", title: "Astronomy" },
      { _id: "39", title: "Ancient History" },
      { _id: "40", title: "Nutrition Science" },
    ],
  };
  const query: Record<string, any> = {};

  const [size, setSize] = useState<boolean>(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  query["limit"] = 4;
  query["children"] = "course";
  query["sortBy"] = "serial_number";
  query["sortOrder"] = "asc";
  query["status"] = "active";

  if (size) {
    query['limit'] = 999999
  } else {
    query['limit'] = 4
  }


  const { data = {}, isLoading } = useGetAllCategoryChildrenQuery({ ...query }) as any
  // console.log("🚀 ~ MilestoneHomeFeatures ~ data:", data);

  return (
    <div className="container mx-auto mt-7 text-center">
      {data?.data && data?.data?.map((category: any, index: number) => (
        <div
          key={category._id}
          className={`rounded-[28px] ${index % 4 === 0
            ? 'bg-[#43CD66]'
            : index % 3 === 0
              ? 'bg-[#F96A9A]'
              : index % 2 === 0
                ? 'bg-[#2AAAE2]'
                : 'bg-[#F9B001]'
            } px-3 py-5 mt-3`}
        >
          <h1 className="text-center text-white text-2xl lg:text-3xl my-3">{category?.title}</h1>
          <div className="bg-[#424644] grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-[1rem] rounded-b-xl">
            {showAllCourses
              ? category?.courses?.map((course: any) => (
                <Link
                  href={`/course/milestone/${course?._id}?category=${category?._id}`}
                  className="flex gap-2 justify-start items-start text-start text-white whitespace-normal"
                  key={course?._id}
                >
                  <Image src={milestoneIcon} height={20} width={20} alt="icon" className="w-4 h-4 mt-1" />
                  <h4>{course?.title} </h4>
                </Link>
              ))
              : category?.courses?.slice(0, 18).map((course: any) => (
                <Link
                  href={`/course/milestone/${course?._id}?category=${category?._id}`}
                  className="flex gap-2 justify-start items-start text-white text-start break-words"
                  key={course?._id}
                >
                  <Image src={milestoneIcon} height={20} width={20} alt="icon" className="w-4 h-4 mt-1" />
                  <h4>{course?.title} </h4>
                </Link>
              ))}
          </div>

          {category?.courses?.length > 18 && (
            <button
              className="text-white underline mt-2 cursor-pointer"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              {showAllCourses ? 'Show Less' : 'Show All'}
            </button>
          )}


        </div>
      ))}

      {(data?.data && !size) && <button
        onClick={() => setSize(true)}
        className="w-[7rem] mx-auto mt-9 bg-[#C6F2BA] h-[48px] text-center px-3 py-3 text-gray-700  font-semibold  rounded text-nowrap"
      >
        See All
      </button>
      }

    </div>
  );
}
