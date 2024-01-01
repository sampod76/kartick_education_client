import React, { useState } from "react";

import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";

import { Button, Select } from "antd";


export default function FilterMilestone({
  filterValue,
  setFilterValue,
}: {
  filterValue: string;
  setFilterValue: any;
}) {
  // const [filterValue, setFilterValue] = useState("Filter by a Milestone");
  console.log("🚀 filterValue:", filterValue);

  //! for Milestone options selection
  const { data: Milestone, isLoading } = useGetAllMilestoneQuery({});


  const MilestoneData = Milestone?.data;

  // console.log(MilestoneData)
  const MilestoneOptions = MilestoneData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  console.log(MilestoneOptions);

  return (
    <Select
      // placeholder="Filter by a Milestone"
      // onChange={handleChange ? handleChange : onChange}
      onChange={(val) => {
        setFilterValue(val);
      }}
      // dropdownRender={(menu) => (
      //   <div>
      //     <Button type="default">Filter</Button>
      //   </div>
      // )}
      // disabled={disabled}
      size={"large"}
      options={MilestoneOptions}
      value={filterValue}
      style={{ width: "24rem" }}
      loading={isLoading}

      // loading={true}
      // placeholder={placeholder}
    />
  );
}
