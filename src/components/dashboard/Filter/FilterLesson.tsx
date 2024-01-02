import React, { useState } from "react";

import { Button, Select } from "antd";
import { useGetAllLessonQuery } from "@/redux/api/adminApi/lessoneApi";

export default function FilterLesson({
  filterValue,
  setFilterValue,
}: {
  filterValue: string;
  setFilterValue: any;
}) {
  // const [filterValue, setFilterValue] = useState("Filter by a Lesson");

  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  //! for search and select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {

  };

  //! for Lesson options selection
  const { data: Lesson, isLoading } = useGetAllLessonQuery({ ...query });

  const LessonData = Lesson?.data;

  //
  const LessonOptions = LessonData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

 

  return (
    <Select
      // placeholder="Filter by a Lesson"
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
      options={LessonOptions}
      value={filterValue}
      style={{ width: "10rem" }}
      loading={isLoading}
      //! for search & filter
      showSearch
      onSearch={onSearch}
      filterOption={filterOption}
      optionFilterProp="children"
      placeholder="Inserted are removed"

      // loading={true}
      // placeholder={placeholder}
    />
  );
}
