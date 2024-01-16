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
        (answer: any) => answer.id === answerId && answer.correct
      );
      return submittedAnswer && submittedAnswer.correct;
    });

    return allCorrect;
  };

  // const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  //// ! for getting single or select answer
  const isCorrectAnswer = checkAnswers(submittedDefaultData);
  // console.log(submittedDefaultData);

  const getCorrectAnswerIds = (responseData: any): string[] => {
    // Existing functionality for single select answer
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

    // Check if submitAnswers length is greater than 1
    if (responseData?.submitAnswers.length > 1) {
      // console.log(responseData?.submitAnswers);
      // New functionality for multiple select answers
      const allCorrect = responseData?.submitAnswers.every(
        (answerId: string) => {
          // console.log(answerId, "answe");
          const submittedAnswer = responseData?.singleQuiz?.answers?.find(
            (answer: any) => answer.id === answerId && answer.correct
          );
          // console.log(submittedAnswer);
          return submittedAnswer;
        }
      );

      // If all answers are correct, return the array of all answer IDs
      if (allCorrect) {
        return (
          responseData?.singleQuiz?.answers.map((answer: any) => answer.id) ||
          []
        );
      }
    }

    return correctAnswerIds;
  };
  const correctId = getCorrectAnswerIds(submittedDefaultData);
  // console.log(correctId);
  // function getCorrectMultipleAnswerIds(submitAnswers: any, answers: any) {
  //   const correctAnswerIds = [];

  //   // Iterate through each answer ID in submitAnswers
  //   submitAnswers?.forEach((submitAnswerId: any) => {
  //     // Find the corresponding answer object in the answers array
  //     const correspondingAnswer = answers.find(
  //       (answer) => answer.id === submitAnswerId
  //     );

  //     // Check if the answer exists and is correct
  //     if (correspondingAnswer && correspondingAnswer.correct) {
  //       // Add the answer ID to the correctAnswerIds array
  //       correctAnswerIds.push(correspondingAnswer.id);
  //     }
  //   });

  //   return correctAnswerIds;
  // }

  // const correctAnswerIds = getCorrectMultipleAnswerIds(
  //   submittedDefaultData?.submitAnswers,
  //   submittedDefaultData?.singleQuiz?.answers
  // );

  // console.log("Correct Answer IDs:", correctAnswerIds);
  // console.log(
  //   isCorrectAnswer,
  //   "correctId",
  //   correctId,
  //   submittedDefaultData?.singleQuiz?.type,
  //   "yyyyyyyyyyyyyyyyy",
  //   submittedDefaultData,
  //   submittedDefaultData?.submitAnswers[0]
  // );

  // console.log(submittedDefaultData, "sssssssssssss");

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
        <div className="flex justify-between items-center my-2 pr-4">
          <p className={`lg:text-lg font-[550] mb-2 text-base mx-2`}>
            <TextToSpeech text={quiz?.title} />
            Question {index + 1} : {quiz?.title}
          </p>
          {submittedDefaultData?.singleQuiz ? (
            isCorrectAnswer ? (
              <button className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#14b8a6] via-[#059669] to-[#047857] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#047857] hover:to-[#14b8a6]">
                Correct
              </button>
            ) : (
              <button className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#ff000091] via-[#a01212] to-[#690303]">
                Incorrect
              </button>
            )
          ) : (
            ""
          )}
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
            name="radiogroup"
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
              //   submittedDefaultData?.submitAnswers[0],
              //   "correctId",
              //   correctId
              // );
              const isCorrect = correctId?.find(
                (id: string) => id === option?._id
              );
              // console.log(isCorrect);

              return (
                <Radio
                  key={option?._id}
                  value={option?._id}
                  // defaultChecked={
                  //   submittedDefaultData?.submitAnswers[0] === option?._id &&
                  //   true
                  // }
                >
                  <div
                    className={`border-2 rounded-xl p-2 w-full 
                  ${
                    submittedDefaultData?.submitAnswers[0] === option?._id
                      ? "bg-slate-700 text-white"
                      : ""
                  }
                  ${
                    isCorrect
                      ? " border-2 border-green-600"
                      : "border-2 border-red-500 "
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
            {quiz?.answers?.map((option: any) => {
              const isCorrect = correctId?.find(
                (id: string) => id === option?._id
              );
              const isSubmitted = submittedDefaultData?.submitAnswers?.find(
                (item: string) => item === option?._id
              );
              // console.log(isCorrect, ".............", option,isSubmitted);
              return (
                <Checkbox
                  key={option?.title}
                  value={option?._id}
                  defaultChecked={
                    !submittedDefaultData?.submitAnswers.find(
                      (item: string) => item === option?._id
                    )
                  } // Check if the default value matches
                >
                  <div
                    className={`border-2 rounded-xl p-3 w-full  ${
                      isSubmitted === option?._id
                        ? isCorrect
                          ? " border-2 border-green-600"
                          : "border-2 border-red-500 "
                        : ""
                    } `}
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
                </Checkbox>
              );
            })}
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
