import * as yup from "yup";

const QuizSchema = yup.object().shape({
  title: yup.string().required(),
  img: yup.string(),
  details: yup.string().optional(),
  passingGrade: yup.number().optional(),
  minus_skip:yup.boolean(),
  author: yup.string().optional(),
  lesson: yup.string().optional(),
  module: yup.string().optional(),
  status: yup.string<'active'| 'deactivate'| 'save'|'disable'|"block">().optional(),
  demo_video:yup.object().shape({
//   tags: yup.,

  })
});

export { QuizSchema };

export type IQuiz = {
  title: string;
  img?: string;
  details?: string;
  video?: string;
  passingGrade?: number;
  minus_skip:Boolean;
  author?: string;
  lesson: string;
  module?: string;
  status?: string;
  short_description?: string;
  
  tags: string[];
};
