import { addAnswer } from "@/redux/features/quizSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IAnswer } from "@/types/singleQuiz";
import { Card, Checkbox, Input, Radio, Select, Space } from "antd";

import React, { useEffect, useState } from "react";

const { Option } = Select;
export default function QuizQuestionCard({
  quiz,
  index,
  // setUserResponses,
  // userResponses,
  userAnswers
}: {
  quiz: any;
  index: number;
  // setUserResponses: any;
  // userResponses: any;
  userAnswers:any[];
}) {

  // console.log(quiz)
  const [timer, setTimer] = useState<number>(1000);

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


  const dispatch = useAppDispatch()

const handleAnswerChange = (questionIndex: number, answer: any) => {
  // console.log(userResponses,"answer",answer,questionIndex)

  const answerData ={
    index:questionIndex,
    answer:answer,
    title:quiz?.title,
    _id:quiz?._id,
    type:quiz?.type,
    serialNumber:quiz?.serialNumber,

  }
  dispatch(addAnswer(answerData));

};
  


const isDefaultValue = userAnswers?.find((answer)=>answer?._id === quiz?._id);

// console.log(isDefaultValue);
  
  // console.log(userResponses)

  // console.log(userAnswers,"userAnswers from card")

  return (
    <div>
      <Card key={quiz?._id} className="mb-4">
      <div className="text-center mt-4">
          <p>Time Remaining: {timer} seconds</p>
        </div>
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
    defaultValue={isDefaultValue?.answer} // Set the default value based on isDefaultValue
    onChange={(e) => handleAnswerChange(index + 1, e.target.value)} 
  >
    {quiz?.answers.map((option: any) => (
      <Radio 
        key={option?.title} 
        value={option?.title}
        defaultChecked={isDefaultValue?.answer === option?.title} // Check if the default value matches
      >
        {option?.title}
      </Radio>
    ))}
  </Radio.Group>
)}

{quiz?.type === "multiple_select" && (
  <Checkbox.Group
    defaultValue={isDefaultValue?.answer} // Set the default value based on isDefaultValue
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
        value={option?.title}
        defaultChecked={isDefaultValue?.answer === option?.title} // Check if the default value matches
      >
        {option?.title}
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
      </Card>
    </div>
  );
}