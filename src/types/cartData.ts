export type ICartData = {
  _id: string;
  user: string;
  course: string;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;

  userDetails: [
    {
      _id: string;
      email: string;
      role: string;
      userId: string;
      status: string;
      blockingTimeout: string;
      student: string;
      isDelete: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
  courseDetails: [
    {
      _id: string;
      title: string;
      img: string;
      price: number;
      status: string;
    }
  ];
};
