export type IPurchasedCategory = {
  category: {
    _id: string;
    title: string;
    img: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    isDelete: string;
    id: string;
  };
  label: string;
  _id: string;
  id: string;
};

export type IPurchasedData = {
  membership: {
    title: string;
    uid: string;
  };
  payment: {
    transactionId: string;
    platform: string;
    record: string;
  };
  purchase: {
    label: string;
    price: 300;
    each_student_increment: 15;
  };
  _id: string;
  package: string | any;
  title: string;
  total_price:number;
  categories: IPurchasedCategory[];
  total_purchase_student: 6;
  students: [];
  paymentStatus: string;
  expiry_date: string;
  user: {
    _id: string;
    email: string;
    role: string;
    admin: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    blockingTimeout: 0;
    isDelete: string;
    id: string;
  };
  type: string;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
