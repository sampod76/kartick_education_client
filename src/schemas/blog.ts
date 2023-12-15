import * as yup from "yup";

const BlogSchema = yup.object().shape({
  title: yup.string().required(),
  image: yup.string().optional(),
  content: yup.string().required(),
  comments: yup.array().of(yup.string()).optional(),
  author: yup.object().shape({
    // Define IUser schema here
  }),
  status: yup.string().optional(),
});

export { BlogSchema };

export type IBlog = {
  title: string;
  image?: string;
  content: string;
  comments?: string[];
  author: any;
  status?: string;
};
