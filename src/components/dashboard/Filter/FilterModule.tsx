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
  console.log("🚀 filterValue:", filterValue);

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
      style={{ width: "24rem" }}
      loading={isLoading}

      // loading={true}
      // placeholder={placeholder}
    />
  );
}
