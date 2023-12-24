import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";

const SelectMilestoneField = () => {
  //! for Milestone options selection
  const { data } = useGetAllMilestoneQuery({});
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
    <FormSelectField
      size="large"
      name="milestone"
      options={MilestoneOptions as any}
      // defaultValue={priceTypeOptions[0]}
      label="milestone"
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectMilestoneField;
