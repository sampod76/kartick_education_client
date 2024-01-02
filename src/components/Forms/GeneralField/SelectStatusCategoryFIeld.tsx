"use client";
import React, { useState } from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import FormSearchSelectField from "../FormSearchSelectField";
import { Select } from "antd";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";

const SelectStatusCategoryFIeld = ({
  defaultData,
  disable = false,
  setCategoryValue,
}: {
  defaultData?: any;
  disable?: boolean;
  setCategoryValue: React.Dispatch<React.SetStateAction<any>>;
}) => {
  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const query: Record<string, any> = {};
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  query["status"] = "active";
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
    <div>
      <LabelUi>Select Category</LabelUi>
      <Select
      size="large"
        // onChange={handleChange ? handleChange : onChange}
        onChange={(val) => {
          setCategoryValue(val);
        }}
        disabled={disable}
        // defaultActiveFirstOption
        defaultValue={{ label: "Select Category", value: "" }}
        options={CategoryOptions}
        style={{ width: "100%" }}
        showSearch
        onSearch={onSearch}
        filterOption={filterOption}
        optionFilterProp="children"
        loading={isLoading}
        // placeholder={placeholder}
      />
    </div>
  );
};

export default SelectStatusCategoryFIeld;
