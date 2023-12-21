import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllLessonQuery } from "@/redux/api/adminApi/lessoneApi";

const SelectLessonField = () => {
     //! for Lesson options selection
  const { data: lessons } = useGetAllLessonQuery({});
  const LessonData = lessons?.data;
  // console.log(LessonData)
  const LessonOptions = LessonData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  console.log(LessonOptions);
  return (
    <FormSelectField
      size="large"
      name="lesson"
      options={LessonOptions as any}
      // defaultValue={priceTypeOptions[0]}
      label="Lesson"
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectLessonField;
