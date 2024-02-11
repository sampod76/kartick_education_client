import { ICategoryStatus } from "..";

export type ISkillsPlanData = {
  title: string;
  _id: string;
  imgTitle: string;
  page?: string;
  points: { title: string; _id: string }[];
  details?: string;
  short_description?: string;
  author: string;
  // sub1_Skills_plan_category_id: Types.ObjectId;
  status: ICategoryStatus;

  isDelete: string;

  imgs: [string];

  demo_video: {
    video: string;
    platform: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
