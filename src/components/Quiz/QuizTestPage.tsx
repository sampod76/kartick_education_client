"use client";
import { useState } from "react";
import { Button, message } from "antd";
import QuizQuestionCard from "./QuizQuestionCard";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetSubmitUserQuizQuery,
  useSubmitQuizMutation,
} from "@/redux/api/quizSubmitApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
export default function QuizTestPage({
  quizData,
  quizId,
}: {
  quizData: any[];
  quizId: string;
}) {
  ///! state of quiz card
  const [currentStep, setCurrentStep] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  // const [userResponses, setUserResponses] = useState<any[]>([]);

  const [submitQuiz] = useSubmitQuizMutation();
  ///! for submit quiz
  const { userAnswers } = useAppSelector((state: any) => state.quiz);

  //! for getQUiz

  const { data: quizAnswerData } = useGetSubmitUserQuizQuery(quizId);

  const userSubmitData = quizAnswerData

  console.log("🚀 ~ file: QuizTestPage.tsx:32 ~ userSubmitData:", userSubmitData)


  const submittedDefaultData= userSubmitData?.userSubmitQuizzes?.find(
    (answer:any) => answer?._id === currentAnswer?.userSubmitQuizzes[0]?.singleQuizId
  );
  // const submittedDefaultData= userSubmitData

  console.log("🚀 ~ file: QuizTestPage.tsx:36 ~ submittedDefaultData:", submittedDefaultData)


  const handleNext = async () => {
    // console.log(currentAnswer);

    try {
      const res = await submitQuiz(currentAnswer).unwrap();
      console.log(res, "response");
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Answer submitted");
        // setCurrentStep((prevStep) => prevStep + 1);
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data);
    }

    return setCurrentStep((prevStep) => prevStep + 1);
  };

  console.log(currentAnswer, "cccccccccccccccc");

  // console.log(currentStep + 1,'anddd',userAnswers);
  const handleFinishQuiz = () => {
    // Save user responses to localStorage or API
    // saveQuizResponse(quizId, userResponses);
    console.log(userAnswers);
    // Display a success message
    message.success("Quiz submitted successfully!");
    // Redirect to a summary page or any other page as needed
    // router.push(`/quiz/${quizId}/summary`);
  };

  return (
    <div className="w-full lg:w-[70%] mx-auto my-5 lg:my-0">
      <div className="flex flex-col justify-center items-center gap-3 mt-4">
        {/* Render quiz based on the current step */}
        {quizData.length > 0 && (
          // renderQuizQuestion(quizData[currentStep], currentStep);
          <QuizQuestionCard
            quiz={quizData[currentStep]}
            index={currentStep}
            userAnswers={userAnswers}
            currentAnswer={currentAnswer}
            setCurrentAnswer={setCurrentAnswer}
            submittedDefaultData={submittedDefaultData}
            // setUserResponses={setUserResponses}
            // userResponses={userResponses}
          />
        )}

        <div className="flex justify-between  gap-5 mb-3 px-3">
          <Button
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep < quizData.length - 1 ? (
            <Button
              type="default"
              onClick={handleNext}
              // disabled={!userResponses.hasOwnProperty(currentStep+1)}
              disabled={
                !userAnswers.find(
                  (answer: any) => answer?.index === currentStep + 1
                )
              }
            >
              Next
            </Button>
          ) : (
            <Button type="default" onClick={handleFinishQuiz}>
              Finish Quiz
            </Button>
          )}
        </div>

        {/*         
        <Steps
        current={currentStep}
        items={quizData?.map((quiz: any, index: number) => ({
          key: quiz?.title,
          title: `Quiz${index} `,
        }))}
      ></Steps> */}

        {/* Display timer */}
        {/* <div className="text-center mt-4">
          <p>Time Remaining: {timer} seconds</p>
        </div> */}
      </div>
    </div>
  );
}
