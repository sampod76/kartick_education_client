"use client";
import { useState, useEffect } from "react";
import {
  Card,
  Radio,
  Select,
  Input,
  Button,
  Steps,
  message,
  Space,
} from "antd";
import QuizQuestionCard from "./QuizQuestionCard";
export default function QuizTestPage({
  quizData,
  quizId,
}: {
  quizData: any[];
  quizId: string;
}) {
  ///! state of quiz card
  const [currentStep, setCurrentStep] = useState(1);
  const [userResponses, setUserResponses] = useState<any>({});
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    // Handle timer logic
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        // Auto-submit when the timer reaches 0
        // handleFinishQuiz();
        clearInterval(timerInterval);
      }
    }, 1000);

    // Clean up timer interval when component unmounts or quiz is finished
    // return () => clearInterval(timerInterval);
  }, [timer]);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleFinishQuiz = () => {
    // Save user responses to localStorage or API
    // saveQuizResponse(quizId, userResponses);
    console.log(userResponses);

    // Display a success message
    message.success("Quiz submitted successfully!");

    // Redirect to a summary page or any other page as needed
    // router.push(`/quiz/${quizId}/summary`);
  };

  console.log(
    "currentSteps",
    currentStep,
    "quizLenght",
    quizData.length,
    "test answer",
    userResponses
  );


  return (
    <div className="w-full lg:w-[70%] mx-auto my-5 lg:my-0">
      <Steps
        current={currentStep}
        items={quizData?.map((quiz: any, index: number) => ({
          key: quiz?.title,
          title: `${quiz?.type} Quiz`,
        }))}
      ></Steps>
      <div className="flex flex-col gap-3 mt-4">
        {/* Render quiz based on the current step */}
        {quizData.length > 0 && (
          // renderQuizQuestion(quizData[currentStep], currentStep)

          <QuizQuestionCard
            quiz={quizData[currentStep]}
            index={currentStep}
            setUserResponses={setUserResponses}
            userResponses={userResponses}
          />
        )}

        <div className="flex justify-between">
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
              disabled={!userResponses.hasOwnProperty(currentStep+1)}
            >
              Next
            </Button>
          ) : (
            <Button type="default" onClick={handleFinishQuiz}>
              Finish Quiz
            </Button>
          )}
        </div>

        {/* Display timer */}
        <div className="text-center mt-4">
          <p>Time Remaining: {timer} seconds</p>
        </div>
      </div>
    </div>
  );
}
