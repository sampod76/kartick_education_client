
import * as yup from "yup";

const MilestoneSchema = yup.object().shape({
  title: yup.string().required(),
  img: yup.string(),
  status: yup.string().optional(),
});

export { MilestoneSchema };

export type IMilestone = {
  title: string;
  img?: string;

};
