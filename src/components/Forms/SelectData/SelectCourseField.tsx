import React from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";

const SelectCourseField = () => {
     //! for Course options selection
  const { data: Course } = useGetAllCourseQuery({});
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
    <FormSelectField
      size="large"
      name="Course"
      options={CourseOptions as any}
      // defaultValue={priceTypeOptions[0]}
      label="Course"
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectCourseField;
