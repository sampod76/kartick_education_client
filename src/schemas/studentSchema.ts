export type IStudentCreate = {
    password?: string;
    img?:string
    student: {
      name: {
        firstName: string;
        lastName: string;
        middleName?: string;
      };
      gender: string;
      dateOfBirth: string;
      email: string;
      phoneNumber: string;
      bloodGroup?: string; // Optional blood group
      address: string;
      img: string;
    };
  };
export type IStudent = {
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
