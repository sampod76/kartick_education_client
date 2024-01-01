"use client";

import QuizeSinglePage from "@/components/Quiz/Quizes";
import { useGetSingleQuizQuery } from "@/redux/api/adminApi/quizApi";
import { Spin } from "antd";
import React from "react";

export default function LessonQUizPage({ params }: { params: { id: string } }) {
  console.log("🚀 ~ file: page.tsx:4 ~ LessonQUizPage ~ params:", params);

  const { data: quizData, isLoading } = useGetSingleQuizQuery(params?.id);
  console.log("🚀 ~ file: page.tsx:8 ~ LessonQUizPage ~ quizData:", quizData);

  if (isLoading) {
    <Spin />;
  }

  return (
    <div>
      <QuizeSinglePage quizeId={quizData?._id} />
    </div>
  );
}
