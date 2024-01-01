import React, { useState } from "react";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";

import { Button, Select } from "antd";

const FilterCategorySelect = ({
  filterValue,
  setFilterValue,
}: {
  filterValue: string;
  setFilterValue: any;
}) => {
  // const [filterValue, setFilterValue] = useState("Filter by a category");
  console.log("🚀 filterValue:", filterValue);

  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryQuery({});

  // console.log(
  //   "🚀 ~ file: FilterCategory.tsx:13 ~ FilterCategorySelect ~ isLoading:",
  //   isLoading
  // );

  const CategoryData = Category?.data;

  // console.log(CategoryData)
  const CategoryOptions = CategoryData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  console.log(CategoryOptions);

  return (
    <Select
      // placeholder="Filter by a category"
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
      options={CategoryOptions}
      value={filterValue}
      style={{ width: "24rem" }}
      loading={isLoading}

      // loading={true}
      // placeholder={placeholder}
    />
  );
};

export default FilterCategorySelect;
