export type ISkills_plan = {
  title: string;
  imgs: string[];
  imgTitle: string;
  page?: string;
  points: string[];
  details?: string;
  short_description?: string;
  author: string | Record<string, any>;
  // sub1_Skills_plan_category_id: Types.ObjectId;
  status: "active" | "deactivate" | "save" | "disable";
  demo_video?: Record<string, string>;
  tags?: string[];
  isDelete: string;
};
