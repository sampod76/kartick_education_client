import React from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import FormSearchSelectField from "../FormSearchSelectField";

const SelectCourseField = ({ }) => {
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  query["status"] = "active";

  const { data: Course } = useGetAllCourseQuery({ ...query });
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
    <FormSearchSelectField
      size="large"
      name="Course"
      options={CourseOptions as any}
      defaultValue={{ label: "Select Course", value: "" }}
      label="Course"
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectCourseField;
