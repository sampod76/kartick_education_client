import { ICategoryStatus } from "@/types";
import * as yup from "yup";

const CategorySchema = yup.object().shape({
  title: yup.string().required(),
  img: yup.string(),
  status: yup.string().optional(),
});

export { CategorySchema };

export type ICategory = {
  title: string;
  img?: string;
  status: ICategoryStatus;
};
