import { ICategoryStatus } from ".";

type IUserInfo = {
  additionalRole: string;
  _id: string;
  name: {
    firstName: string;
    lastName: string;
    _id: string;
    id: string;
  };
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  isDelete: string;
  id: string;
};

export type IUserData = {
  _id: string;
  email: string;
  role: string;
  admin?: IUserInfo;
  student?: IUserInfo;
  seller?: IUserInfo;
  createdAt: string;
  updatedAt: string;
  status: ICategoryStatus;
  blockingTimeout: 0;
  isDelete: string;
  id: string;
};
