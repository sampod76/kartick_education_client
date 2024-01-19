import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllQuizQuery } from "@/redux/api/adminApi/quizApi";
import FormSearchSelectField from "../FormSearchSelectField";

const SelectQUizField = () => {
  const { data: Quizs, isLoading } = useGetAllQuizQuery({});
  const QuizData = Quizs?.data;
  // console.log(QuizData)
  const QuizOptions = QuizData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  
  return (
    <FormSearchSelectField
      size="large"
      name="quiz"
      options={QuizOptions as any}
      // defaultValue={priceTypeOptions[0]}
      label="quiz"
      loading={isLoading}
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectQUizField;
