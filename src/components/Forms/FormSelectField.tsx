"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import LabelUi from "../ui/dashboardUI/LabelUi";

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

  return (
    <>
      {label ? <LabelUi>{label}</LabelUi> : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={handleChange ? handleChange : onChange}
            size={size}
            defaultActiveFirstOption
            options={options}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
