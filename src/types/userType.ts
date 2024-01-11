import { ICategoryStatus } from ".";

export type IUserData = {
  _id: string;
  email: string;
  role: string;
  admin: string;
  createdAt: string;
  updatedAt: string;

  status: ICategoryStatus;
 
};
