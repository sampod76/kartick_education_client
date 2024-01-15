export type IPackageData = {
  membership: { title: string; uid?: string };
  title: string;
  img?: string;
  categories: {
    category: string;
    label?: string;

    biannual?: {
      price: number;
      each_student_increment?: number;
    };
    monthly?: {
      price: number;
      each_student_increment?: number;
    };
    yearly?: {
      price: number;
      each_student_increment?: number;
    };
  }[];
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
};
