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
  console.log("🚀 filterValue:", filterValue);

  //! for Lesson options selection
  const { data: Lesson, isLoading } = useGetAllLessonQuery({});

  const LessonData = Lesson?.data;

  // console.log(LessonData)
  const LessonOptions = LessonData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  console.log(LessonOptions);

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
      style={{ width: "24rem" }}
      loading={isLoading}

      // loading={true}
      // placeholder={placeholder}
    />
  );
}
