import React from 'react';
import FormSelectField from '../FormSelectField';
import { useGetAllQuizQuery } from '@/redux/api/adminApi/quizApi';

const SelectQUizField = () => {
    const { data: Quizs } = useGetAllQuizQuery({});
    const QuizData = Quizs?.data;
    // console.log(QuizData)
    const QuizOptions = QuizData?.map((item: any) => {
      return {
        label: item?.title,
        value: item?._id,
      };
    });
    console.log(QuizOptions);
    return (
        <FormSelectField
        size="large"
        name="quiz"
        options={QuizOptions as any}
        // defaultValue={priceTypeOptions[0]}
        label="quiz"
        // placeholder="Select"
        required={true}
      />
    );
};

export default SelectQUizField;