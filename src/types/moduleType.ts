import { IMilestoneData } from '@/types/miestoneType';
import { ICategoryStatus } from './common';
export type IModuleData = {
  _id: string;
  title: string;
  imgs: [];
  course: string;
  milestone: string | IMilestoneData;
  status: ICategoryStatus;
  isDelete: string;
  module_number: number;
  tags: [];
  createdAt: string;
  updatedAt: string;
  lesson?: [];
};
