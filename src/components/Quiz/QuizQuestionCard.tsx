import { addAnswer } from "@/redux/features/quizSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IAnswer, ISingleQuizData } from "@/types/quiz/singleQuizType";
import TextToSpeech from "@/utils/TextToSpeech";
import { Card, Checkbox, Input, Radio, Select, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import QuizTimer from "./QuizTimer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ISubmittedUserQuizData } from "@/types/quiz/submittedQuizType";
import DragQUizTest from "../dragCustom/DragQuiz";
import DndQuizCard from "../dnd/DndBeutyFull";
// import {PauseCircleOutlined} from "@and"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { PlayCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
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
  quiz: ISingleQuizData;
  index: number;
  // setUserResponses: any;
  // userResponses: any;
  userAnswers: any[];
  currentAnswer: any;
  setCurrentAnswer: any;
  submittedDefaultData: ISubmittedUserQuizData;
}) {
  // console.log(quiz);

  const dispatch = useAppDispatch();
  const router = useRouter()

  if (!currentAnswer || quiz?._id !== currentAnswer?.singleQuiz) {
    const beforeANswer = {
      lesson: quiz?.lesson,
      module: quiz?.module?._id,
      milestone: quiz?.milestone,
      course: quiz?.course,
      category: quiz?.category,
      quiz: quiz?.quiz?._id,
      singleQuiz: quiz?._id,
      submitAnswers: [''],
    };

    setCurrentAnswer(beforeANswer);
  }

  const checkAnswers = (responseData: ISubmittedUserQuizData) => {
    if (responseData?.singleQuiz?.type === 'input') {
      const isCorrectInput = responseData?.singleQuiz?.single_answer === responseData?.submitAnswers[0] ? true : false
      return isCorrectInput
    }
    else if (responseData?.singleQuiz?.type === "select" || responseData?.singleQuiz?.type === 'multiple_select' || responseData?.singleQuiz?.type === "find" || responseData?.singleQuiz?.type === "drag" || responseData?.singleQuiz?.type === "audio") {
      const allCorrectSelect = responseData?.submitAnswers.every((answerId: string) => {
        const submittedAnswer = responseData?.singleQuiz?.answers?.find(
          (answer: any) => answer.id === answerId && answer.correct
        );
        return submittedAnswer && submittedAnswer.correct;
      });
      return allCorrectSelect;
    }

    return false

  };

  // const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  //// ! for getting single or select answer
  const isCorrectAnswer = checkAnswers(submittedDefaultData);
  // console.log("🚀 ~ isCorrectAnswer:", isCorrectAnswer)
  // console.log(submittedDefaultData);

  const getCorrectAnswerIdsHandler = (responseData: any): string[] => {
    // console.log("🚀 ~ getCorrectAnswerIdsHandler ~ responseData:", responseData)
    // Existing functionality for single select answer

    const correctAnswerIds: string[] = responseData?.submitAnswers.reduce(
      (acc: string[], answerId: string) => {
        console.log(answerId, "answerId");
        const submittedAnswered = responseData?.singleQuiz?.answers?.find(
          (answer: any) => answer.id === answerId
        );
        console.log(submittedAnswered, "submmm");
        if (submittedAnswered && submittedAnswered.correct) {
          acc.push(answerId);
        }
        return acc;
      },
      []
    );


    // Check if submitAnswers length is greater than 1
    if (responseData?.submitAnswers.length > 1) {
      // console.log(responseData?.submitAnswers,'111111111111');
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
  // console.log(getCorrectAnswerIdsHandler(submittedDefaultData));
  // const correctId = getCorrectAnswerIdsHandler(submittedDefaultData);

  const allCorrectAnsweredIdHanlder = (responseData: any) => {
    const correctAnswerIds =
      responseData?.singleQuiz?.answers
        ?.filter((answer: any) => answer.correct)
        .map((answer: any) => answer._id) || [];

    return correctAnswerIds;
  };

  const allCorrectAnswer = allCorrectAnsweredIdHanlder(submittedDefaultData);


  const handleAnswerChange = (questionIndex: number, answer: any) => {
    // console.log("🚀 ~ handleAnswerChange ~ answer:", answer)
    let changedAnswer = [];
    console.log('answer', questionIndex)

    //! changedAnswer should array of string .


    if (Array.isArray(answer)) {
      changedAnswer = answer;
      ///! for drag and drops
      if (answer[0]?._id) {
        const imgUrls: string[] = answer.reduce((acc, answer) => {
          if (answer._id && answer.imgs.length > 0) {
            acc.push(answer._id);
          }
          return acc;
        }, []);
        changedAnswer = imgUrls
      }
      else {
        changedAnswer = answer;
      }



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
  // console.log('submittedDefaultData?.submitAnswers[0]', submittedDefaultData?.submitAnswers[0])

  const IsDisabledQUiz = isDefaultValue?.is_time_up ||
    currentAnswer?.singleQuiz ===
    submittedDefaultData?.singleQuiz?._id
    ? true
    : false

  console.log(quiz, 'quzzzzzzzzz')
  return (
    <div>
      <div key={quiz?._id} className={`my-4 w-full relative px-2 lg:pl-3 `}>
        {/* //! Quiz Timer */}
        <div className="text-center mt-3 flex justify-center items-center">
          {/* <p>Time Remaining: {timer} seconds</p> */}
          <QuizTimer
            quiz={quiz}
            time_duration={quiz?.time_duration}
            index={index}
            submittedDefaultData={submittedDefaultData}
          />
        </div>
        <div className="absolute right-4 top-0 p-">
          {submittedDefaultData?.singleQuiz ? (
            isCorrectAnswer ? (
              <button className="flex justify-center items-center gap-2 w-24 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#14b8a6] via-[#059669] to-[#047857] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#047857] hover:to-[#14b8a6]">
                Correct
              </button>
            ) : (
              <button className="flex justify-center items-center gap-2 w-24 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#ff000091] via-[#a01212] to-[#880202] hover:shadow-red-500 hover:scale-105">
                Incorrect
              </button>
            )
          ) : (
            ""
          )}
        </div>
        <div className=" my-2 pr-4">
          <p className={`lg:text-lg font-[550] mb-2 text-base mx-2`}>
            <TextToSpeech text={quiz?.title} />
            Question {index + 1} : {quiz?.title}
          </p>
          {quiz?.type === "audio" &&
            // <Link className="flex justify-start items-center gap-2 ml-2" href={quiz?.quizData?.link} rel="noopener noreferrer" target="_blank">
            //  <PlayCircleOutlined style={{ fontSize: "1.5rem" }} /> Play Audio  
            // </Link>
            <AudioPlayer
            autoPlay={false}
            src={quiz?.quizData?.link}
            // onPlay={e => console.log("onPlay")}
            crossOrigin="anonymous"
            preload="auto"
            // onLoadedMetaData={}
            // other props here
          />
          }
        </div>
        <div className="flex flex-wrap mx-5">
          {quiz.type !== 'drag' && quiz?.imgs?.map((img: string, key: number, allimages: any[]) => (
            <Image
              key={key}
              src={img}

              width={700}
              height={700}
              className={"w-96 lg:w-full max-h-44 lg:max-h-48 m-3"}
              alt=""
            ></Image>
          ))}
        </div>
        {/* //! For select Quiz */}
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
              const isCorrect = allCorrectAnswer?.find(
                (id: string) => id === option?._id
              );
              const isSubmitted = submittedDefaultData?.submitAnswers?.find(
                (item: string) => item === option?._id
              );

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
                    
                  ${submittedDefaultData?.submitAnswers[0] === option?._id
                        ? "bg-slate-600 text-white"
                        : ""
                      }
                  ${submittedDefaultData?.singleQuiz
                        ? isCorrect
                          ? " border-2 border-green-600"
                          : isSubmitted === option?._id
                            ? "border-2 border-red-500 "
                            : ""
                        : ""
                      }
                  `}
                  >
                    <div className="flex gap-1">
                      {option?.title && <TextToSpeech text={option?.title} />}
                      <p>{option?.title}</p>
                    </div>
                    <div className="flex flex-wrap w-full">
                      {option?.imgs?.map(
                        (img: string, key: number, allimages: any[]) => (
                          <Image
                            key={key}
                            src={img}
                            width={700}
                            height={700}
                            className={`w-96 lg:w-full  max-h-24 lg:max-h-44`}
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

        {/* // !for multiple select */}
        {(quiz?.type === "multiple_select" || quiz?.type === "audio") && (
          <Checkbox.Group
            defaultValue={submittedDefaultData?.submitAnswers} // Set the default value based on isDefaultValue
            // disabled={isDefaultValue?.is_time_up ? true : false}
            disabled={
              IsDisabledQUiz
            }
            onChange={(value) => handleAnswerChange(index + 1, value)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {quiz?.answers?.map((option: any) => {
              const isCorrect = allCorrectAnswer?.find(
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
                    className={`border-2 rounded-xl p-2 w-full 
                    
                      ${submittedDefaultData?.submitAnswers[0] === option?._id
                        ? "bg-slate-600 text-white"
                        : ""
                      }
                      ${submittedDefaultData?.singleQuiz
                        ? isCorrect
                          ? " border-2 border-green-600"
                          : isSubmitted === option?._id
                            ? "border-2 border-red-500 "
                            : ""
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
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        )}
        {/* //! For find Quiz */}
        {quiz?.type === "find" && (
          <Checkbox.Group
            defaultValue={submittedDefaultData?.submitAnswers} // Set the default value based on isDefaultValue
            // disabled={isDefaultValue?.is_time_up ? true : false}
            disabled={
              IsDisabledQUiz
            }
            onChange={(value) => handleAnswerChange(index + 1, value)}
            style={{
              display: "grid",
              // flexDirection: "column",
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: "1rem",
              padding: "2px 8px",
              // backgroundColor: 'red',

            }}
          >
            {quiz?.answers?.map((option: any) => {
              const isCorrect = allCorrectAnswer?.find(
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

                  style={{
                    // border:"2px solid black",
                    borderRadius: '10px',
                    padding: '8px',
                    backgroundColor: submittedDefaultData?.submitAnswers[0] === option?._id
                      ? '#2d3748'
                      : 'transparent',
                    border: submittedDefaultData?.singleQuiz
                      ? isCorrect
                        ? '2px solid #38a169'
                        : isSubmitted === option?._id
                          ? '2px solid #e53e3e'
                          : "2px solid #4D545A"
                      : "2px solid #4D545A",
                    color: submittedDefaultData?.submitAnswers[0] === option?._id
                      ? '#fff'
                      : '#000',

                  }}
                >
                  <div
                    className={`
                    
                      ${submittedDefaultData?.submitAnswers[0] === option?._id
                        ? "bg-slate-600 text-white"
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
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        )}
        {/* FOr //! input quiz */}
        {quiz?.type === "input" && (
          <div>
            {/* <p className="text-lg font-[550] mb-2">
              Question {index + 1} : {quiz?.title}
            </p> */}
            {currentAnswer?.singleQuiz !==
              submittedDefaultData?.singleQuiz?._id
              ? <Input
                defaultValue={submittedDefaultData?.submitAnswers?.length && submittedDefaultData?.submitAnswers[0]}
                // defaultValue='asdfasdfasd '
                disabled={
                  IsDisabledQUiz
                }
                onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
                style={{ minHeight: "1rem", width: "12rem" }}
                placeholder="Type your answer"
              /> :
              <h4>{submittedDefaultData?.submitAnswers[0]}</h4>
            }

          </div>
        )}
        {quiz?.type === "drag" && (


          <DragQUizTest
            // imageUrl={quiz?.answers}
            defaultValue={submittedDefaultData}
            disabled={IsDisabledQUiz}
            onChange={handleAnswerChange}
            quizIndex={index + 1}
            quizData={quiz}
          // isCorrectAnswer={isCorrectAnswer}
          />
          // <DndQuizCard
          //   imageUrl={['image']}
          //   defaultValue="yourDefaultValue"
          //   disabled={IsDisabledQUiz}
          //   onChange={handleAnswerChange}
          //   quizIndex={index}
          //   card={quiz}
          // />
        )}


        {/* {quiz?.type === "text" && (
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
