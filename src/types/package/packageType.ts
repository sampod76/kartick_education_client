export type IPackageCategory = {
  category: {
    _id: string;
    title: string;
    img: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
    isDelete: string;
    id: string;
  };
  label: string;
  _id: string;
  id: string;
};

export type IPackageData = {
  _id: string;
  membership: { title: string; uid?: string };
  title: string;
  img?: string;
  categories: IPackageCategory[];
  date_range?: string[];
  type: "bundle" | "select" | "multiple_select";
  status: "active" | "deactivate" | "save";
  biannual?: {
    price: number;
    each_student_increment: number;
  };
  monthly?: {
    price: number;
    each_student_increment: number;
  };
  yearly?: {
    price: number;
    each_student_increment: number;
  };
  
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
