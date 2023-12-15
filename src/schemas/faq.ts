import * as yup from "yup";

const FaqSchema = yup.object().shape({
  title: yup.string().required(),
  image: yup.string().optional(),
  content: yup.string().required(),
  comments: yup.array().of(yup.string()).optional(),
  author: yup.object().shape({
    // Define IUser schema here
  }),
  status: yup.string().optional(),
});

export { FaqSchema };

export type IFaq = {
  title: string;
  image?: string;
  content: string;
  status?: string;
};
