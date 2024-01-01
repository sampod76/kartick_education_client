import React, { useState } from "react";

import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";

import { Button, Select } from "antd";


export default function FilterCourse({
  filterValue,
  setFilterValue,
}: {
  filterValue: string;
  setFilterValue: any;
}) {
  // const [filterValue, setFilterValue] = useState("Filter by a course");
  console.log("🚀 filterValue:", filterValue);

  //! for Course options selection
  const { data: Course, isLoading } = useGetAllCourseQuery({});


  const CourseData = Course?.data;

  // console.log(CourseData)
  const CourseOptions = CourseData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  console.log(CourseOptions);

  return (
    <Select
      // placeholder="Filter by a course"
      // onChange={handleChange ? handleChange : onChange}
      onChange={(val) => {
        setFilterValue(val);
      }}
      // dropdownRender={(menu) => (
      //   <div>
      //     <Button type="default">Filter</Button>
      //   </div>
      // )}
      // disabled={disabled}
      size={"large"}
      options={CourseOptions}
      value={filterValue}
      style={{ width: "24rem" }}
      loading={isLoading}

      // loading={true}
      // placeholder={placeholder}
    />
  );
}
