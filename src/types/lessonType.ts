import { IModuleData } from "./moduleType";
export type ILessonData = {
  _id: string;
  title: string;
  imgs: [];
  category: string;
  course: string;
  milestone: string;
  module: string | IModuleData;
  status: string;
  isDelete: string;
  lesson_number: number;
  videos: [
    {
      platform: string;
      link: string;
    }
  ];
  tags: [];
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
