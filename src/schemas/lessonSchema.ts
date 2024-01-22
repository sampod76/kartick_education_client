import * as yup from "yup";

const LessonSchema = yup.object().shape({
  title: yup.string().required(),
  img: yup.string(),
  video:yup.string(),
  status: yup.string<'active'| 'deactivate'| 'save'|'disable'|"block">().optional(),
  milestones: yup.string(),
  details: yup.string().optional(),
  short_description: yup.string().optional(),
  author: yup.string().optional(),
  module: yup.string().optional(),
  lesson_number: yup.number().optional(),
  lecture: yup.number().optional(),
  demo_video:yup.object().shape({
    video: yup.string(),
    platformat: yup.string()
  })
});

export { LessonSchema };

export type ILesson = {
  title: string;
  img?: string;
  video?: string;
  milestone: string;
  details?: string;
  short_description?: string;
  status?: string;
  author?: string;
  module?: string;
  lesson_number?: number;
  lecture?: number;
  demo_video: {
    video: string;
    platform: string;
  };
  tags: string[];
};
