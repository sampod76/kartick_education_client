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
  loading?: boolean;
  required?: boolean;
};

const FormMultiSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  loading = false,
  required,
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
            onChange={onChange}
            size={size}
            options={options}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
            allowClear
            mode="multiple"
            loading={loading}
          />
        )}
      />
    </>
  );
};

export default FormMultiSelectField;
