import { addAnswer } from "@/redux/features/quizSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IAnswer } from "@/types/singleQuiz";
import TextToSpeech from "@/utils/TextToSpeech";
import { Card, Checkbox, Input, Radio, Select, Space, message } from "antd";

import React, { useEffect, useState } from "react";
import QuizTimer from "./QuizTimer";

const { Option } = Select;
export default function QuizQuestionCard({
  quiz,
  index,
  // setUserResponses,
  // userResponses,
  userAnswers,
  currentAnswer,
  setCurrentAnswer,
  submittedDefaultData,
}: {
  quiz: any;
  index: number;
  // setUserResponses: any;
  // userResponses: any;
  userAnswers: any[];
  currentAnswer: any;
  setCurrentAnswer: any;
  submittedDefaultData: any;
}) {
  // console.log(quiz);
  // console.log(currentAnswer);
  const dispatch = useAppDispatch();

  if (!currentAnswer|| quiz?._id !== currentAnswer?.userSubmitQuizzes[0]?.singleQuizId) {
    const beforeANswer = {
      lesson: quiz?.lesson,
      module: quiz?.module?._id,
      milestone: quiz?.milestone,
      course: quiz?.course,
      category: quiz?.category,
      quiz: quiz?.quiz?._id,
      userSubmitQuizzes: [
        {
          singleQuizId: quiz?._id,
          submitAnswers: [quiz?.milestone],
        },
      ],
    };

    setCurrentAnswer(beforeANswer);
  }

  const handleAnswerChange = (questionIndex: number, answer: any) => {
    let changedAnswer = [];
    if (Array.isArray(answer)) {
      changedAnswer = answer;
    } else if (typeof answer === "string") {
      changedAnswer.push(answer);
    }

    // console.log(changedAnswer)

    const newANswer = {
      lesson: quiz?.lesson,
      module: quiz?.module?._id,
      milestone: quiz?.milestone,
      course: quiz?.course,
      category: quiz?.category,
      quiz: quiz?.quiz?._id,
      userSubmitQuizzes: [
        {
          singleQuizId: quiz?._id,
          submitAnswers: changedAnswer,
        },
      ],
    };

    setCurrentAnswer(newANswer);

    // console.log(newANswer,"answer",answer,questionIndex)
    const answerData = {
      index: questionIndex,
      answer: answer,
      title: quiz?.title,
      _id: quiz?._id,
      type: quiz?.type,
      serialNumber: quiz?.serialNumber,
    };
    dispatch(addAnswer(answerData));
  };

  const isDefaultValue = userAnswers?.find(
    (answer) => answer?._id === quiz?._id
  );

  // console.log(isDefaultValue);

  // console.log(userAnswers);

  // console.log(userAnswers,"userAnswers from card")

  return (
    <div>
      <Card key={quiz?._id} className="mb-4">
        <div className="text-center mt-4 flex justify-center items-center">
          {/* <p>Time Remaining: {timer} seconds</p> */}
          <QuizTimer
            quiz={quiz}
            time_duration={quiz?.time_duration}
            index={index}
            submittedDefaultData={submittedDefaultData}
          />
        </div>
        <p className="text-lg font-[550] mb-2">
          <TextToSpeech text={quiz?.title} />
          Question {index + 1} : {quiz?.title}
        </p>
        {quiz?.type === "select" && (
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
            
            disabled={isDefaultValue?.is_time_up ? true : false}
            defaultValue={isDefaultValue?.answer} // Set the default value based on isDefaultValue
            onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
          >
            {quiz?.answers.map((option: any) => (
              <Radio
                key={option?.title}
                value={option?._id}
                defaultChecked={isDefaultValue?.answer === option?._id} // Check if the default value matches
              >
                {option?.title}
              </Radio>
            ))}
          </Radio.Group>
        )}

        {quiz?.type === "multiple_select" && (
          <Checkbox.Group
            defaultValue={isDefaultValue?.answer} // Set the default value based on isDefaultValue
            disabled={isDefaultValue?.is_time_up ? true : false}
            onChange={(value) => handleAnswerChange(index + 1, value)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {quiz?.answers?.map((option: any) => (
              <Checkbox
                key={option?.title}
                value={option?._id}
                defaultChecked={isDefaultValue?.answer === option?._id} // Check if the default value matches
              >
                {option?.title}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}
      </Card>
    </div>
  );
}
