// only modula in single quiz
"use client";

import React from "react";
import { Card, Radio, Input, Select, Button } from "antd";
import QuizAside from "./QuizAside";
import UMBreadCrumb from "../ui/UMBreadCrumb";
import { useGetAllSingleQuizQuery } from "@/redux/api/adminApi/singleQuiz";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { usePathname, useSearchParams } from "next/navigation";
import TextToSpeech from "@/utils/TextToSpeech";
// import QuizTestPage from "./QuizTestPage";
const QuizTestPage = React.lazy(() => import("./QuizTestPage"));

const { Option } = Select;

export default function QuizeSinglePage({
  quizeId,
  quiz_title,
}: {
  quizeId: string;
  quiz_title: string;
}) {
  const searchParams = useSearchParams();
  const quiz_query: Record<string, any> = {};
  //! for Course options selection
  quiz_query["limit"] = 999999;
  quiz_query["sortBy"] = "serialNumber";
  quiz_query["sortOrder"] = "asc";

  const { data: allSingleQuizeData, isLoading } = useGetAllSingleQuizQuery({
    ...quiz_query,
  });

  const handleFinishQuiz = () => {
    // Handle quiz submission logic here
  };
  if (isLoading) {
    return <LoadingSkeleton number={10} />;
  }
  return (
    <div className="container mx-auto rounded-xl mt-3 shadow-2xl">
      <h1 className="text-sm lg:text-[1.206vw]  font-bold p-5">
        <TextToSpeech text={quiz_title} />
        {quiz_title}
      </h1>
      <div className=" py-2 m2-2 px-3">
        {/*
         <UMBreadCrumb
          items={[
            {
              label: "lesson",
              link: "/lesson",
            },
            {
              label: "quize",
              link: "/lesson/quize",
            },
            {
              label: "Be Smart Lesson Quiz",
              link: "/course/module",
            },
          ]}
        /> 
        */}
      </div>
      <div className="block lg:flex gap-2 items-start  ">
        <QuizAside
          time_duration={2000}
          questionLength={allSingleQuizeData?.data?.length}
        />
        <div className="w-full lg:w-[70%] mx-auto my-5 lg:my-0 ">
          <QuizTestPage
            quizData={allSingleQuizeData?.data || []}
            quizId={quizeId}
          />
          {/* <div className="flex flex-col gap-3">
            {allSingleQuizeData?.data?.map((quiz: any, index: number) => (
              
              <Card key={quiz?._id} className="mb-4">
                <p className="text-lg font-[550] mb-2">
                  Question {index + 1} : {quiz?.title}
                </p>
                {quiz?.type === "select" && (
                  <Radio.Group
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {quiz?.answers.map((option: any) => (
                      <Radio key={option?.title} value={option?.title}>
                        {option?.title}
                       
                      </Radio>
                    ))}
             
                  </Radio.Group>
                )}
                {quiz?.type === "multiple_select" && (
                  <Select placeholder="Select an option" className="w-full">
                    {quiz?.answers?.map((option: any) => (
                      <Option key={option?.title} value={option?.title}>
                        {option?.title}
                      </Option>
                    ))}
                  </Select>
                )}
                {quiz?.type === "input" && (
                  <div>
                    <p className="text-lg font-[550] mb-2">
                      Question {index + 1} : {quiz?.title} 
                    </p>
                    <Input
                      style={{ minHeight: "1rem", width: "12rem" }}
                      placeholder="Type your answer"
                    />
                  </div>
                )}
                {quiz?.type === "text" && (
                  <Input.TextArea
                    style={{ minHeight: "6rem" }}
                    placeholder="Type your answer"
                  />
                )}
              </Card>
            ))}
            <div className="mt-4">
              <Button
                type="primary"
                style={{ padding: "8px", height: "3rem", fontWeight: "600" }}
                onClick={handleFinishQuiz}
              >
                Finish Quiz
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
