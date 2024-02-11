export type IShort_overviewData = {
  title: string;
  _id: string;
  page?: string;
  cards: [
    {
      title: string;
      countNumber: string;
      short_description: string;
    }
  ];
  details?: string;
  short_description?: string;
  author: string;
  // sub1_Short_overview_category_id: Types.ObjectId;
  status: "active" | "deactivate" | "save" | "disable";
  demo_video?: Record<string, string>;
  tags?: string[];
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
