import Quizes from "@/components/Quiz/Quizes";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import React from "react";

export default function QuizPage() {
  return (
    <div className=" w-full lg:w-[80vw] mx-auto">
      <UMBreadCrumb
        items={[
          {
            label: "Leadership",
            link: "/course",
          },
          {
            label: "Public Lead",
            link: "/course/milstone",
          },
          {
            label: "Be Smart Lesson Quiz",
            link: "/course/module",
          },
        ]}
      />
      <h1 className="text-3xl font-bold my-9 text-slate-700">
        Be Smart Lesson Quiz
      </h1>
      <Quizes />
    </div>
  );
}
