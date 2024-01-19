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
};

const FormSelectField = ({
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
}: SelectFieldProps) => {
  const { control } = useFormContext();


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
            }}
            disabled={disabled}
            size={size}
            // defaultActiveFirstOption
            defaultValue={defaultValue ? defaultValue : ""}
            options={options}
            value={value}
            style={{ width: "100%" }}
            loading={loading}
            // placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
