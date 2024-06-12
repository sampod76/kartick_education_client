import React, { useState } from "react";
import milestoneIcon from "@/assets/Icon/milestoneIcon.png";
import Link from "next/link";
import Image from "next/image";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";

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

  query["limit"] = 5;
  query["children"] = "course";
  query["sortBy"] = "serial_number";
  query["sortOrder"] = "asc";
  query["status"] = "active";

  if (size) {
    query["limit"] = 999999;
  } else {
    query["limit"] = 5;
  }

  const [claseAcctive, setClaseAcctive] = useState(
    "IBLossomLearn Proficiency Pro Academy"
  );
  const [activeTabKey, setActiveTabKey] = useState();

  const handleTabClick = (key: any) => {
    setClaseAcctive(key);
    // console.log(key);
  };

  const TestElemnt = (course: any, title: string) => {
    // console.log(course, "ssysysy");

    // console.log(title);

    return course?.title && course?.title == claseAcctive
      ? course?.course?.courses &&
          course?.course?.courses.map((item: any, index : number) => {
            // console.log(item, "ayan");
            return (
              
              <div key={index} className="flex gap-3 p-4 border-b-2 hover:border-b-[#FB8500] transition-all cursor-pointer bg-white shadow-sm  items-center rounded-md">
                
             
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.03063 9.53073L1.53063 17.0307C1.42573 17.1357 1.29204 17.2073 1.14648 17.2362C1.00092 17.2652 0.850025 17.2504 0.712907 17.1936C0.57579 17.1368 0.458613 17.0405 0.37621 16.9171C0.293807 16.7936 0.249883 16.6485 0.25 16.5001V1.5001C0.249883 1.35168 0.293807 1.20656 0.37621 1.08312C0.458613 0.95967 0.57579 0.86345 0.712907 0.806635C0.850025 0.749821 1.00092 0.734968 1.14648 0.763955C1.29204 0.792943 1.42573 0.864469 1.53063 0.969477L9.03063 8.46948C9.10036 8.53913 9.15568 8.62185 9.19342 8.7129C9.23116 8.80395 9.25059 8.90154 9.25059 9.0001C9.25059 9.09866 9.23116 9.19626 9.19342 9.28731C9.15568 9.37836 9.10036 9.46107 9.03063 9.53073Z"
                    fill="#FB8500"
                  />
                </svg>
                <Link href={`/course/milestone/${item?._id}?category=${course?.course?._id}`}><h2 className="text-lg">{item.title}</h2></Link>
              </div>
              
            );
          })
      : ""
  };

  const activeClass =
    "   text-[14px] lg:text-[18px] font-[600] bg-[#95c3ff3e] text-[#2a63ff] rounded ";
  const inactiveClass = "  text-[14px] lg:text-[18px]   ";

  const { data = {}, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  }) as any;
  console.log("🚀 ~ MilestoneHomeFeatures ~ data:", data.data);
  // setActiveTabKey(data?.data[0])

  // setClaseAcctive(data?.data && data?.data[0].title)

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="md:w-[90%] mx-auto">
          <div className="flex flex-col justify-center items-center py-4 mt-4 gap-3">
            <p className="w-fit text-sm md:text-lg font-semibold bg-[#fcdbb6] rounded-sm text-[#FB8500]">
              &nbsp;&nbsp; WHAT WE OFFER? &nbsp;&nbsp;
            </p>
            <h1 className="text-5xl font-bold leading-normal">Our Courses</h1>
          </div>
        </div>
      </div>
      <hr />
      <div className="container mx-auto">
        <div className="md:w-[90] mx-auto py-5">
          <ul className="flex gap-10 list-none items-center overflow-x-scroll">
            {data?.data &&
              data?.data?.map((category: any, index: number) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleTabClick(category.title)}
                    className={`${
                      claseAcctive == category.title
                        ? activeClass
                        : inactiveClass
                    } cursor-pointer min-w-fit p-1 mb-2`}
                  >
                    {category.title}
                  </li>
                );

                // console.log(category.title);
              })}
          </ul>
        </div>
      </div>
      <hr />
<div className="w-full bg-[#fcdbb613]  py-6">
<div className="container mx-auto ">
        <div className="md:w-[90%] mx-auto justify-center grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {data?.data &&
            data?.data?.map((item: any, index:number) => {
              return <TestElemnt key={index} course={item} title={item.title} />;
              // console.log(item.courses);
            })}
          
        </div>
      </div>
</div>
      
    </div>

    // <div className="container mx-auto mt-7 text-center">
    //   {data?.data && data?.data?.map((category: any, index: number) => (
    //     <div
    //       key={category._id}
    //       className={`rounded-[28px] ${index % 4 === 0
    //         ? 'bg-[#43CD66]'
    //         : index % 3 === 0
    //           ? 'bg-[#F96A9A]'
    //           : index % 2 === 0
    //             ? 'bg-[#2AAAE2]'
    //             : 'bg-[#F9B001]'
    //         } px-3 py-5 mt-3`}
    //     >
    //       <h1 className="text-center text-white text-2xl lg:text-3xl my-3">{category?.title}</h1>
    //       <div className="bg-[#424644] grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-[1rem] rounded-b-xl">
    //         {showAllCourses
    //           ? category?.courses?.map((course: any) => (
    //             <Link
    //               href={`/course/milestone/${course?._id}?category=${category?._id}`}
    //               className="flex gap-2 justify-start items-start text-start text-white whitespace-normal"
    //               key={course?._id}
    //             >
    //               <Image src={milestoneIcon} height={20} width={20} alt="icon" className="w-4 h-4 mt-1" />
    //               <h4>{course?.title} </h4>
    //             </Link>
    //           ))
    //           : category?.courses?.slice(0, 18).map((course: any) => (
    //             <Link
    //               href={`/course/milestone/${course?._id}?category=${category?._id}`}
    //               className="flex gap-2 justify-start items-start text-white text-start break-words"
    //               key={course?._id}
    //             >
    //               <Image src={milestoneIcon} height={20} width={20} alt="icon" className="w-4 h-4 mt-1" />
    //               <h4>{course?.title} </h4>
    //             </Link>
    //           ))}
    //       </div>

    //       {category?.courses?.length > 18 && (
    //         <button
    //           className="text-white underline mt-2 cursor-pointer"
    //           onClick={() => setShowAllCourses(!showAllCourses)}
    //         >
    //           {showAllCourses ? 'Show Less' : 'Show All'}
    //         </button>
    //       )}

    //     </div>
    //   ))}

    //   {(data?.data && !size) && <button
    //     onClick={() => setSize(true)}
    //     className="w-[7rem] mx-auto mt-9 bg-[#C6F2BA] h-[48px] text-center px-3 py-3 text-gray-700  font-semibold  rounded text-nowrap"
    //   >
    //     See All
    //   </button>
    //   }

    // </div>
  );
}
