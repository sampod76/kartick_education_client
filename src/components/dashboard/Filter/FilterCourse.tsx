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


  // const [filterValue, setFilterValue] = useState("Filter by a category");
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  //
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {

  };

  //! for Course options selection
  const { data: Course, isLoading } = useGetAllCourseQuery({ ...query });

  const CourseData = Course?.data;

  // 
  const CourseOptions = CourseData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  // CourseOptions?.unshift({ value: "disabled", label: "Disabled", disabled: true });

  // 
  return (
    <Select
      onChange={(val) => {
        setFilterValue(val);
      }}
      size={"large"}
      options={CourseOptions}
      value={filterValue}
      style={{ width: "10rem" }}
      loading={isLoading}
      showSearch
      onSearch={onSearch}
      filterOption={filterOption}
      optionFilterProp="children"
    />
  );
}
