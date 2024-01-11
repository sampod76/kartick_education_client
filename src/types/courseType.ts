import { ICategoryStatus, IPriceTypes } from "@/types";
import { IUserData } from "./userType";

export type ICourseData = {
  _id: string;
  title: string;
  img: string;
  snid: string;
  details: string;
  short_description: string;
  author: IUserData;
  category: {
    _id: string;
    title: string;
    img: string;
    status: string;
  };
  // sub1_course_category_id: Types.ObjectId;
  price: number;
  tax: number;
  vat: number;
  duration: string[];
  level: string;
  price_type: IPriceTypes;
  status: ICategoryStatus;
  showing_number: number;
  favorite: "yes" | "no";
  demo_video: {
    video: string;
    platform: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
