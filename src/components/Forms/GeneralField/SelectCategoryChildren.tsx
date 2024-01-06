"use client";
import React, { useEffect, useState } from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import FormSearchSelectField from "../FormSearchSelectField";
import { Select } from "antd";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";

const SelectCategoryChildren = ({
  categoryData,
  disable = false,
  children = "",
  setState,
  lableText = "",
  isLoading = false,
}: {
  categoryData?: any;
  disable?: boolean;
  isLoading?: boolean;
  children?: string;
  lableText: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [render, setRender] = useState(false);
  const [itemValue, setItemValue] = useState({ value: "", label: "" });

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
    //  // console.log("search:", value);
  };
  const CategoryOptions = categoryData?.map((item: any) => {
    let label = "";
    if (item.milestone_number) {
      label = `${item.milestone_number} : ${item.title}`;
    } else if (item.module_number) {
      label = `${item.module_number} : ${item.title}`;
    } else if (item.lesson_number) {
      label = `${item.lesson_number} : ${item.title}`;
    } else if (item.serial_number) {
      label = `${item.serial_number} : ${item.title}`;
    } else {
      label = `${item.title}`;
    }
    return {
      label: label,
      value: item?._id,
      data: item,
    };
  });

  return (
    <div>
      <LabelUi>{lableText}</LabelUi>
      <Select
        size="large"
        // onChange={handleChange ? handleChange : onChange}
        onChange={(val, fullValue: any) => {
          setState(fullValue.data);
        }}
        disabled={disable}
        // defaultActiveFirstOption
        defaultValue={{ label: lableText || "Select", value: "" }}
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

export default SelectCategoryChildren;
