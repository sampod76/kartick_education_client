export type IMilestoneData = {
  _id: string;
  title: string;
  imgs: [];
  details: string;
  short_description: string;
  course: {
    _id: string;
    title: string;
  };
  category: string;
  status: string;
  milestone_number: number;
  favorite: string;
  tags: [];
  createdAt: string;
  updatedAt: string;
  isDelete: string;
  modules: any[];

};
