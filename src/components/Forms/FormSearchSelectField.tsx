"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import LabelUi from "../ui/dashboardUI/LabelUi";
import { useState } from "react";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  valueFixed?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  setState?: any
};

const FormSearchSelectField = ({
  name,
  size = "large",
  valueFixed,
  placeholder = "select",
  options,
  label,
  defaultValue,
  handleChange,
  required,
  disabled = false,
  loading = false,
  setState
}: SelectFieldProps) => {
  const { control } = useFormContext();

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
    //  // console.log("search:", value);
  };

  return (
    <>
      {label ? (
        <LabelUi>
          {label}
          {required && <span className="text-red-400"> *</span>}
        </LabelUi>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            // onChange={handleChange ? handleChange : onChange}
            onChange={(val) => {

              onChange(val);
              if (setState) {
                setState(val)
              }
            }}
            disabled={disabled}
            size={size}
            // defaultActiveFirstOption
            defaultValue={defaultValue ? defaultValue : ""}
            options={options}
            value={value}
            style={{ width: "100%" }}
            showSearch
            onSearch={onSearch}
            filterOption={filterOption}
            optionFilterProp="children"
            loading={loading}
          // allowClear
          // placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default FormSearchSelectField;
