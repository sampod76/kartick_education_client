import { addAnswer } from "@/redux/features/quizSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IAnswer } from "@/types/singleQuiz";
import TextToSpeech from "@/utils/TextToSpeech";
import { Card, Checkbox, Input, Radio, Select, Space, message } from "antd";

import React, { useEffect, useState } from "react";
import QuizTimer from "./QuizTimer";
import Image from "next/image";

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

  const dispatch = useAppDispatch();

  if (!currentAnswer || quiz?._id !== currentAnswer?.singleQuiz) {
    const beforeANswer = {
      lesson: quiz?.lesson,
      module: quiz?.module?._id,
      milestone: quiz?.milestone,
      course: quiz?.course,
      category: quiz?.category,
      quiz: quiz?.quiz?._id,
      singleQuiz: quiz?._id,
      submitAnswers: [quiz?.milestone],
    };

    setCurrentAnswer(beforeANswer);
  }

  const checkAnswers = (responseData: any) => {
    const allCorrect = responseData?.submitAnswers.every((answerId: string) => {
      const submittedAnswer = responseData?.singleQuiz?.answers?.find(
        (answer: any) => answer.id === answerId
      );
      return submittedAnswer && submittedAnswer.correct;
    });

    return allCorrect;
  };

  // const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const isCorrectAnswer = checkAnswers(submittedDefaultData);

  const getCorrectAnswerIds = (responseData: any): string[] => {
    const correctAnswerIds: string[] = responseData?.submitAnswers.reduce(
      (acc: string[], answerId: string) => {
        const submittedAnswer = responseData?.singleQuiz?.answers?.find(
          (answer: any) => answer.id === answerId
        );
        if (submittedAnswer && submittedAnswer.correct) {
          acc.push(answerId);
        }
        return acc;
      },
      []
    );

    return correctAnswerIds;
  };

  const correctId = getCorrectAnswerIds(submittedDefaultData);
  // console.log(
  //   isCorrectAnswer,
  //   "correctId",
  //   correctId,
  //   submittedDefaultData?.singleQuiz?.type,
  //   "yyyyyyyyyyyyyyyyy",
  //   submittedDefaultData,
  //   submittedDefaultData?.submitAnswers[0]
  // );

  console.log(submittedDefaultData, "sssssssssssss");

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
      singleQuiz: quiz?._id,
      submitAnswers: changedAnswer,
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

  return (
    <div>
      <div key={quiz?._id} className={`m-4 w-full`}>
        <div className="text-center mt-4 flex justify-center items-center">
          {/* <p>Time Remaining: {timer} seconds</p> */}
          <QuizTimer
            quiz={quiz}
            time_duration={quiz?.time_duration}
            index={index}
            submittedDefaultData={submittedDefaultData}
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <p className={`lg:text-lg font-[550] mb-2 text-base mx-2`}>
            <TextToSpeech text={quiz?.title} />
            Question {index + 1} : {quiz?.title}
          </p>
          {submittedDefaultData?.singleQuiz ? isCorrectAnswer ? (
            <button className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#14b8a6] via-[#059669] to-[#047857] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#047857] hover:to-[#14b8a6]">
              Correct
            </button>
          ) : (
            <button className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#ff000091] via-[#a01212] to-[#690303]">
              Incorrect
            </button>
          ):""}
        </div>
        <div className="flex flex-wrap">
          {quiz?.imgs?.map((img: string, key: number, allimages: any[]) => (
            <Image
              key={key}
              src={img}
              width={700}
              height={700}
              className={"w-32 lg:w-96 max-h-44"}
              alt=""
            ></Image>
          ))}
        </div>
        {quiz?.type === "select" && (
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
            disabled={
              isDefaultValue?.is_time_up ||
              currentAnswer?.singleQuiz ===
                submittedDefaultData?.singleQuiz?._id
                ? true
                : false
            }
            defaultValue={submittedDefaultData?.submitAnswers[0]} // Set the default value based on isDefaultValue
            onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
          >
            {quiz?.answers?.map((option: any) => {
              // console.log(
              //   option?._id,
              //   "ooooooooooooooooooooooo",
              //   submittedDefaultData?.submitAnswers[0]
              // );
              return (
                <Radio
                  key={option?.title}
                  value={option?._id}
                  defaultChecked={
                    submittedDefaultData?.submitAnswers[0] === option?._id &&
                    true
                  }

                  // Check if the default value matches
                  // checked={
                  //   submittedDefaultData?.submitAnswers[0] === option?._id
                  // } // Set the checked state based on the match// Check if the default value matches
                >
                  <div
                    className={`border-2 rounded-xl p-3 w-full 
                  ${
                    submittedDefaultData?.submitAnswers[0] === option?._id
                      ? "bg-slate-700 text-white"
                      : ""
                  }
                  `}
                  >
                    <p>{option?.title}</p>
                    <div className="flex flex-wrap w-full">
                      {option?.imgs?.map(
                        (img: string, key: number, allimages: any[]) => (
                          <Image
                            key={key}
                            src={img}
                            width={700}
                            height={700}
                            className={`w-32 lg:w-96 max-h-24 lg:max-h-44`}
                            alt=""
                          ></Image>
                        )
                      )}
                    </div>
                  </div>
                </Radio>
              );
            })}
          </Radio.Group>
        )}

        {quiz?.type === "multiple_select" && (
          <Checkbox.Group
            defaultValue={submittedDefaultData?.submitAnswers} // Set the default value based on isDefaultValue
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
                defaultChecked={
                  !submittedDefaultData?.submitAnswers.find(
                    (item: string) => item === option?._id
                  )
                } // Check if the default value matches
              >
                <div className="border-2 rounded-xl p-3 w-full">
                  <p>{option?.title}</p>
                  <div className="flex flex-wrap w-full">
                    {option?.imgs?.map(
                      (img: string, key: number, allimages: any[]) => (
                        <Image
                          key={key}
                          src={img}
                          width={700}
                          height={700}
                          className={`w-32 lg:w-96 max-h-24 lg:max-h-44`}
                          alt=""
                        ></Image>
                      )
                    )}
                  </div>
                </div>
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}

        {/* {quiz?.type === "input" && (
          <div>
            <p className="text-lg font-[550] mb-2">
              Question {index + 1} : {quiz?.title}
            </p>
            <Input
              onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
              style={{ minHeight: "1rem", width: "12rem" }}
              placeholder="Type your answer"
            />
          </div>
        )}
        {quiz?.type === "text" && (
          <Input.TextArea
            onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
            style={{ minHeight: "6rem" }}
            placeholder="Type your answer"
          />
        )} */}
      </div>
    </div>
  );
}
