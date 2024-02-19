import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import FormSearchSelectField from "../FormSearchSelectField";

const SelectMilestoneField = () => {
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  query["status"] = "active";
  //! for Milestone options selection
  const { data, isLoading } = useGetAllMilestoneQuery({ ...query });
  const milestoneData = data?.data;
  // console.log(milestoneData)
  const MilestoneOptions = milestoneData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  //   console.log(MilestoneOptions);
  return (
    <FormSearchSelectField
      size="large"
      name="milestone"
      options={MilestoneOptions as any}
      defaultValue={{ label: "Select Milestone", value: "" }}
      label="milestone"
      // placeholder="Select"
      loading={isLoading}
      required={true}
    />
  );
};

export default SelectMilestoneField;
