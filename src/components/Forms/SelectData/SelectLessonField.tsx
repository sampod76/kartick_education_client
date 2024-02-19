import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllLessonQuery } from "@/redux/api/adminApi/lessoneApi";
import FormSearchSelectField from "../FormSearchSelectField";

const SelectLessonField = () => {
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  query["status"] = "active";
  //! for Lesson options selection
  const { data: lessons } = useGetAllLessonQuery({ ...query });
  const LessonData = lessons?.data;
  // console.log(LessonData)
  const LessonOptions = LessonData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  // console.log(LessonOptions);
  return (
    <FormSearchSelectField
      size="large"
      name="lesson"
      options={LessonOptions as any}
      defaultValue={{ label: "Select Lesson", value: "" }}
      label="Lesson"
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectLessonField;
