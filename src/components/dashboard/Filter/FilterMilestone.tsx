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
   //  // console.log("🚀 filterValue:", filterValue);

  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  //! for search and select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
     //  // console.log("search:", value);
  };

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

  // console.log(MilestoneOptions);

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
      style={{ width: "10rem" }}
      loading={isLoading}
      //! for search & filter
      showSearch
      onSearch={onSearch}
      filterOption={filterOption}
      optionFilterProp="children"
      placeholder="Inserted are removed"
    />
  );
}
