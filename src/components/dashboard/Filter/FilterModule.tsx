import React, { useState } from "react";

import { useGetAllModuleQuery } from "@/redux/api/adminApi/moduleApi";

import { Button, Select } from "antd";

export default function FilterModule({
  filterValue,
  setFilterValue,
}: {
  filterValue: string;
  setFilterValue: any;
}) {
  // const [filterValue, setFilterValue] = useState("Filter by a Module");
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

  //! for Module options selection
  const { data: Module, isLoading } = useGetAllModuleQuery({});

  const ModuleData = Module?.data;

  // console.log(ModuleData)
  const ModuleOptions = ModuleData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  console.log(ModuleOptions);

  return (
    <Select
      // placeholder="Filter by a Module"
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
      options={ModuleOptions}
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
