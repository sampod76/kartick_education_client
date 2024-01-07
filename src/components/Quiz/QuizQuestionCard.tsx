import { Card, Checkbox, Input, Radio, Select, Space } from "antd";

import React from "react";

const { Option } = Select;
export default function QuizQuestionCard({
  quiz,
  index,
  setUserResponses,
  userResponses,
}: {
  quiz: any;
  index: number;
  setUserResponses: any;
  userResponses: any;
}) {
  const handleAnswerChange = (questionIndex: number, answer: any) => {
    setUserResponses((prevResponses: any) => ({
      ...prevResponses,
      [questionIndex]: {
        no: questionIndex,
        answer: answer,
        _id: quiz?._id,
        title: quiz?.title,
      },
    }));
  };
  return (
    <div>
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
            onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
          >
            {quiz?.answers.map((option: any) => (
              <Radio key={option?.title} value={option?.title}>
                {option?.title}
              </Radio>
            ))}
          </Radio.Group>
        )}
        {quiz?.type === "multiple_select" && (
          <Checkbox.Group
            onChange={(value) => handleAnswerChange(index + 1, value)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {quiz?.answers?.map((option: any) => (
              <Checkbox key={option?.title} value={option?.title}>
                {option?.title}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}
        {quiz?.type === "input" && (
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
        )}
      </Card>
    </div>
  );
}
