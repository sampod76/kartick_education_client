"use client";

import React from "react";
import { Card, Radio, Input, Select, Button } from "antd";
import QuizAside from "./QuizAside";

const { Option } = Select;

const quizData: {
  _id: number;
  question: string;
  type: string;
  answer: {
    title: string;
  }[];
}[] = [
  {
    _id: 1,
    question: "What is the capital of France?",
    type: "radio",
    // ", "Berlin", "London", "Rome"
    answer: [
      {
        title: "Paris",
      },
      {
        title: "Berlin",
      },
      {
        title: "London",
      },
      {
        title: "Rome",
      },
    ],
  },

  {
    _id: 2,
    question: "How many continents are there?",
    type: "select",
    answer: [
      {
        title: "5",
      },
      {
        title: "4",
      },
      {
        title: "5",
      },
      {
        title: "9",
      },
    ],
  },
  {
    _id: 3,
    question: "2 + 2 equals?",
    type: "text",
    answer: [],
  },
  {
    _id: 4,
    question: "What is JavaScript primarily used for in web development?",
    type: "textArea",
    answer: [],
  },
  {
    _id: 5,
    question: "Which is not language of Programming?",
    type: "radio",
    // answer: ["Javascript", "C++", "Python", "English"],
    answer: [
      {
        title: "Javascript",
      },
      {
        title: "C++",
      },
      {
        title: "Python",
      },
      {
        title: "English",
      },
    ],
  },
];

export default function Quizes() {
  const handleFinishQuiz = () => {
    // Handle quiz submission logic here
  };

  return (
    <div className="block lg:flex gap-2 items-start bg-slate-100 pt">
      <QuizAside />
      <div className="w-full lg:w-[70%] mx-auto my-5 lg:my-0 ">
        <div className="flex flex-col gap-3">
          {quizData.map((quiz: any, index: number) => (
            <Card key={quiz._id} className="mb-4">
              <p className="text-lg font-[550] mb-2">
                Question {index + 1} : {quiz.question}
              </p>
              {quiz.type === "radio" && (
                <Radio.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {quiz.answer.map((option: any) => (
                    <Radio key={option?.title} value={option?.title}>
                      {option?.title}
                    </Radio>
                  ))}
                </Radio.Group>
              )}
              {quiz.type === "select" && (
                <Select placeholder="Select an option" className="w-full">
                  {quiz.answer.map((option: any) => (
                    <Option key={option?.title} value={option?.title}>
                      {option?.title}
                    </Option>
                  ))}
                </Select>
              )}
              {quiz.type === "text" && (
                <Input
                  style={{ minHeight: "1rem", width: "12rem" }}
                  placeholder="Type your answer"
                />
              )}
              {quiz.type === "textArea" && (
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
        </div>
      </div>
    </div>
  );
}
