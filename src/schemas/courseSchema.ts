import * as yup from "yup";

const CourseSchema = yup.object().shape({
  title: yup.string().required(),
  img: yup.string(),
  details: yup.string().optional(),
  shrot_description: yup.string().optional(),
  category: yup.string().optional(),
  duration: yup.string().optional(),
  level: yup.string().optional(),
  price_type: yup.string<IPriceTypes>().optional(),
  status: yup.string<ICourseStatus>().optional(),
  showing_number: yup.string().optional(),
  price: yup.string().optional(),
  demo_video: yup.string().optional(),
  tags: yup.string().optional(),
});

export { CourseSchema };

type IPriceTypes = "free" | "paid" | "closed" | "recurring";
type ICourseStatus = "active" | "deactivate" | "save" | "disable";
type IFavourit = "yes" | "no";
export type ICourse = {
  title: string;
  img: string;
  snid: string;
  details?: string;
  short_description?: string;
  author: string;
  course: string;
  // sub1_course_course_id: string
  price: number;
  tax?: number;
  vat?: number;
  duration?: string[];
  level?: string;
  price_type: IPriceTypes;
  status: ICourseStatus;
  showing_number?: number;
  favorite: IFavourit;
  demo_video?: Record<string, string>;
  tags?: string[];
};
