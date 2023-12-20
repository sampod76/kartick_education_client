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
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
  required?: boolean;
};

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  handleChange,
  required,
}: SelectFieldProps) => {
  const { control } = useFormContext();
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <>
      {label ? <LabelUi>{label}</LabelUi> : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            // onChange={handleChange ? handleChange : onChange}
            onChange={(val) => {
              setSelectedValue(val);
              onChange(val);
            }}
            size={size}
            // defaultActiveFirstOption
            defaultValue={defaultValue ? defaultValue : ""}
            options={options}
            // value={value}
            value={selectedValue || value}
            style={{ width: "100%" }}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
