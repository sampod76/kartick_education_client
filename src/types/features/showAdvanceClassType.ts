import { ICourseData } from "../courseType";
export type IClassTypes = {
  title: string;
  img: string;
  short_description: string;
  buttonLink?: string;
  course?: string | ICourseData;
};


export type IShow_advance_classes = {
  _id: string;
  title: string;
  buttonLink?: string;
  classes: IClassTypes[];
  page?: string;
  details?: string;
  short_description?: string;
  author: string | Record<string, any>;
  // sub1_Show_advance_classes_category_id: Types.ObjectId;
  status: "active" | "deactivate" | "save" | "disable";
  demo_video?: Record<string, string>;
  tags?: string[];
  isDelete: string;
  
};

