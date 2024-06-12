import { Pagination, PaginationProps } from "antd";
import React, { useState } from "react";
import SIngleCourse from "./SIngleCourse";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ENUM_SORT_ORDER, ENUM_STATUS } from "@/constants/globalEnums";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import { ICourseData } from "@/types/courseType";
import { Error_model_hook } from "@/utils/modalHook";
import NotFoundCourse from "@/components/ui/NotFound/NotFoundCourse";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import InternelError from "@/components/shared/Error/InternelError";

interface ICourseItemType {
  status?: string;
  category?: string;
  categoryTitle?: string;
  [key: string]: string | undefined;
}

const Courses = ({
  query,
  width = "container",
}: {
  query: ICourseItemType;
  width?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to render courses for the current page
  const renderCoursesForPage = (courses: ICourseData[]) => {
    const startIndex = (currentPage - 1) * 4;
    const endIndex = Math.min(startIndex + 4, courses.length);
    return courses
      .slice(startIndex, endIndex)
      .map((course: ICourseData, index: number) => (
        
        // console.log(course)
        
        <SIngleCourse course={course} key={index} />
      ));
  };

  // Fetch courses based on query parameters and pagination
  const { data, isLoading, error } = useGetAllCourseQuery({
    status: ENUM_STATUS.ACTIVE,
    limit: 999, // Fetching more than needed to ensure we have enough data for pagination
    page: 1,
    sortOrder: ENUM_SORT_ORDER.ASC,
    ...query,
  });
  const courseData = data?.data || [];

  // console.log(data?.data);

  const totalCourses = courseData.length;



  function Pagination({ coursedata }:any) {
    // State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
  
    // Calculate indexes of the courses to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = coursedata.slice(indexOfFirstItem, indexOfLastItem);
  
    // Change page
    const handlePageChange = (pageNumber:any) => setCurrentPage(pageNumber);
  
    return (
      <div>
        <CourseList courses={currentCourses} />
        <PaginationButtons
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={coursedata.length}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
  
  function CourseList({ courses }:any) {
    return (
      <div className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-3">
        {courses.map((course:any, index:number) => (
          <SIngleCourse course={course} key={index} />
        ))}
      </div>
    );
  }
  
  function PaginationButtons({ currentPage, itemsPerPage, totalItems, onPageChange }:any) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handleClick = (pageNumber:any) => {
      onPageChange(pageNumber);
    };
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button className={`p-1 px-2 rounded-md  ${i === currentPage ? "bg-blue-600 text-white" : ""}`} key={i} onClick={() => handleClick(i)} disabled={i === currentPage}>
            {i}
          </button>
        );
      }
      return pageNumbers;
    };
  
    return (
      <div className="flex justify-center w-[400px] sm:w-[80%] mx-auto  gap-2 p-2 bg-gray-200 mt-2 rounded-md ">
        <div className=" flex overflow-x-scroll">
          {currentPage > 1 && (
          <button onClick={() => handleClick(currentPage - 1)}>Previous</button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button onClick={() => handleClick(currentPage + 1)}>Next</button>
        )}
        </div>
        
      </div>
    );
  }
  

  





  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  if (error) {
    return <InternelError message={
      //@ts-ignore 
      error.data || data?.data?.message} />;
  }

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingSkeleton />
      ) : totalCourses === 0 ? (
        <NotFoundCourse />
      ) : (
        <div
          className={`mt-3 ${
            width === "container" ? "container" : "w-full"
          } mx-auto `}
        >
          {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {renderCoursesForPage(courseData)}
          </div> */}
          <div className={`mt-10 mb-2  flex justify-center items-center  p-2 rounded-md`}>
            {/* <Pagination
              current={currentPage}
              onChange={onChange}
              defaultCurrent={1}
              total={totalCourses}
            /> */}
            <Pagination coursedata={courseData}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
