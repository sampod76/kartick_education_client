"use client";
import { useMemo, useState } from "react";
import { Button, message } from "antd";
import QuizQuestionCard from "./QuizQuestionCard";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetSubmitUserQuizQuery,
  useSubmitQuizMutation,
} from "@/redux/api/quizSubmitApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import TopBarLoading from "../ui/Loading/TopBarLoading";
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

  const { data: quizAnswerData, isLoading } = useGetSubmitUserQuizQuery(quizId);

  const userSubmitData = quizAnswerData;

  const submittedDefaultData = userSubmitData?.find(
    (answer: any) => answer?.singleQuiz?._id === currentAnswer?.singleQuiz
  );

  // ! For Test is submitted Answer is CorrectAnswer;

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

  // console.log(submittedDefaultData, "ccccccccccccccccc", isCorrectAnswer);
  // if (submittedDefaultData?.submitAnswers) {
  //   setIsCorrectAnswer(checkAnswers(submittedDefaultData));
  // };


  const submitAnswer = async () => {
    if (currentAnswer?.singleQuiz !== submittedDefaultData?.singleQuiz?._id) {
      try {
        const res = await submitQuiz(currentAnswer).unwrap();
        console.log(res, "response");
        if (res?.success === false) {
          Error_model_hook(res?.message);
        } else {
          // Check if submitted answers are correct
          const isCorrect = checkAnswers(res);

          if (isCorrect) {
            Success_model("Answer is Correct");
          } else {
            Error_model_hook("Incorrect answers submitted");
          }
        }
      } catch (err: any) {
        console.error(err);
        Error_model_hook(err?.message || err?.data);
      }
    } else {
      // message.error("Already submitted the answer");
    }
  };

  // ! For Next quiz and submit Quiz
  const handleNext = () => {
    submitAnswer();
    return setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleFinishQuiz = () => {
    // console.log(userAnswers);
    // submitAnswer();
    message.success("Quiz Finished successfully!");
  };

  // ! For disabled Next Button
  const isDisabledNext = useMemo(() => {
    const isSelected = userAnswers.find(
      (answer: any) => answer?.index === currentStep + 1
    );

    let disabled = false;

    if (currentAnswer?.singleQuiz === submittedDefaultData?.singleQuiz?._id) {
      // console.log("false ..........");
      disabled = false;
    } else if (isSelected) {
      disabled = false;
    } else {
      disabled = true;
    }
    return disabled;
  }, [currentAnswer, currentStep, submittedDefaultData, userAnswers]);

  // console.log(quizData?.length, "and", quizAnswerData?.length);
  return (
    <div className="w-full  mx-auto my-5 lg:my-0">
      <div className="flex flex-col justify-center items-center gap-3 mt-4">
        {/* Render quiz based on the current step */}
        {isLoading && <TopBarLoading />}
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
              disabled={isDisabledNext}
            >
              Next
            </Button>
          ) : (
            <div>
              {quizData?.length !== quizAnswerData?.length ? (
                <Button
                  type="default"
                  disabled={isDisabledNext}
                  onClick={handleNext}
                >
                  Finish Quiz
                </Button>
              ) : (
                <Button type="default" onClick={handleFinishQuiz}>
                  Finished Already
                </Button>
              )}
            </div>
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
