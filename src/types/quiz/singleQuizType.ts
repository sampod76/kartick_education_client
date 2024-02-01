import { IModuleData } from "./../moduleType";
export type IAnswer = {
  _id?: string;
  title: string;
  serialNumber?: number;
  correct?: boolean;
  imgs?: string[];
  status: "active" | "deactivate" | "save";
};

export type IQuizType =
  | "input"
  | "select"
  | "multiple_select"
  | "text"
  | "find"
  | 'drag'
export type ISingleQuizData = {
  _id: string;
  title: string;
  answers: IAnswer[];
  imgs: [];
  type: IQuizType;
  serialNumber: 3;
  category: string;
  course: string;
  milestone: string;
  module: IModuleData;
  lesson: string;
  time_duration:number;
  quiz: {
    _id: string;
    title: string;
    imgs: [string];
    details: string;
    short_description: string;
    passingGrade: number;
    minus_skip: boolean;
    category: string;
    course: string;
    milestone: string;
    module: string;
    lesson: string;
    status: string;
    demo_video: {
      video: string;
      platform: string;
    };
    tags: [];
    isDelete: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  status: string;
  isDelete: string;
  tags: [];
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
