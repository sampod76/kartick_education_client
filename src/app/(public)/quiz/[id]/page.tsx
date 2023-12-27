import Quizes from "@/components/Quiz/Quizes";
import React from "react";

export default function QuizPage() {
  return (
    <div className=" w-full lg:w-[80vw] mx-auto">
      <h1 className="text-3xl font-bold">Be Smart Part Quiz</h1>
      <Quizes />
    </div>
  );
}
