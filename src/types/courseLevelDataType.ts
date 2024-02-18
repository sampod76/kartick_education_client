import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
export type ICourseLevelData = {
  _id: string;
  title: string;
  category: string;
  serial_number: number;
  status:ENUM_STATUS;
  isDelete: ENUM_YN;
  createdAt: string;
  updatedAt: string;
  categoryDetails:any
};
