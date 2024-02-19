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
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "serial_number";
  query["sortOrder"] = "asc";
  query["status"] = "active";
  //! for search and select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
    //  // console.log("search:", value);
  };

  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryQuery({ ...query });
  const CategoryData = Category?.data;
  // console.log(CategoryData)
  const CategoryOptions = CategoryData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  return (
    <Select
      onChange={(val) => {
        setFilterValue(val);
      }}
      size={"large"}
      options={CategoryOptions}

      value={filterValue}
      style={{ width: "10rem" }}
      loading={isLoading}
      //! for search & filter
      showSearch
      allowClear
      onSearch={onSearch}
      filterOption={filterOption}
      optionFilterProp="children"
      placeholder="Please select a category"
    />
  );
};

export default FilterCategorySelect;
