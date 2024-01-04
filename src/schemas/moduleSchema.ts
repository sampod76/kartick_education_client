import * as yup from "yup";

const ModuleSchema = yup.object().shape({
  title: yup.string().required(),
  img: yup.string(),
  status: yup.string<'active'| 'deactivate'| 'save'|'disable'|"block">().optional(),
  details: yup.string().optional(),
  milestones: yup.string(),
  author: yup.string().optional(),
  module_number: yup.number().optional(),
  demo_video:yup.object().shape({
    video: yup.string(),
    platformat: yup.string()
  })
});

export { ModuleSchema };

export type IModule = {
  title: string;
  img?: string;
  milestone: string;
  status?: string;
  details?: string;
  author?: string;
  module_number?: number;
  demo_video: {
    video: string;
    platform: string;
  };
  tags: string[];
};
