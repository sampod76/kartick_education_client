import { IQuizType } from "./singleQuiz";

export type ISubmittedUserQuizData = {
  _id: string;
  user: string;
  category: string;
  course: string;
  milestone: string;
  module: string;
  lesson: string;
  status: string;
  quiz: string;
  isDelete: string;
  singleQuiz: {
    _id: string;
    title: string;
    imgs: [];
    single_answer: string;
    type: IQuizType;
    serialNumber: number;
    time_duration: number;
    category: string;
    course: string;
    milestone: string;
    module: string;
    lesson: string;
    quiz: string;
    status: string;
    isDelete: string;
    demo_video: {
      video: string;
      platform: string;
    };
    tags: [];
    answers: [];
    createdAt: string;
    updatedAt: string;
    __v: 0;
    id: string;
  };
  submitAnswers: [string];
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
};
