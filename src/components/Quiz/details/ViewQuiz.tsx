"use client";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { useGetSingleCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { useGetAllSingleQuizQuery } from "@/redux/api/adminApi/singleQuizApi";
import { IAnswer, ISingleQuizData } from "@/types/quiz/singleQuizType";
import TextToSpeech from "@/utils/TextToSpeech";
import { Button, Checkbox, Radio } from "antd";

import Image from "next/image";
import { useState } from "react";

export default function ViewQuiz({ quizId }: { quizId: string }) {
  // const { data: data, isLoading } = useGetSingleCategoryQuery(quizId, {
  //   skip: !Boolean(quizId),
  // });'
  const quiz_query: Record<string, any> = {};
  quiz_query["limit"] = 999999;
  quiz_query["sortBy"] = "serialNumber";
  quiz_query["sortOrder"] = "asc";
  quiz_query["quiz"] = quizId;
  const { data: allSingleQuizData, isLoading } = useGetAllSingleQuizQuery({
    ...quiz_query,
    quiz: quizId,
  });
  // console.log(data);

  const quizData = allSingleQuizData?.data || []
  const [currentStep, setCurrentStep] = useState(0);

  if (isLoading) {
    return <LoadingForDataFetch />;
  }


  const handleNext = () => {

    setCurrentStep((prevStep) => prevStep + 1);
  };


  const quiz = quizData[currentStep]

  return (
    <div className="">
      <h3> Quiz Details page</h3>
      <div className="flex flex-col justify-center items-center gap-3 mt-4">

        {<div className={`m-4 w-full relative `}>
          <div className="text-center mt-4 flex justify-center items-center">
            {/* <p>Time Remaining: {timer} seconds</p> */}
            QUiz Time:  {quiz?.time_duration && (
              <span>{Math.floor(quiz.time_duration / 1000 / 60)} </span>
            )} Minutes
          </div>

          <div className="flex justify-between items-center my-2 pr-4">
            <p className={`lg:text-lg font-[550] mb-2 text-base mx-2`}>
              <TextToSpeech text={quiz?.title} />
              Question  : {quiz?.title}
            </p>

          </div>
          <div className="flex flex-wrap mx-5">
            {quiz?.imgs?.map((img: string, key: number, allimages: any[]) => (
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

          {quiz?.type === "select" && (
            <Radio.Group
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
              name="radiogroup"

              defaultValue={quiz?.answers?.find((item: IAnswer) => item?.correct === true)?._id}

            // defaultValue={submittedDefaultData?.submitAnswers[0]} // Set the default value based on isDefaultValue

            >
              {quiz?.answers?.map((option: any, index: number) => {
                // const isCorrect = quiz?.answers?.find((item: IAnswer) => item?.correct === true)
                // console.log(index, 'isCorrect', isCorrect)
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
                           ${option?.correct === true && " border-2 border-green-600"}       
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

          {quiz?.type === "multiple_select" && (
            <Checkbox.Group
              // defaultValue={submittedDefaultData?.submitAnswers} // Set the default value based on isDefaultValue
              // disabled={isDefaultValue?.is_time_up ? true : false}
              defaultValue={quiz?.answers
                .filter((item: any) => item?.correct === true)
                .map((item: any) => item?._id)}

              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {quiz?.answers?.map((option: any) => {
                // const isCorrect = quiz?.answers?.find((item: IAnswer) => item?.correct === true)

                // console.log(isCorrect, ".............", option,isSubmitted);
                return (
                  <Checkbox
                    key={option?.title}
                    value={option?._id}
                  // defaultChecked={
                  //   !submittedDefaultData?.submitAnswers.find(
                  //     (item: string) => item === option?._id
                  //   )
                  // } // Check if the default value matches

                  >
                    <div
                      className={`border-2 rounded-xl p-2 w-full  ${option?.correct === true && " border-2 border-green-600"}     
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


        </div>}
        {/* //! next button */}
        <div className="flex justify-between  gap-5 mb-3 px-3">
          <Button
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep < quizData?.length - 1 ? (
            <Button
              type="default"
              onClick={handleNext}
            // disabled={isDisabledNext}
            >
              Next
            </Button>
          ) : (
            <Button type="default">
              Finished QUiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


