"use client";
import React, { useState } from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import FormSearchSelectField from "../FormSearchSelectField";
import { Select } from "antd";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";

export default function SelectDynamicCategory({
  defaultData,
  disable = false,
  setCategoryValue,
  CategoryData,
  isLoading,
}: {
  defaultData?: any;
  disable?: boolean;
  setCategoryValue: React.Dispatch<React.SetStateAction<any>>;
  CategoryData: any;
  isLoading: boolean;
}) {
  //! Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
 
  };

  //! console.log(CategoryData)
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
}
