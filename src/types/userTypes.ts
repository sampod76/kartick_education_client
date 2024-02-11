export type IUserGeneralData = {
  status: string;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string; // Optional middle name
  };
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  img: string;
};

export type IStudentCreate = {
  password?: string;
  student: IUserGeneralData;
};
export type ISellerCreate = {
  password?: string;
  seller: IUserGeneralData;
};
export type ITrainerCreate = {
  password?: string;
  trainer: IUserGeneralData;
};
export type IAdminCreate = {
  password?: string;
  admin: IUserGeneralData;
};

